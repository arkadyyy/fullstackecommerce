
import { Request,Response } from "express"
import { db } from "../../db"
import { productsTable } from "../../db/productsSchema"
import { eq } from "drizzle-orm"
const getProducts = async (req : Request,res : Response) => {
    try {
        const products = await db.select().from(productsTable)
        res.status(200).json(products)
    } catch (error) {
        res.status(500).send(error)
    }
}
const getProductById = async (req : Request,res : Response) => {
    const {id} = req.params
    try {
        const product = await db.select().from(productsTable).where(eq(productsTable.id,Number(id)))
        if(!product){
            res.status(404).send({message : 'Product not found'})
        }else{
            res.status(200).json(product)
        }
        res.status(200).json(product)
    } catch (error) {
        res.status(500).send(error)
    }
}

const createProduct = async (req : Request,res : Response) => {
  try {
    const [product] = await db.insert(productsTable).values(req.body).returning()
    res.status(201).json(product)
  } catch (error) {
    res.status(500).send(error)
  }

}

const updateProduct = async (req : Request,res : Response) => {
    const {id} = req.params

    
    try {
        const updatedFields = req.body
        const updatedProduct = await db.update(productsTable).set(updatedFields).where(eq(productsTable.id,Number(id))).returning()
        if(!updatedProduct){
            res.status(404).send({message : `Product with id ${id} failed to update`})
        }else{
            res.status(201).send(updatedProduct)
        }
    } catch (error) {
        res.status(500).send(error)
    }
}
const deleteProduct = async (req : Request,res : Response) => {
    const {id} = req.params
    try {
        const deletedProduct = await db.delete(productsTable).where(eq(productsTable.id,Number(id))).returning()
        if(!deleteProduct){
            res.status(404).send({message : 'Product did not found'})
        }else{
            res.send(204)
        }
    } catch (error) {
        res.status(500).send(error)
    }
}
export default {getProducts,getProductById,createProduct,updateProduct,deleteProduct}