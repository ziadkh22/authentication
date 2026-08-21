import express from "express"
import { getuser, loginuser, registeruser } from "../controllers/auth.controller"
import { verifyToken, AuthRequest } from "../middleware/authorization.middleware"
import { checkrole } from "../middleware/role.middleware"

const router = express.Router()

// Authentication
router.post("/register", registeruser)

router.post("/login", loginuser)


// Authorization

router.get("/profile", verifyToken, (req: AuthRequest, res) => {
    res.json({
        message: "Authorized Access",
        user: req.user,
    }); // Without the interface in authorization code, TypeScript reports an error because Express’s built-in Request type does not include user.
});

router.get("/adminpage", verifyToken, checkrole(["admin"]), (req: AuthRequest, res) => {
    res.json({
        message: "Authorized Admin Access",
        user: req.user,
    });
})

router.get("/userpage", verifyToken, checkrole(["admin", "user"]), (req: AuthRequest, res) => {
    res.json({
        message: "Authorized Admin or user Access",
        user: req.user,
    });
})

// get user data secured
router.get("/me", verifyToken, getuser)
// Exporting router to server.ts
export default router