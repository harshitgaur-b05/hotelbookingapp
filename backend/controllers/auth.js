import user from "../Modules/User.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import cookieParser from "cookie-parser";

// Registration function
export const register = async (req, res, next) => {
    try {
        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(req.body.password, salt);
        
        const newUser = new user({
                ...req.body,
            password: hash
        });
        
        console.log(newUser);
        await newUser.save();
        
        res.status(200).json(newUser);
    } catch (error) {
        res.status(400).send(error);
    }
}

// Login function
export const login = async (req, res, next) => {
    try {
        // Find the user by username
        const userget = await user.findOne({ username: req.body.username });
        console.log(userget);

        // Check if user exists
        if (!userget) {
            return res.status(404).json("User not found");
        }

        // Check if the password is correct
        const isPasswordCorrect = await bcrypt.compare(req.body.password, userget.password);
        if (!isPasswordCorrect) {
            return res.status(400).json("Wrong password or username");
        }

        // Generate JWT token
        const token = jwt.sign({ id: userget._id, isAdmin: userget.isAdmin }, process.env.JWT);

        // Exclude password and isAdmin from user details
        const { password, isAdmin, ...otherDetails } = userget._doc;

        // Set the cookie with the JWT and return the user details
        res.cookie("access_token", token, {
            httpOnly: true,  // Ensures the token is not accessible via JavaScript
        }).status(200).json(otherDetails);  // Return the user details without password
    } catch (error) {
        console.error(error);  // Log the error for debugging
        res.status(500).json({ message: "Something went wrong!" });
    }
}
