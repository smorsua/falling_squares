import p5 from "p5";
import { Grid } from "./Grid";
type Column = boolean[];

Grid.CELL_SIZE = 150;
const COLS = 4;
const ROWS = 4;
const FRAGMENT_SIZE = 3;

const initial_grid = new Grid(create_initial_columns(), 0, 0);

export function setup(p: p5) {
    p.createCanvas(p.windowWidth, p.windowHeight);
    const fragment = select_fragment(initial_grid.columns);
    p.fill(0, 0, 0);
    p.stroke(255, 255, 255);
    initial_grid.draw(p);
    p.fill(255, 255, 0);
    fragment.draw(p);
}

export function draw(p: p5) {}

function create_initial_columns() {
    const columns: Column[] = [];

    for (let i = 0; i < COLS; i++) {
        columns.push([]);
        for (let j = 0; j < ROWS; j++) {
            columns[i].push(true);
        }
    }

    return columns;
}

function select_fragment(columns: Column[]): Grid {
    const initial_column_index = random_int(COLS);
    const fragment_ranges: (readonly [number, number])[] = [];

    for (let i = initial_column_index; i < COLS; i++) {
        const range = random_range(columns[i]);
        fragment_ranges.push(range);
    }

    const largest_range = fragment_ranges.reduce(
        (prev, curr) => {
            const min = curr[0] < prev[0] ? curr[0] : prev[0];
            const max = curr[1] > prev[1] ? curr[1] : prev[1];
            return [min, max];
        },
        [Infinity, -1]
    );
    const column_height = largest_range[1] - largest_range[0] + 1;

    const fragment_cols: Column[] = fragment_ranges.map((range) => {
        const column = [];
        for (let i = 0; i < column_height; i++) {
            column.push(i >= range[0] && i <= range[1]);
        }
        return column;
    });

    return new Grid(
        fragment_cols,
        initial_column_index * Grid.CELL_SIZE,
        largest_range[0] * Grid.CELL_SIZE
    );
}

// Always starts at lower cell
function random_range(column: Column) {
    const upper_bound = column.length - 1;
    const lower_bound = random_int(upper_bound);

    return [lower_bound, upper_bound] as const;
}

function random_int(upper_bound: number) {
    return Math.floor(Math.random() * upper_bound);
}
