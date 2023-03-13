import SummaryBlock from "./summary-block";
import { generateDatesFrom30dAgo } from "../utils/generate-dates-from-30d-ago";
import { useEffect, useState } from "react";
import { getLevel } from "../utils/get-day-level";
import { api } from "../lib/axios";
import dayjs from "dayjs";


type summaryDay = {
    id: string,
    date: Date,
    completed?: number,
    amount?: number
}[]



const weekDays = ["D", "S", "T", "Q", "Q", "S", "S"];

const summaryDates = generateDatesFrom30dAgo();


export default function Summary(){
    const [summary, setSummary] = useState<summaryDay>([]);

    useEffect(() => {
        api.get("/day/summary")
            .then(res => setSummary(res.data))
            .catch(err => console.log(err));
    },[])


    return(
        <div className="flex mx-20">
            <div className="grid gap-3 grid-rows-7 px-3 border-r-2 border-slate-800 ">
                {weekDays.map((weekDay, i) => {
                    return <div key={i}>
                    {weekDay}
                    </div>
                })}
            </div>

            <div className="grid grid-rows-7 gap-3 grid-flow-col-dense">
                {summaryDates.map((date, i) => {
                    const dayInSummary = summary.find(day => {
                        return dayjs(date).isSame(day.date, 'day')
                    })

                    return(
                        <SummaryBlock level={getLevel(dayInSummary?.amount!, dayInSummary?.completed!)} date={date} key={i}/>
                    ) 
                })}
            </div>
        </div>
    )
}