import { Fragment } from "../FragmentGrid";
import { Column, Cell } from "../Grid";
import { random_int, ranges_intersect } from "../math";

export class ContinuosFragment implements Fragment {
    private limit: number;

    constructor(limit: number) {
        this.limit = limit;
    }

    fragment(columns: readonly Column[]): Cell[] {
        let cells: Cell[] = [];

        let prev_range = [-Infinity, Infinity] satisfies [number, number];

        for (const [i, column] of columns.entries()) {
            const last_cell_index = column.findLastIndex((cell) => cell);
            if (last_cell_index == -1) {
                continue;
            }

            const height = random_int(this.limit + 1);

            const range = [
                last_cell_index - height + 1,
                last_cell_index,
            ] satisfies [number, number];

            if (!ranges_intersect(prev_range, range)) {
                continue; // TODO: review after trying out
            }

            prev_range = range;

            for (let j = range[0]; j < range[1] + 1; j++) {
                cells.push([i, j]);
            }
        }

        return cells;
    }
}
