"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Simple1DNoise = void 0;
const common_1 = require("./common");
class Simple1DNoise {
    constructor(options) {
        this.octaves = 4;
        this.lactunarity = 2;
        this.gain = 0.5;
        this.amplitude = 1;
        this.frequency = 1;
        this.seed = 351263;
        if (options) {
            for (let key in options) {
                this[key] = options[key];
            }
        }
    }
    noise(x) {
        let y = 0;
        let amplitude = this.amplitude;
        let frequency = this.frequency;
        for (let j = 0; j < this.octaves; j++) {
            y += amplitude * (0, common_1.mix)((0, common_1.random2)(Math.floor(x * frequency), this.seed), (0, common_1.random2)(Math.floor(x * frequency) + 1, this.seed), (0, common_1.smoothstep)(0, 1, (0, common_1.fract)(x * frequency)));
            frequency *= this.lactunarity;
            amplitude *= this.gain;
        }
        return y;
    }
}
exports.Simple1DNoise = Simple1DNoise;
//# sourceMappingURL=noise.js.map