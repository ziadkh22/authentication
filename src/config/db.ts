import mongoose from "mongoose"

import dns from "dns"
dns.setServers(["1.1.1.1", "8.8.8.8"]); // set custom DNS servers to resolve domain names

const connectDB = async () => {

    try {
        await mongoose.connect(process.env.MONGO_URI || "")
        console.log("Database connected...")
    }
    catch (error) {
        console.error("Database Connection is failed!!! : ", error)

    }
}

export default connectDB