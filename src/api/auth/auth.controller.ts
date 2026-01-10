import { Request, Response } from 'express';
import { UserModel } from '../../models/user.model';

export const register = async function (req:Request, res:Response) {

    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ 
            message: 'Email and password are required' 
        });
    }

    const existingUser = await UserModel.findOne({ email }); // checks if user 409 user exists
      if (existingUser) {
       return res.status(409).json({ 
        message: 'User already exists' 
       });
    }

    const user = await UserModel.create({ email, password });

    return res.status(201).json({
     message: 'User registered successfully',
     user: {
      id: user._id,
      email: user.email,
     },
   });
}

