import { Router } from "express";
import ProductManager from "../productManager.js";
const prodRouter = Router()
const productManager1 = new ProductManager()

prodRouter.get('/',async(req,res)=> {
    let AllProds = await productManager1.getProducts()
    let limit = req.query.limit;
    // Si se proporciona el parámetro "?limit=", limitar el número de productos
    if (limit) {
      AllProds = AllProds.slice(0,limit)
    }
    res.send(AllProds)
});

prodRouter.get('/:idProd', async (req,res)=> {
    const idProd = +req.params.idProd
    const idSelected = await productManager1.getProductById(idProd)
    res.send(idSelected)
});

prodRouter.post('/',async(req,res)=>{
    const newProduct = req.body
    await productManager1.addProduct(newProduct)
    res.send(newProduct)
});

prodRouter.put('/:pid', async (req,res)=>{
    /* let pid = +req.params.pid;
    const idSelected = await productManager1.getProductById(pid).id
    let prod = req.body;
    await productManager1.updateProduct(idSelected,prod) */
    let pid = +req.params.pid;
    const {id}= await productManager1.getProductById(pid)
    let prod = req.body
    await productManager1.updateProduct(id,prod)
    /*  if (!idSelected) {
        return res.status(400).send({status:'error', error:'valores incompletos'});
    }   */
    res.status(200).json(prod)
}); 

prodRouter.delete('/:pid', async (req, res) => {
    let pid = +req.params.pid;
    const {id} = await productManager1.getProductById(pid);
    /* if (!idSelected) {
      return res.status(400).send({ status: 'error', error: 'El producto no existe' });
    } */
   await productManager1.deleteProduct(id);
    res.status(200).json(id)
  });
export default prodRouter