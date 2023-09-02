import p5 from "p5";
import { Column, Grid } from "./Grid";
import { FragmentGrid } from "./FragmentGrid";
import { EdgeFragment } from "./fragments/EdgeFragment";
import { random_int } from "./math";
import { AnimatedGrid } from "./AnimatedGrid";
import { LimitedRandomFragment } from "./fragments/LimitedRandomFragment";
import { ContinuosFragment } from "./fragments/ContinuosFragment";
import { RandomFragment } from "./fragments/RandomFragment";

Grid.CELL_SIZE = 10;
const COLS = 5;
const ROWS = 30;

const mother_grid = new FragmentGrid(
    create_initial_columns(),
    new ContinuosFragment(2)
);
const fragments: [p5.Color, AnimatedGrid][] = [];

export function setup(p: p5) {
    p.createCanvas(p.windowWidth, p.windowHeight);
    p.translate(100, 100);
    p.stroke(255, 255, 255);

    for (let i = 0; i < ROWS; i++) {
        setTimeout(() => {
            const [fragment, x, y] = mother_grid.take_fragment();
            p.fill(255, 255, 0);
            fragments.push([
                // p.color(random_int(256), random_int(256), random_int(256)),
                p.color(0, 0, 0),
                new AnimatedGrid(fragment, x, y),
            ]);
        }, 50 * i);
    }
}

export function draw(p: p5) {
    p.background(255, 255, 255);
    center_grid(p);
    p.fill(0, 0, 0);
    mother_grid.draw(p);

    for (const [color, fragment] of fragments) {
        p.fill(color);
        fragment.update(p.deltaTime);
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

function center_grid(p: p5) {
    const cols = mother_grid.columns.length;
    const grid_width = cols * Grid.CELL_SIZE;
    p.translate(p.windowWidth / 2 - grid_width / 2, 50);
}
