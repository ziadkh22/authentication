import { Response, NextFunction } from "express";
import { AuthRequest } from "./authorization.middleware"; // to get the interface of user? : any that extends Request



export const checkrole = (roles: string[]) => { // string[] : let the route can be accessed by one role or more like adimn and users and so on
    return (req: AuthRequest, res: Response, next: NextFunction) => {
        if (!roles.includes(req.user?.role)) { // ? : optional if the role not included it give us undefined bex of ? sign
            return res.status(401).json({ message: "unauthorized access role or undefined" })
        }
        next()
    }
}