
import { Request,Response } from "express"

const getProducts = (req : Request,res : Response) => {
    res.send('all products your command'
    )
}
const getProductById = (req : Request,res : Response) => {
    const {id} = req.params
    res.send(`product id is ${id}`)
}

const createProduct = (req : Request,res : Response) => {
    res.send('product created')
}

const updateProduct = (req : Request,res : Response) => {
    res.send('product updated')
}
const deleteProduct = (req : Request,res : Response) => {
    res.send('product deleted')
}
export default {getProducts,getProductById,createProduct,updateProduct,deleteProduct}