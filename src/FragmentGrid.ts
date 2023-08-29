import { Cell, Column, Grid } from "./Grid";

export interface Fragment {
    fragment(columns: readonly Column[]): Cell[];
}

export class FragmentGrid extends Grid {
    private fragmenter: Fragment;

    constructor(
        grid_config: {
            columns: Column[];
            offset_x: number;
            offset_y: number;
        },
        fragmenter: Fragment
    ) {
        super(grid_config.columns, grid_config.offset_x, grid_config.offset_y);
        this.fragmenter = fragmenter;
    }

    public take_fragment(): Grid {
        // const fragment_cells = select_fragment_cells(this.columns);
        const fragment_cells = this.fragmenter.fragment(this.columns);
        this.remove_cells(fragment_cells);
        return cells_to_grid(fragment_cells);
    }

    private remove_cells(cells: readonly Cell[]) {
        for (const cell of cells) {
            this.columns[cell[0]][cell[1]] = false;
        }
    }
}

function cells_to_grid(cells: Cell[]): Grid {
    const h_range = cells.reduce(
        (prev_range, curr_cell) => {
            const min =
                curr_cell[0] < prev_range[0] ? curr_cell[0] : prev_range[0];
            const max =
                curr_cell[0] > prev_range[1] ? curr_cell[0] : prev_range[1];
            return [min, max];
        },
        [Infinity, -1]
    );

    const v_range = cells.reduce(
        (prev_range, curr_cell) => {
            const min =
                curr_cell[1] < prev_range[0] ? curr_cell[1] : prev_range[0];
            const max =
                curr_cell[1] > prev_range[1] ? curr_cell[1] : prev_range[1];
            return [min, max];
        },
        [Infinity, -1]
    );

    const cols = h_range[1] - h_range[0] + 1;
    const rows = v_range[1] - v_range[0] + 1;

    let columns: Column[] = [];

    for (let i = 0; i < cols; i++) {
        columns.push([]);
        for (let j = 0; j < rows; j++) {
            columns[i].push(
                cells.find(
                    (item) =>
                        item[0] == i + h_range[0] && item[1] == j + v_range[0]
                ) !== undefined
            );
        }
    }

    return new Grid(
        columns,
        h_range[0] * Grid.CELL_SIZE,
        v_range[0] * Grid.CELL_SIZE
    );
}
