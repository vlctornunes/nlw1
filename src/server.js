const express = require("express")
const server = express()

//configurar pasta public
server.use(express.static("public"))


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
    return res.render("create-point.html")
})


//search-results
server.get("/search-results", (req, res) => {
    return res.render("search-results.html")
})


//ligar o servidor
server.listen(3000)