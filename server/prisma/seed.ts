import { PrismaClient } from "@prisma/client"
const prisma = new PrismaClient();

async function main() {
    await prisma.habit.deleteMany();
    await prisma.day.deleteMany();

    await prisma.habit.create({
        data: {
            title: "Finalizar projeto",
            description: "Terminar o desenvolvimento do projeto com servidor, webpage e mobile e caso haja interesse, fazer deploy.",
            id: "6702b53f-439d-4ed9-b20d-21ae87d94608", //opcional
            created_at: new Date("2023-02-13T00:00:00.000z"),
            HabitWeekDay: {
                create:[
                    { week_day: 4 },
                    { week_day: 5 },
                    { week_day: 6 }
                ]
            }
        },
    });

    await prisma.habit.create({
        data: {
            title: "Planejamento do projeto",
            description: "Resumir tudo o que foi feito até agora e planejar o desenvolver do app",
            id: "c5d43ab1-e5d3-4beb-adaa-5bf97b5c0ce6", //opcional
            created_at: new Date("2022-02-10T00:00:00.000z"), //opcional
            HabitWeekDay: {
                create: [
                    { week_day: 1 },
                    { week_day: 2 },
                    { week_day: 4 },
                    { week_day: 5 }
                ]
            }
        },
    });

    await prisma.day.create({
        data: {
            date: new Date("2023-02-17T03:00:00.000z"),
            DayHabit: {
                create: {
                    habit_id: "6702b53f-439d-4ed9-b20d-21ae87d94608"
                }
            }
        }

    });

    await prisma.day.create({
        data: {
            date: new Date("2023-02-10T03:00:00.000z"),
            DayHabit: {
                create: {
                    habit_id: "c5d43ab1-e5d3-4beb-adaa-5bf97b5c0ce6"
                }
            }
        }

    });
}





main()
    .then(async () => {
        await prisma.$disconnect;
    })
    .catch(async (err) => {
        console.log(err);
        await prisma.$disconnect;
        process.exit(1);
    });