import express from "express";
import mongoose from "mongoose";
import cors from "cors";

// Configurações
const PORT_EXPRESS = 4000; // Porta para o Express
const MONGO_URI = "mongodb://localhost:27017/cadastro_funcoes"; // URI do MongoDB

// Inicialização do Express
const app = express();

// Middlewares
app.use(cors()); // Habilita CORS
app.use(express.json()); // Permite o uso de JSON no corpo das requisições

// Conexão com o MongoDB
mongoose.connect(MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log("Conectado ao MongoDB"))
  .catch((err) => console.error("Erro ao conectar ao MongoDB:", err));

// Definir o schema e modelo
const funcaoSchema = new mongoose.Schema({
  Funcao: String,
  admissional: String,
  periodico: String,
  retorno: String,
  mudanca_risco: String,
  demissional: String,
  acidentes: String,
  ergonomicos: String,
  fisicos: String,
  biologicos: String,
  quimicos: String,
});

const Funcao = mongoose.model("Funcao", funcaoSchema, "funcoes");

// Rotas
app.get("/", (req, res) => {
  res.status(200).send("Bem-vindo ao sistema de cadastro de funções!");
});

app.get("/funcoes", async (req, res) => {
  try {
    const funcoes = await Funcao.find({}, { Funcao: 1, _id: 0 });
    const nomesFuncoes = funcoes.map(f => f.Funcao);
    res.json(nomesFuncoes);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.get("/funcao/:nome", async (req, res) => {
  try {
    const nome = req.params.nome;
    const funcao = await Funcao.findOne({ Funcao: nome });
    if (funcao) {
      res.json(funcao);
    } else {
      res.status(404).json({ message: "Função não encontrada" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.get("/funcao/buscar/:termo", async (req, res) => {
  try {
    const termo = req.params.termo;
    const regex = new RegExp(termo.split("").join(".*"), "i"); // Busca aproximada
    const funcoes = await Funcao.find({ Funcao: { $regex: regex } });
    res.json(funcoes);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Servir arquivos estáticos
app.use(express.static("public"));

// Iniciar o servidor Express
app.listen(PORT_EXPRESS, () => {
  console.log(`Servidor Express rodando em http://localhost:${PORT_EXPRESS}`);
});
