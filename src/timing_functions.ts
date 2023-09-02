export function easeOutCubic(x: number): number {
    return 1 - Math.pow(1 - x, 3);
}

export function easeInCubic(x: number): number {
    return x * x * x;
}

export function easeOutQuint(x: number): number {
    return 1 - Math.pow(1 - x, 5);
}
