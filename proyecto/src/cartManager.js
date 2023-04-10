import fs from 'fs/promises'
import ProductManager from './productManager.js';
const productManager1 = new ProductManager()
class CartManager  {
    idAuto = 1;
    #cartProducts
    path= ``;
    constructor(){
      this.#cartProducts =[]
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
                (p) => p.id === id
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

      async addCart () {
        const productFile = await fs.readFile(this.path, 'utf-8');
        let newCart = JSON.parse(productFile);
        newCart.push({
          idCart: Date.now(),
          products: this.#cartProducts
        });

        await fs.writeFile(this.path, JSON.stringify(newCart))
      };
      
      async addProductToCart(idCart, idProduct) {
        const productFile = await fs.readFile(this.path, 'utf-8');
        const carts = JSON.parse(productFile);
      
        // Encontrar el objeto con el idCart correspondiente
        const cartIndex = carts.findIndex((cart) => cart.idCart === idCart);
        if (cartIndex >= 0) {
          // Si el objeto existe, actualizar la propiedad products
          const cart = carts[cartIndex];
          const cartProducts = cart.products;
      
          // Buscar si existe un objeto en el carrito con el idProduct que queremos agregar
          const productIndex = cartProducts.findIndex(
            (cartItem) => cartItem.idProduct === idProduct
          );
          if (productIndex >= 0) {
            // Si ya existe un objeto con el idProduct, actualizamos la cantidad
            cartProducts[productIndex].quantity++;
          } else {
            // Si no existe un objeto con el idProduct, agregamos un nuevo objeto al carrito
            cartProducts.push({
              idProduct,
              quantity: 1,
            });
          }
      
          // Actualizar el archivo con el carrito actualizado
          await fs.writeFile(this.path, JSON.stringify(carts));
        } else {
          console.log(`El carrito con id ${idCart} no existe.`);
        }
      }
};
export default CartManager