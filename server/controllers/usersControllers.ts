import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";
import { z } from "zod";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const prisma = new PrismaClient();


const createUser = async (req: Request, res: Response) => {
    const ReqBody = z.object({
        username: z.string(),
        email: z.string().email(),
        password: z.string().max(16)
    })

    const { username, email, password } = ReqBody.parse(req.body);
    console.log(username, email, password);
    //check if user exists
    const userExists = await prisma.user.findUnique({
        where: {
            email: email
        }
    })
    if (userExists) {
        return res.status(400).json({ message: "user already exist" });
    }


    try {
        //cryptografed password
        const hashPassword = await bcrypt.hash(password, 10);

        const newUser = await prisma.user.create({
            data: {
                email: email,
                username: username,
                password: hashPassword
            }

        })

        const { password: _, ...user } = newUser;

        res.status(201);
        res.json(user);
    } catch (error) {
        res.status(400).json({ message: error })
    }

}


const loginUser = async (req: Request, res: Response) => {
    const ReqBody = z.object({
        email: z.string().email(),
        password: z.string().max(16)
    })
    try{
        const { email, password } = ReqBody.parse(req.body);

        const user = await prisma.user.findUnique({ where: { email: email } });
        if (!user) {
            return res.status(400).json({ message: "incorrect email or password." });
        }

        const correctPassword = await bcrypt.compare(password, user.password);

        if (!correctPassword) {
            return res.status(400).json({ message: "incorrect email or password." });
        }

        const token = jwt.sign(
            { id: user.id },
            process.env.JWT_PASS!,
            { expiresIn: "1h" }
        );

        res.status(200).json(token);
    }catch(err){
        console.log(err);
        res.status(400).json(err);
    }
}


export { createUser, loginUser }