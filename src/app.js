import express from 'express';
import conectaNaDatabase from './config/dbConnect.js';

const conexao = await conectaNaDatabase();

const app = express();

app.get('/funcoes', async (req, res) => {
    res.status(200).send('Cadastro de funcoes'); // Corrigido: "funcoes" sem o "ç"
});

export default app;

