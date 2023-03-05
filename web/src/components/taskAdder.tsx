import * as Checkbox from "@radix-ui/react-checkbox";
import { Check } from "phosphor-react";
import { FormEvent } from "react";

const weekDays = ["Domingo", "Segunda", "Terça", "Quarta", "Quinta", "Sexta", "Sábado"]

export function TaskAdder() {
    return (
        <div>
            <form className="flex flex-col my-5" action="http://localhost:5000/habit" method="post">
                <label htmlFor="title">What is the title of the task? </label>
                <input className="bg-zinc-700 rounded-md px-2" type="text" name="title" placeholder="Title" />
                <label htmlFor="description">Describe the task: </label>
                <textarea className="bg-zinc-700 rounded-md px-2 mb-5" name="description" cols={30} rows={5} placeholder="Description"></textarea>

                {weekDays.map((weekDay, index) => {
                    return (
                        <div className="flex items-center" key={index}>
                            <Checkbox.Root className="bg-gray-600 w-[25px] h-[25px] rounded-md data-[state=checked]:bg-green-600 focus:border" name="HabitWeekDays" value={index} id={weekDay}>
                                <Checkbox.Indicator>
                                    <Check size={24} color="white"/>
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