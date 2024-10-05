import { mix, random, smoothstep, fract, random2 } from './common';


interface INoiseOptions{
  octaves: number;
  lactunarity: number;
  gain: number;
  amplitude: number;
  frequency: number;
  seed:number;
}

export class Simple1DNoise{

  public octaves = 4;
  public lactunarity = 2;
  public gain = 0.5;
  public amplitude = 1;
  public frequency = 1;
  public seed = 351263;

  constructor(options?: Partial<INoiseOptions>){
    if(options){
      for(let key in options){
        (<any>this)[key] = options[key as keyof INoiseOptions]
      }
    }
  }

  noise(x: number){
    let y = 0;
    let amplitude = this.amplitude;
    let frequency = this.frequency;

    for(let j = 0; j < this.octaves; j++){
      y += amplitude * mix(random2(Math.floor(x * frequency),this.seed), random2(Math.floor(x * frequency) + 1,this.seed), smoothstep(0, 1, fract(x * frequency)));
      frequency *= this.lactunarity;
      amplitude *= this.gain;
    }
    return y;

  }

}
