import {Request,Response,NextFunction} from 'express'
import {z,ZodError} from 'zod'
import { createProductSchema } from '../db/productsSchema.js'
import _ from 'lodash'

export function validationData(schema : z.ZodObject<any,any>){
    return  (req : Request,res : Response,next : NextFunction) => {
        try {
            schema.parse(req.body)
            const fields = Object.keys(createProductSchema.shape)
            req.cleanBody = _.pick(req.body,fields)
            next()
        } catch (error) {
            if(error instanceof ZodError){
                const errorMessage = error.errors.map((issue : any) => ({message : `${issue.path.join('.')} is ${issue.message}`}))
                res.status(400).json({error : 'invalid data',details : errorMessage})
            }else{
                res.status(500).json({error : 'internal server error'})
            }
           
        }
    }
}