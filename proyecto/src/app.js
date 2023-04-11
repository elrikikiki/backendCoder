import express from "express";
import prodRouter from "./routes/prodRouter.js";
import cartRouter from "./routes/cartRouter.js";
import {engine} from 'express-handlebars'
import {resolve} from 'path'
const app = express()

app.use(express.urlencoded({extended:true}))
app.use(express.json());

const viewsPath = resolve('./src/views')
app.engine('handlebars',engine({
    layoutsDir:`${viewsPath}/layouts`,
    defaultLayout:`${viewsPath}/layouts/home.handlebars`
}));
app.set('view engine', 'handlebars')
app.set('views', viewsPath)
app.get('/handle',function(req,res){ //ojo con esa ruta
res.render({name:'Santi', title:'My Page'})
})



app.use('/api/products',prodRouter)
app.use('/api/carts',cartRouter)
app.listen(8082,()=> {
    console.log('listen on port 8082');
});
