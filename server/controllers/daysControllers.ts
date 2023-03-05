import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
import { z } from "zod";
import dayjs from "dayjs";
import { Request, Response } from "express";


const getDay = async (req: Request, res: Response) => {
    const getDaysParams = z.object({
        date: z.coerce.date()
    });
    //coerce converte o parametro recebido para o tipo date

    let date = dayjs().startOf('day').toDate();

    console.log(req.query);

    if (Object.keys(req.query).length !== 0) {
        console.log(getDaysParams.parse(req.query))
        date = getDaysParams.parse(req.query).date;
    }

    date.setHours(0);

    const weekDay = dayjs(date).get('day');
    console.log(date, weekDay);

    const possibleHabits = await prisma.habit.findMany({
        where: {
            created_at: {
                lte: date
            },
            HabitWeekDay: {
                some: {
                    week_day: weekDay
                }
            }
        }
    });
    //se o habito tiver sido criado após a data, e estiver disponivel no dia da semana

    const day = await prisma.day.findUnique({
        where: {
            date: date
        },
        include: {
            DayHabit: true
        }
    });


    const completedHabits = day?.DayHabit.map(dayHabit => { return dayHabit.habit_id }) ?? [];
    // ?? [] retorna um array vazio caso ele seja vazio
    const dayID = day?.id;
    //?para caso ele seja nulo

    res.status(200);
    res.json({ dayID: dayID, possibleHabits: possibleHabits, completedHabits: completedHabits });
}


const toggleHabit = async (req: Request, res: Response) => {
    const reqBody = z.object({
        habitID: z.string().uuid(),
    });

    const { habitID } = reqBody.parse(req.params);

    const today = dayjs().startOf('day').toDate();

    let day = await prisma.day.findUnique({
        where: {
            date: today
        },
        include: {
            DayHabit: true
        }
    });

    if (!day) {
        day = await prisma.day.create({
            data: {
                date: today
            },
            include: {
                DayHabit: true
            }
        })
    }

    const dayHabit = await prisma.dayHabit.findUnique({
        where: {
            day_id_habit_id: {
                day_id: day.id,
                habit_id: habitID
            }
        }
    })


    if (dayHabit) {
        await prisma.dayHabit.delete({
            where: {
                day_id_habit_id: {
                    day_id: day.id,
                    habit_id: habitID
                }
            }
        })
    }
    else {
        await prisma.dayHabit.create({
            data: {
                day_id: day.id,
                habit_id: habitID
            }
        })
    }



    res.status(201);
    res.json(day)
}

const getSummary = async (req: Request, res: Response) => {
    const summary = await prisma.$queryRaw`
    SELECT
        D.id,
        D.date,
        (
            SELECT
                cast(count(*) as float)
            FROM day_habits as DH
            WHERE DH.day_id = D.id
        )   as completed,
        (
            SELECT
                cast(count(*) as float)
            FROM habit_week_day as HWD
            JOIN habits H
                ON H.id = HWD.habit_id
            WHERE 
                HWD.week_day = cast(strftime('%w', D.date/1000, 'unixepoch') as int )
        )   as amount
    FROM days D
    `

    res.status(200);
    res.json(summary);
}




export { getDay, toggleHabit, getSummary }