import express from "express";
import cors from "cors";
import { PrismaClient } from "@prisma/client";

const app = express();
const prisma = new PrismaClient();

app.use(cors({
  origin: (origin, callback) => {
    if (!origin || origin.includes('localhost')) {
      callback(null, true);
    } else {
      callback(new Error('CORS not allowed'));
    }
  },
  credentials: true
}));
app.use(express.json());

// Rota de teste
app.get("/", (req, res) => {
  res.json({ message: "Servidor rodando com sucesso!" });
});

// Criar reserva
app.post("/api/reservas", async (req, res) => {
  const { nome, email, telefone, data, pessoas } = req.body;
  
  // Validações
  if (!nome || !email || !telefone || !data || !pessoas) {
    return res.status(400).json({ error: "Todos os campos são obrigatórios" });
  }

  if (isNaN(Number(pessoas)) || Number(pessoas) <= 0) {
    return res.status(400).json({ error: "Número de pessoas inválido" });
  }

  const dataReserva = new Date(data);
  if (isNaN(dataReserva.getTime())) {
    return res.status(400).json({ error: "Data inválida" });
  }

  if (dataReserva < new Date()) {
    return res.status(400).json({ error: "A data não pode ser no passado" });
  }
  
  try {
    const reserva = await prisma.reserva.create({
      data: {
        nome,
        email,
        telefone,
        data: dataReserva,
        pessoas: Number(pessoas),
      },
    });
    res.status(201).json({ success: true, message: "Reserva criada com sucesso", reserva });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Erro ao criar reserva" });
  }
});

// Listar todas as reservas
app.get("/api/reservas", async (req, res) => {
  try {
    const reservas = await prisma.reserva.findMany({ 
      orderBy: { criadoEm: "desc" } 
    });
    res.json(reservas);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Erro ao listar reservas" });
  }
});

// Listar reservas de um usuário específico (por email)
app.get("/api/reservas/:email", async (req, res) => {
  const { email } = req.params;

  if (!email) {
    return res.status(400).json({ error: "Email é obrigatório" });
  }

  try {
    const reservas = await prisma.reserva.findMany({
      where: { email },
      orderBy: { data: "desc" }
    });
    res.json(reservas);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Erro ao listar reservas" });
  }
});

// Deletar reserva
app.delete("/api/reservas/:id", async (req, res) => {
  const { id } = req.params;

  if (!id || isNaN(Number(id))) {
    return res.status(400).json({ error: "ID inválido" });
  }

  try {
    const reserva = await prisma.reserva.delete({
      where: { id: Number(id) }
    });
    res.json({ success: true, message: "Reserva cancelada com sucesso", reserva });
  } catch (err) {
    console.error(err);
    res.status(404).json({ error: "Reserva não encontrada" });
  }
});

// Login
app.post("/api/login", async (req, res) => {
  const { email, senha } = req.body;

  if (!email || !senha) {
    return res.status(400).json({ success: false, message: "Email e senha são obrigatórios" });
  }

  try {
    const usuario = await prisma.usuario.findUnique({ where: { email } });

    if (!usuario || usuario.senha !== senha) {
      return res.status(401).json({ success: false, message: "Email ou senha inválidos" });
    }

    res.json({ 
      success: true, 
      nome: usuario.nome,
      email: usuario.email,
      id: usuario.id
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "Erro no servidor" });
  }
});

// Cadastro de usuário
app.post("/api/usuarios", async (req, res) => {
  const { nome, email, senha } = req.body;

  if (!nome || !email || !senha) {
    return res.status(400).json({ success: false, message: "Todos os campos são obrigatórios" });
  }

  if (senha.length < 6) {
    return res.status(400).json({ success: false, message: "A senha deve ter no mínimo 6 caracteres" });
  }

  try {
    const usuarioExistente = await prisma.usuario.findUnique({ where: { email } });
    if (usuarioExistente) {
      return res.status(400).json({ success: false, message: "Email já cadastrado" });
    }

    const usuario = await prisma.usuario.create({
      data: { nome, email, senha },
    });

    res.status(201).json({ 
      success: true, 
      message: "Cadastro realizado com sucesso",
      nome: usuario.nome,
      email: usuario.email
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "Erro ao cadastrar usuário" });
  }
});

const PORT = 4000;
app.listen(PORT, () =>
  console.log(`Servidor rodando em http://localhost:${PORT}`)
);