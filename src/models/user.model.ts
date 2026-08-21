import mongoose from "mongoose";

const userschema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    role: {
        type: String,
        enum: ["admin", "user"],
        default: "user"
    }
},
    { timestamps: true });

const user = mongoose.model("user", userschema)

export default user