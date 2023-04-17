import express from "express";
import prodRouter from "./routes/prodRouter.js";
import cartRouter from "./routes/cartRouter.js";
import {engine} from 'express-handlebars'
import {resolve} from 'path'
import { Server } from "socket.io";
import ProductManager from "./productManager.js";

const productManager1 = new ProductManager()
const products = await productManager1.getProducts()
const app = express()
app.use(express.urlencoded({extended:true}))
app.use(express.json());

const viewsPath = resolve('./src/views')

//products list
app.engine('handlebars',engine({
    layoutsDir:`${viewsPath}/layouts`,
    defaultLayout:`${viewsPath}/layouts/index.handlebars`,
}));
app.set('view engine', 'handlebars')
app.set('views', `${viewsPath}/layouts`)
app.get('/',  function(req,res){
res.render('home',{title:'My Page',products:JSON.stringify(products)})
});

app.get('/realTimeProducts', async function(req,res){
res.render('realTimeProducts',{title:'My Page',products:JSON.stringify(products)})
});





app.use('/api/products',prodRouter)
app.use('/api/carts',cartRouter)
const httpServer = app.listen(8082,()=> {
    console.log('listen on port 8082');
});
const socketServer = new Server(httpServer)
socketServer.on('connection',socket =>{
    console.log('nuevo cliente conectado');
    socket.on('message', (data)=>{
        console.log(data);
    })
    socket.emit('evento_socket_individual', 'Msj lo recibe solo el socket');
    socket.broadcast.emit('evento_para_todos_menos_el_socket_actual', 'lo ven todos menos el socket actual que desde el que se envio el msj');
    socket.emit('evento-para-todos','msj que ven todos los sockets conectados');
});