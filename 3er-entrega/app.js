import express from "express";
import ProductManager from "./productManager.js";

const productManager1 = new ProductManager()
const app = express()

app.use(express.urlencoded({extended:true}))
app.get('/products', async (req,res)=>{
    let AllProds = await productManager1.getProducts()
    let limit = req.query.limit;

    // Si se proporciona el parámetro "?limit=", limitar el número de productos
    if (limit) {
      AllProds = AllProds.slice(0,limit)
    }
    res.send(AllProds)
});

/* No se escribe el "idProd", solo pones el num de ID */
app.get('/:idProd', async (req,res)=> {
    const idProd = +req.params.idProd
    const idSelected = await productManager1.getProductById(idProd)
    res.send(idSelected)
});

app.listen(8082,()=> {
    console.log('listen on port 8082');
})