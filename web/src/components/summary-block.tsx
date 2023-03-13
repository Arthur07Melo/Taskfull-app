import * as Popover from "@radix-ui/react-popover";
import DayPopover from "./dayPopover";


const borderLevels = ["border-sky-300", "border-sky-400", "border-sky-500", "border-sky-600"]
const colorLevels = ["bg-gray-800", "bg-sky-800", "bg-sky-600", "bg-sky-500", "bg-sky-400"]


type propsType = {
    level: number,
    date?: Date,
}

export default function SummaryBlock(props: propsType) {
    return (
        <Popover.Root >
            <Popover.Trigger asChild>
                <button className={`${colorLevels[props.level]} w-6 h-6 rounded`}></button>
            </Popover.Trigger>


            <Popover.Portal>
                <Popover.Content className="bg-zinc-900 text-white p-10 rounded-xl min-w-[320px]">
                    <DayPopover date={props.date} />
                </Popover.Content>
            </Popover.Portal>
        </Popover.Root>
    )
}