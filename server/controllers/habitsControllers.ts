import { PrismaClient } from "@prisma/client";
import { z } from 'zod';
import { Request, Response } from "express";
import dayjs from "dayjs";

const prisma = new PrismaClient();

const getAllHabits = async (req: Request, res: Response) => {
    const habits = await prisma.habit.findMany({
        include: { HabitWeekDay: true }
    });
    res.status(200);
    res.json(habits);
}


const getSpecificHabit = async (req: Request, res: Response) => {
    const ReqBody = z.object({
        habitID: z.string().uuid()
    })

    const { habitID } = ReqBody.parse(req.params);
    const habit = await prisma.habit.findUnique({
        where: {
            id: habitID
        },
        include: { HabitWeekDay: true }
    })
    res.status(200);
    res.json(habit);
}


const addHabit = async (req: Request, res: Response) => {
    const reqBody = z.object({
        title: z.string(),
        description: z.string(),
        HabitWeekDays: z.array(z.number().min(0).max(6))
    })

    req.body.HabitWeekDays = req.body.HabitWeekDays.map((value: string) => { return parseInt(value) })

    const { title, description, HabitWeekDays } = reqBody.parse(req.body);
    //zod identifica se as variaveis estão corretas, caso contrário ele retorna um erro

    const habit = await prisma.habit.create({
        data: {
            user: {
                connect: {
                    id: req.user.id,
                }
            },
            title: title,
            description: description,
            created_at: dayjs().startOf('day').toISOString(),
            HabitWeekDay: {
                create: HabitWeekDays.map(weekDay => {
                    return {
                        week_day: weekDay
                    }
                })
            }
        }
    });

    res.status(201);
}


const deleteHabit = async (req: Request, res: Response) => {
    const ReqBody = z.object({
        habitID: z.string().uuid()
    })

    const { habitID } = ReqBody.parse(req.params);
    console.log(req.params);
    const deletedHabit = await prisma.habit.delete({
        where: {
            id: habitID
        }
    })
    res.status(200);
    res.json(deletedHabit);
}

export { getAllHabits, getSpecificHabit, addHabit, deleteHabit };