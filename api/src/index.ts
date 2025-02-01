import express,{Router,json,urlencoded} from 'express'
import productsRoutes from './routes/products/index.js'
import authRoutes from './routes/auth/index.js'
import ordersRoutes from './routes/orders/index.js'
import serverless from 'serverless-http'
const port = 3000

const app = express()
const router = Router()



app.get('/',(req,res) => {
    res.send('hello world')
})
 

app.use(urlencoded({extended : false}))
app.use(json())
app.use('/products',productsRoutes)
app.use('/orders',ordersRoutes)
app.use('/auth',authRoutes)

if (process.env.NODE_ENV === "dev") {
    app.listen(port,() => 
        console.log(`app is running on port ${port}`)
)
}

export const handler = serverless(app);

