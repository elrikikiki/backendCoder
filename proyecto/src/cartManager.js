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

    async getCartById(id)
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
    
      // Buscamos si existe un objeto en el carrito con el idProduct que queremos agregar
      const productIndex = newCart.findIndex(
        (cartItem) => cartItem.products[0].idProduct === idProduct
      );
    
      if (productIndex >= 0) {
        // Si ya existe un objeto con el idProduct, actualizamos la cantidad
        newCart[productIndex].products[0].quantity += quantity;
      } else {
        // Si no existe un objeto con el idProduct, agregamos un nuevo objeto al carrito
        newCart.push({
          idCart,
          products: [
            {
              idProduct,
              quantity: quantity,
            },
          ],
        });
      }
    
      await fs.writeFile(this.path, JSON.stringify(newCart));
    }
   
};
export default CartManager