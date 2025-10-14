import express from "express";
import cors from "cors";
import { PrismaClient } from "@prisma/client";

const app = express();
const prisma = new PrismaClient();

app.use(cors());
app.use(express.json());

app.post("/api/reservas", async (req, res) => {
  const { nome, email, telefone, data, pessoas } = req.body;

  if (!nome || !email || !telefone || !data || !pessoas) {
    return res.status(400).json({ error: "Todos os campos são obrigatórios" });
  }

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
    const reservas = await prisma.reserva.findMany({
      orderBy: { criadoEm: "desc" },
    });
    res.json(reservas);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Erro ao listar reservas" });
  }
});

const PORT = 4000;
app.listen(PORT, () => {
  console.log(`✅ Servidor rodando em http://localhost:${PORT}`);
});
