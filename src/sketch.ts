import p5 from "p5";
import { Cell, Column, Grid } from "./Grid";
import { Fragment, FragmentGrid } from "./FragmentGrid";
import { RandomFragment } from "./RandomFragment";
import { EdgeFragment } from "./EdgeFragment";
import { random_int } from "./math";

Grid.CELL_SIZE = 50;
const COLS = 5;
const ROWS = 5;

const mother_grid = new FragmentGrid(
    {
        columns: create_initial_columns(),
        offset_x: 0,
        offset_y: 0,
    },
    new EdgeFragment()
);
const fragments: [p5.Color, Grid][] = [];

export function setup(p: p5) {
    p.createCanvas(p.windowWidth, p.windowHeight);
    p.stroke(255, 255, 255);

    for (let i = 0; i < 4; i++) {
        setTimeout(() => {
            const fragment = mother_grid.take_fragment();
            p.fill(255, 255, 0);
            fragments.push([
                p.color(random_int(256), random_int(256), random_int(256)),
                fragment,
            ]);
        }, 1000 * i);
    }
}

export function draw(p: p5) {
    p.fill(0, 0, 0);
    mother_grid.draw(p);

    for (const [color, fragment] of fragments) {
        p.fill(color);
        fragment.draw(p);
    }
}

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
