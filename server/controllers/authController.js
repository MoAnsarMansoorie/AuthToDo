import bcrypt from "bcryptjs"
import { Auth } from "../models/authSchema.js";
import jwt from "jsonwebtoken"

export const registerController = async (req, res) => {
    try {
        const { username, email, password } = req.body;
        const hashedPassword = await bcrypt.hash(password, 10);

        const user = await Auth.create({
            username,
            email,
            password: hashedPassword
        })

        return res.status(201).json({
            success: true,
            message: "User created successfully",
            user
        })
        
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            success: false,
            message: "Error in registering"
        })
    }
}

export const loginController = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await Auth.findOne({ email: email });

        if(!user) {
            return res.status(404).json({
                success: false,
                message: "User not found"
            })
        }

        const passwordMatched = await bcrypt.compare(password, user.password);
        if(!passwordMatched) {
            return res.status(401).json({
                success: false,
                message: "Invalid password"
            })
        }

        // Generate JWT token
        const token = jwt.sign(
            { id: user._id, email: user.email }, 
            process.env.JWT_SECRET, // Ensure you have a .env file with a secret key
            { expiresIn: "1h" } // Token expiration
        );

        return res.status(200).json({
            success: true,
            message: "Login successful",
            token,
            user: { id: user._id, username: user.username, email: user.email }, // Sending only necessary user data
        });

        
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            success: false,
            message: "Error in logging in"
        })
    }
}