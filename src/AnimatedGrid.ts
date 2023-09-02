import p5 from "p5";
import { Grid } from "./Grid";
import { easeInCubic, easeOutCubic, easeOutQuint } from "./timing_functions";

interface Animate {
    update(delta: number): void;
    draw(p: p5): void;
}

// type EasingFunctionAnimation = {
//     initial_value: number;
//     easing_function: (x: number) => number;
// };

export class AnimatedGrid implements Animate {
    private grid: Grid;
    private x: number;
    private initial_y: number;
    private y: number;
    private acummulated_time: number;

    constructor(grid: Grid, offset_x: number, offset_y: number) {
        this.grid = grid;
        this.x = offset_x;
        this.initial_y = offset_y;
        this.y = offset_y;
        this.acummulated_time = 0;
    }

    update(delta: number): void {
        this.acummulated_time += delta;
        this.y =
            this.initial_y +
            easeOutCubic(Math.min(this.acummulated_time * 0.001, 1)) * 10;
    }

    draw(p: p5): void {
        p.push();
        p.translate(Grid.CELL_SIZE * this.x, Grid.CELL_SIZE * this.y);
        this.grid.draw(p);
        p.pop();
    }
}
