import { Fragment } from "./FragmentGrid";
import { Cell, Column } from "./Grid";
import { random_int } from "./math";

export class RandomFragment implements Fragment {
    constructor() {}

    fragment(columns: readonly Column[]): Cell[] {
        const initial_column_index = random_int(columns.length);
        let selected_cells: Cell[] = [];

        for (let i = initial_column_index; i < columns.length; i++) {
            const range = random_range(columns[i]);
            selected_cells = selected_cells.concat(range_to_cells(range, i));
        }
        return selected_cells;
    }
}

// Always starts at lower cell
function random_range(column: Column) {
    const upper_bound = column.length - 1;
    const lower_bound = random_int(upper_bound);

    return [lower_bound, upper_bound] as const;
}

function range_to_cells(range: readonly [number, number], col: number): Cell[] {
    const cells: Cell[] = [];
    for (let i = range[0]; i <= range[1]; i++) {
        cells.push([col, i]);
    }
    return cells;
}
