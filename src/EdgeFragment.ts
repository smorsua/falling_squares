import { Fragment } from "./FragmentGrid";
import { Column, Cell } from "./Grid";

export class EdgeFragment implements Fragment {
    constructor() {}

    fragment(columns: readonly Column[]): Cell[] {
        const cells: Cell[] = [];

        for (const [i, column] of columns.entries()) {
            const last_cell_index = column.findLastIndex((cell) => cell);

            if (last_cell_index != -1) {
                cells.push([i, last_cell_index]);
            }
        }

        return cells;
    }
}
