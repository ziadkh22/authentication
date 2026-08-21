import user from "../models/user.model";
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken";
import { NextFunction, Request, Response } from "express"
import { time, timeLog, timeStamp } from "node:console";
import { AuthRequest } from "../middleware/authorization.middleware";


export const registeruser = async (req: Request, res: Response): Promise<any> => {

    try {

        const { email, password, role } = req.body

        if (!email || !password) {
            return res.status(404).json({ message: "Email or Password is not found" })
        }

        const existinguser = await user.findOne({ email })

        if (existinguser) {
            return res.status(400).json({ message: "Email is already registered" })
        }

        const hashedpassword = await bcrypt.hash(password, 10)

        const newuser = await user.create({
            email,
            password: hashedpassword,
            role: role || "user"
        })
        return res.status(201).json({
            message: "Registration is done!!!!",
            id: newuser._id,
            email: newuser.email,
            registered_At: new Date().toISOString()
        })
    }
    catch (error) {
        console.error("There is an internal server error happens", error)
        return res.status(500).json({ message: "internal server error" })
    }
}

export const loginuser = async (req: Request, res: Response): Promise<any> => {

    try {
        const { email, password, role } = req.body
        if (!email || !password) {
            return res.status(404).json({ message: "Email or Password is invalid" })
        }

        const finduser = await user.findOne({ email })
        if (!finduser) {
            return res.status(404).json({ message: "Email or Password is invalid" })
        }

        const ispasswordmatched = await bcrypt.compare(password, finduser.password)
        if (!ispasswordmatched) {
            return res.status(404).json({ message: "Email or Password is invalid" })
        }

        const token = jwt.sign(
            { userid: finduser._id, role: finduser.role },  // get id from mongodb of the current user
            process.env.JWT_SECRET || "ASDSA455",  // important secret password for each session
            { expiresIn: "1h" } // session closed in 1 hour

        )
        return res.status(201).json({
            message: "Login is successfull",
            user: finduser,
            token,
            SignedIn_At: new Date().toISOString()
        })
    }
    catch (error) {
        console.error("There is an internal server error happens", error)
        return res.status(500).json({ message: "internal server error" })
    }

}

export const getuser = async (req: AuthRequest, res: Response): Promise<any> => {

    try {
        const userid = req.user.userid // we get the user by its token id
        const User = await user.findById(userid).select("-password") // get all data except password

        if (!User) {
            return res.status(404).json({ message: "User Not found" })
        }
        return res.status(201).json({ User })
    }
    catch (error) {
        return res.status(404).json({ message: "there is an error finding User data" })

    }
}