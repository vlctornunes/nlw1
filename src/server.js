const express = require("express")
const server = express()

//configurar pasta public
server.use(express.static("public"))

//configurar caminhos (rotas) da aplicação

//página inicial
//request and response
server.get("/", (req, res) => {
    res.sendFile(__dirname + "/views/index.html")
})
//create-point
server.get("/create-point", (req, res) => {
    res.sendFile(__dirname + "/views/create-point.html")
})
//search-results
server.get("/search-results", (req, res) => {
    res.sendFile(__dirname + "/views/search-results.html")
})


//ligar o servidor
server.listen(3000)