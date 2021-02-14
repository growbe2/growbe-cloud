
export function getDate(second: number, factor = -1) {
    const date = new Date();
    date.setSeconds(date.getSeconds() + (second * factor));

    return `${date.getHours()}:${date.getMinutes()}:${date.getSeconds()} ${date.getMonth() + 1}/${date.getDate()}/${date.getFullYear()}`
}
