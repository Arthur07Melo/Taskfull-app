import * as Checkbox from "@radix-ui/react-checkbox";
import { Check } from "phosphor-react";
import dayjs from "dayjs";
import { useEffect, useState } from "react";
import { api } from "../lib/axios";
import isBeforeToday from "../utils/is-before-today";
import checkTokenValidation from "../utils/check-token-validation";


const weekDays = ["Domingo", "Segunda-Feira", "Terça-Feira", "Quarta-Feira", "Quinta-Feira", "Sexta-Feira", "Sábado"];

type propsType = {
    date?: Date,
}

interface dayDataType {
    dayID: string,
    possibleHabits: {
        id: string,
        title: string,
        description: string,
        created_at: string
    }[],
    completedHabits: string[]
}


export default function DayPopover(props: propsType) {
    const [dayData, setDayData] = useState<dayDataType>();

    useEffect(() => {
        api.get("/day", {
            params: { date: props.date?.toDateString() },
        },)
            .then(response => setDayData(response.data))
            .catch((err) =>{
                checkTokenValidation(err);
                console.log(err); 
            })
    }, [])


    return (
        <div>
            <h1 className="text-lg text-gray-400">{weekDays[dayjs(props.date).day()]}</h1>
            <h1 className="text-2xl font-semibold">{dayjs(props.date).format("DD/MM/YYYY")}</h1>

            <form className="flex flex-col mt-5" action="">
                <div className="flex flex-col items-start">
                    {dayData?.possibleHabits.map((habit, i: number) => {
                        return (
                            <div className="flex items-center justify-center py-[2px]" key={i}>
                                <Checkbox.Root
                                    defaultChecked={dayData?.completedHabits.includes(habit.id)}
                                    disabled={isBeforeToday(props.date?.toDateString()!)}
                                    onCheckedChange={(checked) => {
                                        api.patch(`/day/${habit.id}/toggle`)
                                            .catch(err => checkTokenValidation(err))
                                    }}
                                    className="bg-gray-700 w-[25px] h-[25px] mr-3 rounded-md focus:border data-[state=checked]:bg-green-600" id="c1">

                                    <Checkbox.Indicator>
                                        <Check size={24} color="white" />
                                    </Checkbox.Indicator>
                                </Checkbox.Root>
                                <label htmlFor="c1">{habit.title}{dayData.completedHabits.includes(habit.id)}</label>
                            </div>
                        )
                    })}
                </div>
            </form>
        </div>
    )
}