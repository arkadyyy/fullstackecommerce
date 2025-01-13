import {Router} from 'express'
const router = Router()

router.get('/',(req,res) => {
    res.send('all products')
})
router.get('/:id',(req,res) => {
    const {id} = req.params
    res.send(`this is product ${id}`)
})

router.post('/',(req,res) => {
    res.send('product created !')
})

export default router