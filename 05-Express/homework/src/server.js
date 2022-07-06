// const bodyParser = require("body-parser");
 const express = require("express");

const STATUS_USER_ERROR = 422;

let id = 1
// This array of posts persists in memory across requests. Feel free
// to change this to a let binding if you need to reassign it.
let posts = [];
const server = express();
// to enable parsing of json bodies for post requests
server.use(express.json());

// TODO: your code to handle requests

server.post('/posts', (req, res, next ) => {
    const {author, title, contents} = req.body
    if(!author || !title || !contents){
       return res.status(STATUS_USER_ERROR).json({error: "No se recibieron los parámetros necesarios para crear el Post"})
    }
    const newPost = {
        author,
        title,
        contents,
        id: id++
    }
    posts.push(newPost)
    res.json(newPost)
})


server.post('/posts/author/:author', (req,res,next) => {
    const {author} = req.params
    const {title, contents} = req.body
    if(!title || !contents){
        return res.status(STATUS_USER_ERROR).json({error: "No se recibieron los parámetros necesarios para crear el Post"})
    }
    const newPost = {
        author: author,
        title: title,
        contents: contents,
        id: id++
    }
    posts.push(newPost)
    res.json(newPost)
})

server.get('/posts', (req,res,next) => {
    const {term} = req.query
    if(term){
        const respuesta = posts.filter(post =>{
            return post.title.includes(term) || post.contents.includes(term) 
        })
     return res.status(200).send(respuesta)   
    }else{
        return res.status(200).send(posts)
    }
})

server.get('/posts/:author', (req,res,next) => {
    
    const existe = posts.filter(post => post.author === req.params.author)
    if(existe.length){
        return res.send(existe)
    } else{
        return res.status(STATUS_USER_ERROR).json({error: "No existe ningun post del autor indicado"})
    }

})

server.get('/posts/:author/:title', (req,res,next) => {
    const {author, title} = req.params
    const contiene = posts.filter(post =>{return (post.author === author) && post.title.includes(title)})
    if(contiene.length){
        return res.send(contiene)
    } else{
        return res.status(STATUS_USER_ERROR).json({error: "No existe ningun post con dicho titulo y autor indicado"})
    }
})

server.put('/posts', (req,res,next) => {
    const {id,title,contents} = req.body;
    if(!id || !title || !contents){
        return res.status(STATUS_USER_ERROR).json({error: "No se recibieron los parámetros necesarios para modificar el Post"})
    }
    const identidad = posts.find(post => post.id === id)
    if(!identidad){
        return res.status(STATUS_USER_ERROR).json({error: 'El id indicado no corresponde con un Post existente'})
    }
    identidad.title = title
    identidad.contents = contents

    return res.send(identidad)
})

server.delete('/posts', (req,res,next) => {
    const {id} = req.body
    const idd = posts.find(post => post.id === id)
    if(!id || !idd){
        return res.status(STATUS_USER_ERROR).json({error: 'Mensaje de error'})
    }
    posts = posts.filter(post => post.id !== id)
    return res.send({success: true})
})

server.delete('/author', (req,res,next) =>{
    const {author} = req.body
    if(!author){
        return res.status(STATUS_USER_ERROR).json({error:'No existe el autor indicado'})

    }
    const allAutores = posts.filter(post => post.author === author)
    if(!allAutores.length){
        return res.status(STATUS_USER_ERROR).send({error: 'No existe el autor indicado'})
    }
    posts = posts.filter(post => post.author !== author)
    return res.send(allAutores)
})
module.exports = { posts, server };


//------------------------------------------
