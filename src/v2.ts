class V2 {
    public x: number;
    public y:number;

    constructor(x:number,y:number){
        this.x = x;
        this.y = y;
    }

    public static create(x:number,y:number){
        return new V2(x,y);
    }

    public clone(){
        return new V2(this.x,this.y);
    }

    public static createByMagnitudeAndAngle(mag:number,angle:number):V2{
        return new V2(mag * Math.cos(angle),mag * Math.sin(angle));
    }

    public get angle():number{
        return Math.atan2(this.y,this.x);
    }

    public static getAngle(v:V2):number{
        return Math.atan2(v.y,v.x);
    }

    public get degree():number{
        return 360/(2*Math.PI)*Math.atan2(this.y,this.x);
    }

}

export default V2
