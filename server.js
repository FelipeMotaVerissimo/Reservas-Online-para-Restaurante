import express from "express";
import cors from "cors";
import { PrismaClient } from "@prisma/client";

const app = express();
const prisma = new PrismaClient();

app.use(cors());
app.use(express.json());

app.post("/api/reservas", async (req, res) => {
  const { nome, email, telefone, data, pessoas } = req.body;
  
  try {
    const reserva = await prisma.reserva.create({
      data: {
        nome,
        email,
        telefone,
        data: new Date(data),
        pessoas: Number(pessoas),
      },
    });
    res.json(reserva);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Erro ao criar reserva" });
  }
});

app.get("/api/reservas", async (req, res) => {
  try {
    const reservas = await prisma.reserva.findMany({ orderBy: { criadoEm: "desc" } });
    res.json(reservas);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Erro ao listar reservas" });
  }
});

app.post("/api/login", async (req, res) => {
  const { email, senha } = req.body;

  if (!email || !senha) {
    return res.status(400).json({ success: false, message: "Email e senha são obrigatórios" });
  }

  try {
    const usuario = await prisma.usuario.findUnique({ where: { email } });

    if (!usuario || usuario.senha !== senha) {
      return res.status(401).json({ success: false, message: "Credenciais inválidas" });
    }

    res.json({ success: true, nome: usuario.nome });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "Erro no servidor" });
  }
});

app.post("/api/usuarios", async (req, res) => {
  const { nome, email, senha } = req.body;

  if (!nome || !email || !senha) {
    return res.status(400).json({ success: false, message: "Todos os campos são obrigatórios" });
  }

  try {

    const usuarioExistente = await prisma.usuario.findUnique({ where: { email } });
    if (usuarioExistente) {
      return res.status(400).json({ success: false, message: "Email já cadastrado" });
    }

    const usuario = await prisma.usuario.create({
      data: { nome, email, senha },
    });

    res.json({ success: true, nome: usuario.nome });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "Erro ao cadastrar usuário" });
  }
});

const PORT = 4000;
app.listen(PORT, () =>
  console.log(`Servidor rodando em http://localhost:${PORT}`)
);
