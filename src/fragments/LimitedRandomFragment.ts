import { Fragment } from "../FragmentGrid";
import { Cell, Column } from "../Grid";
import { random_int } from "../math";

export class LimitedRandomFragment implements Fragment {
    private limit: number;

    constructor(limit: number) {
        this.limit = limit;
    }

    fragment(columns: readonly Column[]): Cell[] {
        let cells: Cell[] = [];

        for (const [i, column] of columns.entries()) {
            const last_cell_index = column.findLastIndex((cell) => cell);

            if (last_cell_index == -1) {
                continue;
            }

            const height = random_int(this.limit + 1); // TODO: height smaller than limit

            for (
                let j = last_cell_index - height + 1;
                j < last_cell_index + 1;
                j++
            ) {
                if (column[j]) {
                    cells.push([i, j]);
                }
            }
        }

        return cells;
    }
}
