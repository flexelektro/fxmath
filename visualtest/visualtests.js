import {V2} from "../dist"
import Two from "two.js"
const defaultParams = {
    width:400,
    height:300,
    autostart:true
}

let two = new Two(defaultParams).appendTo(document.getElementById("content"));

let bg = two.makeRectangle(two.width / 2, two.height / 2,two.width,two.height);
bg.fill = "red";

let v1 = V2.create(200,200);
let v1draw = two.makeLine(0,0,v1.x,v1.y)

let v2 = V2.create(300,30);
let v2draw = two.makeLine(0,0,v2.x,v2.y)

let v3 = V2.projectionFromTo(v1,v2);
let v3draw = two.makeLine(0,0,v3.x,v3.y)
v3draw.lineWidth = 8;
v3draw.stroke = "white"
