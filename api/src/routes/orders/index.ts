import { Router } from 'express'
import { createOrder } from './ordersColtroller.js'
import { validationData } from '../../middleware/validationMiddleware.js'
import { insertOrderSchema } from '../../db/ordersSchema.js'

const router = Router()
router.post('/',validationData(insertOrderSchema),createOrder)

export default router