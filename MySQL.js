import conection from "./connectMySQL.js";
export default class Musica_DB{

    #tableName = "musica";

    constructor(){
        this.init();
    }

    async init(){
        const ready_conection = await conection();
        try {
            const sql = `CREATE TABLE IF NOT EXISTS ${this.#tableName} (
                id INT AUTO_INCREMENT PRIMARY KEY, 
                nome_musica VARCHAR(255) NOT NULL
            )`;
            await ready_conection.execute(sql);
        } catch ( erro ) {
            console.log("Error:" + erro);
        }
    }

    async consultar(){
        const ready_conection = await conection();
        try {
            const sql = `SELECT * FROM ${this.#tableName} ORDER BY nome_musica`;
            const [registers, lines] = await ready_conection.execute(sql);
            await ready_conection.release();
            const client = [];
            for (const register of registers){
                const data =
                [
                    register.id,
                    register.nome_musica,
                ];
                client.push(data);               
            }
            return client;
 
        } catch ( erro ) {
            console.log(erro);
        }
    }
}