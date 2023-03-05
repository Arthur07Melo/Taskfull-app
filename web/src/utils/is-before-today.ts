import dayjs from "dayjs";


export default function isBeforeToday(date: string) {
    const today = dayjs().startOf('day');
    return dayjs(date).isBefore(today);
}