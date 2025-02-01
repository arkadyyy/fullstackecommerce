import { Router } from "express";
import { validationData } from "../../middleware/validationMiddleware.js";
import { createUserSchema, loginSchema, usersTable } from "../../db/usersSchema.js";
import bcrypt from 'bcryptjs'
import { db } from "../../db";
import { eq } from "drizzle-orm";
import jwt from 'jsonwebtoken'
const router = Router()


router.post('/register',validationData(createUserSchema),async (req,res) => {
   try {
    const data = req.cleanBody
    const hashedPassword = await bcrypt.hash(data.password,10);
    const [user] = await db.insert(usersTable).values({...data,password : hashedPassword}).returning()

    //@ts-ignore
    delete user.password
    res.status(201).json({user})
   } catch (error) {
        res.status(500).send('something went wrong')
   }
})
router.post('/login',validationData(loginSchema),async (req,res) => {
    try {
        const {email,password} = req.cleanBody
        const [user] = await db.select().from(usersTable).where(eq(usersTable.email,email))

        if(!user){
            res.status(401).json({error : 'Authenthication failed'})
            return
        }


        const matched = await bcrypt.compare(password,user.password)
         if(!matched){
            res.status(401).json({error : 'Authenthication failed'})
            return
        }

        //@ts-ignore
        delete user.password

        //create jwt token
        const token = jwt.sign({userid : user.id,role : user.role},'jajalala',{expiresIn : '12h'})
        res.status(200).json({token,user})
    } catch (error) {
        
    }

})


export default router