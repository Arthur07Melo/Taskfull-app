import * as Checkbox from "@radix-ui/react-checkbox";
import { useRef, useState } from "react";
import { Check } from "phosphor-react";
import { useForm } from "react-hook-form";
import { SubmitHandler } from "react-hook-form/dist/types";
import { api } from "../lib/axios";

const weekDays = ["Domingo", "Segunda", "Terça", "Quarta", "Quinta", "Sexta", "Sábado"]

type FormInput = {
    title: string,
    description: string,
    HabitWeekDays: string[]
}


export function TaskAdder() {
    const { register, handleSubmit } = useForm<FormInput>();
    const [ habitWeekDays, setHabitWeekDays ] = useState<number[]>([]);

    const onSubmitTask: SubmitHandler<FormInput> = (data) => {
        api.post("/habit", {
            title: data.title,
            description: data.description,
            HabitWeekDays: habitWeekDays
        }).then(() => {
            console.log(`dados enviados, data: ${data}`);
            window.location.reload();
        }).catch((err) => {console.log(err)})
    }

    const handleChange = (index: number) => {
        const newHabitWeekDays = habitWeekDays;

        if(habitWeekDays.includes(index)){
            newHabitWeekDays.splice(newHabitWeekDays.indexOf(index), 1);
        }
        else{
            newHabitWeekDays.push(index);
        }
        
        setHabitWeekDays(newHabitWeekDays);
        console.log(newHabitWeekDays, habitWeekDays);
    }

    return (
        <div>
            <form className="flex flex-col my-5" onSubmit={handleSubmit(onSubmitTask)}>
                <label htmlFor="title">What is the title of the task? </label>
                <input className="bg-zinc-700 rounded-md px-2" type="text" {...register("title", { required: true })} placeholder="Title" />
                <label htmlFor="description">Describe the task: </label>
                <textarea className="bg-zinc-700 rounded-md px-2 mb-5" {...register("description", { required: true })} cols={30} rows={5} placeholder="Description"></textarea>

                {weekDays.map((weekDay, index) => {
                    return (
                        <div className="flex items-center" key={index}>
                            <Checkbox.Root
                                onCheckedChange={(checked) => { handleChange(index) }}
                                className="bg-gray-600 w-[25px] h-[25px] rounded-md data-[state=checked]:bg-green-600 focus:border"
                                value={index}
                                id={weekDay}>
                                <Checkbox.Indicator>
                                    <Check size={24} color="white" />
                                </Checkbox.Indicator>

                            </Checkbox.Root>
                            <label className="text-2xl pl-3" htmlFor={weekDay}>{weekDay}</label>
                        </div>
                    )
                })}

                <input className="bg-green-600 rounded-lg h-11 mx-3 mt-4 cursor-pointer hover:bg-green-500" type="submit" value="create" />
            </form>
        </div>
    )
}