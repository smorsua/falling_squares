export function random_int(upper_bound: number) {
    return Math.floor(Math.random() * upper_bound);
}

export function ranges_intersect(
    first: readonly [number, number],
    second: readonly [number, number]
) {
    return (
        (first[0] >= second[0] && first[0] <= second[1]) ||
        (first[1] >= second[0] && first[1] <= second[1]) ||
        (second[0] >= first[0] && second[0] <= first[1]) ||
        (second[1] >= first[0] && second[1] <= first[1])
    );
}
