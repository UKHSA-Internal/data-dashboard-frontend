// Takes two arrays: One of dates, of of values
// Zips them into one object array, naming the properties at the same time
export const DataMap = (dates: Array<Date>, values: Array<string | number>) => {
    return dates.map((date, i) => { return { "date": date, "value": values[i]}});
}