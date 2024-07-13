import User from "../models/userSchema.js";
import {userSchema, signInSchema } from "../validations/userValidation.js";
import jwt from 'jsonwebtoken';
import JWT_SECRET from "../config.js";
import bcrypt from 'bcrypt';

const userSignUp = async(req,res) => {
    try {
        // Validate input using Zod
        const validatedData = userSchema.parse(req.body);
        // Check if the user already exists
        const existingUser = await User.findOne({ username: validatedData.username });
        if (existingUser) {
            return res.status(400).send({ error: 'User already exists' });
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(validatedData.password, 10);
        // Create a new user
        const newUser = new User({
            username: validatedData.username,
            firstName: validatedData.firstName,
            lastName: validatedData.lastName,
            password: hashedPassword
        });

        await newUser.save()

        // Generate JWT
        const token = jwt.sign({ userId: newUser.username }, JWT_SECRET, { expiresIn: '1h' });

        res.status(201).send({ token });
    } catch (error) {
         res.status(400).send({ error: error.message });
    }
}

const userSignIn = async (req,res) => {

    try {
        // Validate input using Zod
        const validatedData = signInSchema.parse(req.body);

        // Find the user by username
        const user = await User.findOne({ username: validatedData.username });
        if (!user) {
            return res.status(400).send({ error: 'Invalid username' });
        }

        // Compare the provided password with the stored hashed password
        const isMatch = await bcrypt.compare(validatedData.password, user.password);
        if (!isMatch) {
            return res.status(400).send({ error: 'Invalid password' });
        }

        // Generate JWT
        const token = jwt.sign({ userId: user._id }, JWT_SECRET, { expiresIn: '1h' });

        res.status(200).send({ token });
    } catch (error) {
        res.status(500).send({ error: 'An error occurred while signing in' });
    }
}


const userDetailsUpdate = async (req,res) => {
    try {
        const updates = req.body;
        const userId = req.body.userId;

        // Hash the new password if it is being updated
        if (updates.password) {
            updates.password = await bcrypt.hash(updates.password, 10);
        }

        // Find the user by ID and update
        const user = await User.findByIdAndUpdate(userId, updates, { new: true });

        if (!user) {
            return res.status(404).send({ error: 'User not found' });
        }

        res.status(200).send(user);
    } catch (error) {
        res.status(400).send({ error: error.message });
    }
}

const userBulk = async (req,res) => {
    try {
        const filter = req.query.filter || '';
        const users = await User.find({
            $or: [
                { firstName: { $regex: filter, $options: 'i' } },
                { lastName: { $regex: filter, $options: 'i' } }
            ]
        }).select('firstName lastName _id');

        res.status(200).send({ users });
    } catch (error) {
        res.status(500).send({ error: 'An error occurred while retrieving users' });
    }

}


export {userSignUp, userSignIn, userDetailsUpdate, userBulk}