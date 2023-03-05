import dayjs from "dayjs";

export function generateDatesFrom30dAgo() {
    const today = dayjs();
    let startDate = dayjs().subtract(30, 'day');

    //faz com que o primeiro dia seja domingo
    while (startDate.day() !== 0) {
        startDate = startDate.subtract(1, 'day');
    }

    const dates: Date[] = [];
    let compareDate = startDate;

    while (compareDate.isBefore(today)) {
        dates.push(compareDate.toDate());
        compareDate = compareDate.add(1, "day");
    }
    dates.push(today.toDate());

    return dates;
}