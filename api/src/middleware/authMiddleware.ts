import { Request,Response,NextFunction } from "express";
import jwt from 'jsonwebtoken'


export function verifyToken(req : Request,res : Response,next : NextFunction){
    const token = req.header('Authorization')
    if(!token){
        res.status(401).json({error : "access denied"})
        return
    }
    try {
        //decode jwt token data
        const decoded = jwt.verify(token,'jajalala')
        if(typeof decoded !== 'object' || !decoded?.userId){
            res.status(401).json({error : "access denied"})
        }
        console.log(decoded)
       
        req.userId = decoded.userId
        next()
    } catch (error) {
        res.status(401).json({error : "access denied"})
    }
}

export function verifySeller(req : Request,res : Response,next : NextFunction){
   const role = req.role
   if(role !== 'seller'){
    res.status(401).json({error : 'access denied'})
    return
   }
   next()
}