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
    }

    async addProductToCart(product)
    {
        try{
            /* const productFile = await fs.readFile(this.path, 'utf-8')
            let newProduct = JSON.parse(productFile) */
            const productFile = await productManager1.getProducts()
            let newProduct = JSON.parse(productFile)
            const valid = newProduct.find(
                p => p.id === product.id || p.code === product.code
            );

            if(valid) {
                throw new Error('Error, tenes el id o el code igual')
            }

            if(newProduct.length > 0){
                const lastProduct = newProduct[newProduct.length - 1]
                this.idAuto = lastProduct.id + 1;
            }

            newProduct.push({
                ...product, id: this.idAuto++
            })

            await fs.writeFile(this.path, JSON.stringify(newProduct))
        }
        catch (e) {
            throw new Error(e)
        }
    }

    async getCartProductById(id)
    {
        try{
            const productFile = await fs.readFile(this.path, 'utf-8')
            let idProduct = JSON.parse(productFile)
            const searchProd = idProduct.find(
                (p) => p.id === id
            )
            if(!searchProd) {
                throw new Error('No encontre ese producto')
            }
            return searchProd;
        }
        catch(e){
            throw new Error(e)
        }
    }
};
const cartManager1 = new CartManager()
const main = async () => {
   await cartManager1.getCartProducts()
}
console.log(await cartManager1.getCartProducts());


export default CartManager