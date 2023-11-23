export function toHour(value: number) {
    const hour = Math.floor(value / 60);
    const minutes = value - hour * 60;
    return hour.toString().padStart(2, "0") + ":" + minutes.toString().padStart(2, "0");
}
