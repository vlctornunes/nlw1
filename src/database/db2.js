//importar a dependencia
const sqlite3 = require("sqlite3").verbose()

//iniciar o objeto pras operações do DB
const db = new sqlite3.Database("./src/database/database.db")

//utiliar o objeto de banco de dados para nossas operações
db.serialize(() => {

    //criar uma tabela
    db.run('
        CREATE TABLE IF NOT EXISTS places (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            image TEXT,
            name TEXT,
            address TEXT,
            address2 TEXT,
            state TEXT,
            city TEXT,
            items TEXT
        );
    ')

    //inserir dados
    const query = '
        INSERT INTO places (
            image, name, address, address2, state, city, items
        ) VALUES (?, ?, ?, ?, ?, ?, ?);'

    const values = [
        "https://images.unsplash.com/photo-1480359014333-3935abd88252?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1500&q=80",
        "Colectoria",
        "R. Guiherme Gemballa, Jardim América",
        "Nº 260",
        "Santa Catarina",
        "Rio do Sul",
        "Resíduos Eletrônicos, Lâmpadas",
    ]

    function afterInsertData(err){
        if(err){
            console.log(err)
        }

        console,log("Cadastrado com sucesso")
        console.log(this)
    }
    //aqui o comando:
    //db.run(query, values, afterInsertData)



    //deletar um dado da tabela
    //db.run('DELETE FROM places WHERE id = ?', [1], function(err) {
    //    if(err){
    //        console.log(err)
    //    }
    //    console,log("Registro deletado com sucesso!")
    //})

    

    //consultar os dados
    //db.all('SELECT * FROM places', function(err, rows) {
    //    if(err){
    //        console.log(err)
    //    }
    //    console,log("Aqui estão seus registros:")
    //    console.log(this)
    //})

})