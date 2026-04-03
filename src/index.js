import express from 'express';
import cors from 'cors';
import Musica_DB from './MySQL.js';

const port = 5423;
const localhost = "localhost"; // "0.0.0.0"
const app = express();

app.use(cors({
  origin: "http://localhost:5173",
  credentials: true
}));

app.use(express.urlencoded({extended:false}));
app.use(express.json());

app.get('', async (req, res) => {
    const action = new Musica_DB();
    const response = await action.consultar()
    console.log(response);

    res.status(201).json({
        status: true,
        message: "message successfully returned",
        list: response
    });
})

app.listen(port,localhost, ()=>{
    console.log(`Backend running in http://${localhost}:${port}`);
});