import { PrismaClient } from "@prisma/client";
import { Response, Request, NextFunction } from "express";
import jwt from "jsonwebtoken";

type tokenPayload = {
    id: string,
}


const prisma = new PrismaClient();

const userAuth = async (req: Request, res: Response, next: NextFunction) => {
    try{
        const { authorization } = req.headers;

        if (!authorization) {
            return res.status(401).json({ message: "Unauthorized" });
        }

        const token = authorization.split(" ")[1];

        const { id } = jwt.verify(token, process.env.JWT_PASS!) as tokenPayload;

        const user = await prisma.user.findUnique({
            where: {
                id: id
            }
        });

        if(!user){
            return res.status(401).json({ message: "Unauthorized" })
        }

        const { password: _, ...loggedUser} = user;
        req.user = loggedUser;
        next();
    }catch(err){
        return res.status(400).json({ message: err });
    }
}

export { userAuth }