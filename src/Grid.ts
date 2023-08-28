import p5 from "p5";

type Column = boolean[];

export class Grid {
    public static CELL_SIZE = 20;
    public columns: Column[];
    public offset_x: number;
    public offset_y: number;

    constructor(columns: Column[], offset_x: number, offset_y: number) {
        this.columns = columns;
        this.offset_x = offset_x;
        this.offset_y = offset_y;
    }

    public draw(p: p5) {
        for (const [i, column] of this.columns.entries()) {
            for (const [j, cell] of column.entries()) {
                if (cell) {
                    p.square(
                        i * Grid.CELL_SIZE + this.offset_x,
                        j * Grid.CELL_SIZE + this.offset_y,
                        Grid.CELL_SIZE
                    );
                }
            }
        }
    }
}
