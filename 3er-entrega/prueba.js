import express from "express";
import fs from 'fs/promises'


class ProductManager {
    idAuto = 1;
    #products;
    path= ``;

    constructor(){
        this.#products = [];
        this.path = `./prod.json`
    }

    async getProducts()
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
    async addProduct(product){
        try{
            const productFile = await fs.readFile(this.path, 'utf-8')
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
    async getProductById(id){
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

     async updateProduct(id, product) {
        try
        {
        const productFile = await fs.readFile(this.path, 'utf-8')
        let products = JSON.parse(productFile)
        const idProduct = products.findIndex((p)=> p.id=== id)

        products.splice(idProduct,1,{id, ...product});

        await fs.writeFile(this.path, JSON.stringify(products))
        }
        catch(e){
            throw new Error(e)
        }
     }

     async deleteProduct(id) {
        const productFile = await fs.readFile(this.path, 'utf-8')
        let products = JSON.parse(productFile)
        const  idProd = products.find((p)=> p.id === id)
        if(!idProd)
        {
            throw new Error('ese id no existe')
        }
        const deletedProduct = products.filter((prod)=> prod.id !== id)
        await fs.writeFile(this.path, JSON.stringify(deletedProduct))
     }
}
const productManager1 = new ProductManager()

const product = {
    title:'prod prueba',
    description: 'texto prueba',
    thumbnail:'img prueba',
    code:'abc123'
}
const main = async () => {
     /* await productManager1.addProduct({...product, code:'TercerProd'}) 
     await productManager1.addProduct({...product, code:'CuartoProd'}) 
     await productManager1.addProduct({...product, code:'QuintoProd'})  */
     await productManager1.getProducts()
}
main()

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