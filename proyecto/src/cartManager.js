import fs from 'fs/promises'
import ProductManager from './productManager.js';
const productManager1 = new ProductManager()
class CartManager  {
    idAuto = 1;
    #cartProducts;
    path= ``;
    constructor(){
        this.#cartProducts = [];
        this.path = `./src/cart.json`
    }
   async getCartProducts()
   {
    try{
        const productFile = await fs.readFile(this.path, "utf-8" ) /* ahi va a leer la ruta "this.path" pero le pasas un utf-8 para decodificar esa ruta */
        return JSON.parse(productFile)
    }
    catch(e){
        await fs.writeFile(this.path, '[]')
        return 'No existe el archivo, ya se creó un array vacio'
    }
    };

    async getCartProductById(id)
    {
        try{
            const productFile = await fs.readFile(this.path, 'utf-8')
            let idProduct = JSON.parse(productFile)
            const searchProd = idProduct.find(
                (p) => p.idCart === id
            )
            if(!searchProd) {
                throw new Error('No encontre ese carrito')
            }
            return searchProd;
        }
        catch(e){
            throw new Error(e)
        }
    }

    async addProductToCart(idCart, idProduct) {
        const productFile = await fs.readFile(this.path, 'utf-8');
        let newCart = JSON.parse(productFile);
        const quantity = 1;
        
        // Buscar si el producto ya está en el carrito
        let productIndex = -1;
        for (let i = 0; i < newCart.length; i++) {
          const cart = newCart[i];
          const products = cart.products;
          for (let j = 0; j < products.length; j++) {
            const product = products[j];
            if (product.idProduct === idProduct) {
              productIndex = j;
              break;
            }
          }
          if (productIndex >= 0) {
            break;
          }
        }
      
        // Agregar el producto o incrementar la cantidad
        if (productIndex >= 0) {
          newCart[productIndex].products[0].quantity += quantity;
        } else {
          newCart.push({
            idCart,
            products: [
              {
                idProduct,
                quantity
              }
            ]
          });
        }
      
        await fs.writeFile(this.path, JSON.stringify(newCart));
        productIndex = -1; // reiniciar el valor de productIndex
      }

   
};
export default CartManager