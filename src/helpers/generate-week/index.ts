import { Moment } from 'moment';

export const generateWeek = (monday: Moment) => {
    const week: string[] = [];
    for(let i = 0; i < 7; i++){
        week.push(monday.clone().add(i,'day').format('ddd DD.MM'))
    }
    return week
}