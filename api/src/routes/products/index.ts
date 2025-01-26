import {Router} from 'express'
import controller from './productsController'
import {number, z} from 'zod'
import { validationData } from '../../middleware/validationMiddleware'
import {createInsertSchema,createSelectSchema} from 'drizzle-zod'
import { productsTable } from '../../db/productsSchema'
import { createProductSchema,updateProductSchema } from '../../db/productsSchema'
import { verifySeller, verifyToken } from '../../middleware/authMiddleware'

// const createProductSchema = z.object({
//     name : z.string(),
//     price : z.number({message : 'price should be a number'})
// })




const router = Router()

router.get('/',controller.getProducts)
router.get('/:id',controller.getProductById)
router.post('/',verifyToken,verifySeller, validationData(createProductSchema),controller.createProduct)
router.put('/id',verifyToken,verifySeller,validationData(updateProductSchema),controller.updateProduct)
router.delete('/:id',verifyToken,verifySeller,controller.deleteProduct)

router.post('/',(req,res) => {
    res.send('product created !')
})

export default router