import express,{Router} from 'express'
import productsRoutes from './routes/products/index'
const port = 3000

const app = express()
const router = Router()



app.get('/',(req,res) => {
    res.send('hello world')
})
 



app.use('/products',productsRoutes)

app.listen(port,() => 
    console.log(`app is running on port ${port}`)
)