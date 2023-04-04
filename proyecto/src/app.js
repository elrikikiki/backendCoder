import express from "express";
import prodRouter from "./routes/prodRouter.js";
const app = express()

app.use(express.urlencoded({extended:true}))
app.use(express.json());
app.use('/api/products',prodRouter)
app.listen(8082,()=> {
    console.log('listen on port 8082');
})
