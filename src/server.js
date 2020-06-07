const express = require("express")
const server = express()

//pegar o banco de dados
const db = require("./database/db")

//configurar pasta public
server.use(express.static("public"))

//habilitar o uso do req.body
server.use(express.urlencoded({ extended: true }))


//utilizando template engine
const nunjucks = require("nunjucks")
nunjucks.configure("src/views", {
    express: server,
    noCache: true
})


//configurar caminhos (rotas) da aplicação

//página inicial
//request and response
server.get("/", (req, res) => {
    return res.render("index.html", {
        title: "Seu marketplace de coleta de resíduos"
    })
})


//create-point
server.get("/create-point", (req, res) => {
    //o corpo do form
    //console.log(req.query)

    return res.render("create-point.html", {saved: true})
})

server.post("/savepoint", (req, res) =>{
    //o corpo do form
    //console.log(req.body)

    //inserir dados
    const query = `
        INSERT INTO places (
            image, 
            name, 
            address, 
            address2, 
            state, 
            city, 
            items
        ) VALUES (?, ?, ?, ?, ?, ?, ?);
    `

    const values = [
        req.body.image,
        req.body.name,
        req.body.address,
        req.body.address2,
        req.body.state,
        req.body.city,
        req.body.items
    ]

    function afterInsertData(err){
        if(err){
            console.log(err)
            return res.send("Erro no cadastro!")
        }

        console,log("Cadastrado com sucesso")
        console.log(this)

        return res.render("create-point.html", {saved: true})
    }
    //aqui o comando:
    db.run(query, values, afterInsertData)

})


//search-results
server.get("/search-results", (req, res) => {

    const search = req.query.search

    //pesquisa!
    if(search==""){
        //pesquisa vazia
        //mostra a pag. HTML com os dados do DB
        return res.render("search-results.html", { total: 0})
    }

    //código copiado de db2.js
    db.all(`SELECT * FROM places WHERE city LIKE '%${search}%'`, function(err, rows) {
        if(err){
            console.log(err)
        }

        const total = rows.length

        //mostra a pag. HTML com os dados do DB
        return res.render("search-results.html", { places: rows, total: total})
    })

})


//ligar o servidor
server.listen(3000)