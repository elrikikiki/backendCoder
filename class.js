class ProductManager  {
    products= []
    idAuto = 1;
    getProducts()
    {
       return this.products
    }

    addProduct(newProduct)
    {
        const validar = this.products.find((prod) => newProduct.code === prod.code);
        if (validar) {
          throw new Error("Ya existe un Producto con ese Code");
        }
       this.products.push({
            ...newProduct,
            id: this.idAuto++
        })
        
    }  
    getProductById(idProd)
    {   
        return this.products.find(prod => prod.id === idProd) ?? new Error('Producto no encontrado')
    }   
}
const productManager1 = new ProductManager

let product = {
    title:'fideos',
    description: 'comida',
    price: 300,
    thumbnail: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ-mYCLTiViom36i-EBOJ-m--IPhWJbeTugaUHNL0arRd6JkoR1zs33QwEeGMA3pT0-ex4&usqp=CAU',
    stock: 10,
    code: 'abc123'
 }

/* array vacio */
productManager1.getProducts()
/* se agrega el producto */
productManager1.addProduct(product)
/* se chequea en el carrito el producto agregado */
productManager1.getProducts()
/* se chequea que el código no sea el mismo */
productManager1.addProduct({ ...product, code: 'nuevo codigo'});
/* se chequea que ambos productos estèn dentro del carrito */
productManager1.getProducts()
/* Se busca un productp en particular de acuerdo a su ID */
productManager1.getProductById(2)



