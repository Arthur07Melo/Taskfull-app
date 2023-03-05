export function getLevel(dayTasks: number, completedTasks:number) {

    let dayLevel = 0;

    const ratio = completedTasks / dayTasks;

    if(ratio === 1) {
        dayLevel = 4;
    } else if (ratio >= 0.75) {
        dayLevel = 3;
    } else if (ratio >= 0.5){
        dayLevel = 2;
    }else if(ratio >= 0.25){
        dayLevel = 1;
    }

    return dayLevel;
}