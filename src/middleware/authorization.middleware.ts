import { Request, Response, RequestHandler, NextFunction } from "express";
import jwt from "jsonwebtoken"

export interface AuthRequest extends Request { // The interface adds a custom user property to Express’s normal Request object.
    user?: any
}

export const verifyToken = (req: AuthRequest, res: Response, next: NextFunction) => { // RequestHandler : ease this (req : Request , res : Response , next: NextFunction) to be like is written in the code


    const authheader = req.headers.authorization // it look at the header of the access token

    if (!authheader || !authheader.startsWith("Bearer ")) { // must be there is a token and start with "bearer word"
        return res.status(401).json({ message: "Unauthorized access" })
    }

    const token = authheader.split(" ")[1]; // split : separates the text at spaces as ex {"bearer" , {sdfdsfdsf5ds666}}. then number 1 will select the token that its index is 1 after sparation.
    if (!token) {
        return res.status(401).json({ message: "Token is invalid" });
    }

    try {
        const decode = jwt.verify(token, process.env.JWT_SECRET as string) // comparing the session token with the registered secret one in the system
        req.user = decode // decode the token so it can be used in outputs
        next() // to run next middleware if there is one
    }
    catch (error) {
        console.error("there is an error in the token", error)
        return res.status(401).json({ message: "Invalid or expired token" });
    }
}