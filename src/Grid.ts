import p5 from "p5";

export type Column = boolean[];
export type Cell = [number, number];

export class Grid {
    public static CELL_SIZE = 20;
    public columns: Column[];

    constructor(columns: Column[]) {
        this.columns = columns;
    }

    public draw(p: p5) {
        for (const [i, column] of this.columns.entries()) {
            for (const [j, cell] of column.entries()) {
                if (cell) {
                    p.square(
                        i * Grid.CELL_SIZE,
                        j * Grid.CELL_SIZE,
                        Grid.CELL_SIZE
                    );
                }
            }
        }
    }
}
