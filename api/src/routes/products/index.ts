import {Router} from 'express'
import controller from './productsController'
const router = Router()

router.get('/',controller.getProducts)
router.get('/:id',controller.getProductById)
router.post('/',controller.createProduct)
router.put('/id',controller.updateProduct)
router.delete('/:id',controller.deleteProduct)

router.post('/',(req,res) => {
    res.send('product created !')
})

export default router