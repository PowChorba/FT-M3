var fs  = require("fs")
var http  = require("http")


// Escribí acá tu servidor
http.createServer(handleRequest).listen(4920, '127.0.0.1');

const files = fs.readdirSync('./images')
function handleRequest(req, res){
    if(req.url === '/'){
        res.writeHead(200, {'Content-Type' : 'text/html'})
        res.end(`<a href='/1'>1</a><br>
        <a href='/2'>2</a><br>
        <a href='/3'>3</a><br>
        <a href='/4'>4</a><br>
        <a href='/5'>5</a><br>
        <a href='/6'>6</a><br>`)
    }
    if(req.url === '/1'){
        res.writeHead(200, {'Content-Type': 'Image/jpg'})
        const imagen = fs.readFileSync(`./images/${files[0]}`)
        res.end(imagen)
     }
     if(req.url === '/2'){
        res.writeHead(200, {'Content-Type': 'Image/jpg'})
        const imagen = fs.readFileSync(`./images/${files[1]}`)
        res.end(imagen)
    }
    if(req.url === '/3'){
        res.writeHead(200, {'Content-Type': 'Image/jpg'})
        const imagen = fs.readFileSync(`./images/${files[2]}`)
        res.end(imagen)
    }
    if(req.url === '/4'){
        res.writeHead(200, {'Content-Type': 'Image/jpg'})
        const imagen = fs.readFileSync(`./images/${files[3]}`)
        res.end(imagen)
    }
    if(req.url === '/5'){
        res.writeHead(200, {'Content-Type': 'Image/jpg'})
        const imagen = fs.readFileSync(`./images/${files[4]}`)
        res.end(imagen)
    }
    if(req.url === '/6'){
        res.writeHead(200, {'Content-Type': 'Image/jpg'})
        const imagen = fs.readFileSync(`./images/${files[5]}`)
        res.end(imagen)
     }
}

