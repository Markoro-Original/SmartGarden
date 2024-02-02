export function getRandomValue(min: number, max: number): string {
    return (Math.random() * (max - min) + min).toFixed(2);
}