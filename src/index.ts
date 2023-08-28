// p5-sketch.ts
import p5 from "p5";
import { setup, draw } from "./sketch";

const sketch = (p: p5) => {
    p.setup = () => setup(p);

    p.draw = () => draw(p);
};

new p5(sketch);
