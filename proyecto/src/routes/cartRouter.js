import { Router } from "express";
import CartManager from "../cartManager.js";
import ProductManager from "../productManager.js";

const cartManager1 = new CartManager()
const productManager1 = new ProductManager()
const cartRouter = Router()

cartRouter.get('/',async(req,res)=> {
    let AllProds = await cartManager1.getCartProducts()
    let limit = req.query.limit;
    // Si se proporciona el parámetro "?limit=", limitar el número de productos
    if (limit) {
      AllProds = AllProds.slice(0,limit)
    }
    res.send(AllProds)
});
// get
cartRouter.get('/:cid',async(req,res)=>{
    const cid = +req.params.cid
    const idSelected = await cartManager1.getCartById(cid)
    res.status(200).json(idSelected)
});

//post
cartRouter.post('/:cid/product/:pid',async (req,res)=>{
  const idCart = +req.params.cid
  const idProduct = +req.params.pid;
  const {id} = await productManager1.getProductById(idProduct);

  const addProductToCart = await cartManager1.addProductToCart(
    idCart,
    id
  );
  if(addProductToCart instanceof Error){
    return res
    .status(400)
    .send({status:'error', message:`${addProductToCart.message}`});
  }else {
    return res
    .status(201)
    .send({status:'succes', message:'producto añadido'})
  }

})
export default cartRouter