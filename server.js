// using HTTP


const http = require('http')

const server = http.createServer((req,res) => {
    if(req.url == "/"){
        res.write("Created server")
        res.end()
    }else if(req.url == "/courses"){
        res.write(JSON.stringify([{name:"demo",id:"1"},{name:"demo2",id:2}]))
        res.end()
    }
})

server.listen(3000)

console.log("listening on port 3000...")