class ProductManager  {
    products= []
    idAuto = 1;
    product = {
        title:'fideos',
        description: 'comida',
        price: 300,
        thumbnail: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ-mYCLTiViom36i-EBOJ-m--IPhWJbeTugaUHNL0arRd6JkoR1zs33QwEeGMA3pT0-ex4&usqp=CAU',
        stock: 10

     }
    getProducts()
    {
       return this.products
    }
    addProduct()
    {
        this.products.push({
            ...this.product,
            code: this.idAuto + 1,
        })
    }  
    getProductById()
    {   
        if(!this.idAuto){
            console.log('Not Found');
        }else {
            return this.products.find(
                (prod)=> prod.id === this.idAuto
                )
        }
        
    }   
}
console.log(ProductManager);
