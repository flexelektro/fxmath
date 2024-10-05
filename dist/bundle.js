var w=Object.defineProperty;var L=Object.getOwnPropertyDescriptor;var z=Object.getOwnPropertyNames;var F=Object.prototype.hasOwnProperty;var H=(r,t)=>{for(var e in t)w(r,e,{get:t[e],enumerable:!0})},W=(r,t,e,n)=>{if(t&&typeof t=="object"||typeof t=="function")for(let u of z(t))!F.call(r,u)&&u!==e&&w(r,u,{get:()=>t[u],enumerable:!(n=L(t,u))||n.enumerable});return r};var j=r=>W(w({},"__esModule",{value:!0}),r);var Y={};H(Y,{V2:()=>d,createPseudoPoissonDistribution:()=>T,fract:()=>I,quinticinterpol:()=>D,smoothstep:()=>R});module.exports=j(Y);var{PI:S,log:J,sin:K,cos:Q,tan:U,atan:Z,atan2:$,random:_,floor:v,ceil:tt,sqrt:et,round:rt,exp:nt,pow:ut}=Math,it=S*2;var P=(r,t,e=!1)=>{let n=e?Math.random():O();return r+(t-r)*n};var N=r=>function(){var t=r+=1831565813;return t=Math.imul(t^t>>>15,t|1),t^=t+Math.imul(t^t>>>7,t|61),((t^t>>>14)>>>0)/4294967296},E=N(window.fxrand?fxrand()*1e4:Math.random()*1e4);var O=()=>E(),X=(r,t=!0)=>{let e=Math.exp(1),u=(Math.pow(e,2)-1)*r,i=Math.log(1+u)/2;return t?1-i:i};var I=r=>r-Math.floor(r),q=(r,t=0,e=1)=>Math.min(e,Math.max(r,t));var R=(r,t,e)=>{let n=q((e-r)/(t-r),0,1);return n*n*(3-2*n)},D=(r,t,e)=>{let n=q((e-r)/(t-r),0,1);return n*n*n*(n*(n*6-15)+10)},T=r=>{let{W:t,H:e,size:n,perc:u,hasShiftRow:i}=r,s=[],l=Math.ceil(t/n),c=Math.ceil(e/n);for(let o=0;o<c;o++){let a=[];for(let b=0;b<l;b++){let x=i&&o%2===0?n/2:0,f=fxrand?fxrand():Math.random(),M=fxrand?fxrand():Math.random(),m=f*2*Math.PI,h=X(M)*u/100*n,y=h*Math.cos(m),g=h*Math.sin(m);a.push(d.create(b*n+n/2+x+y,o*n+n/2+g))}s.push(a)}return s};var p=(r,t,e)=>e*(t-r)+r,k=(r,t)=>new V(r,t),V=class r{constructor(t,e){this.x=t,this.y=e}static fromTo(t,e){return k(e.x-t.x,e.y-t.y)}static sameLike(t,e){return t.x===e.x&&t.y===e.y}static linesIntersect(t,e,n,u){let i=t.x,s=t.y,l=e.x,c=e.y,o=n.x,a=n.y,b=u.x,x=u.y,f=r.subtract(e,t),M=r.subtract(n,u);if(f.magnitude===0||M.magnitude===0)return!1;let m=(x-a)*(l-i)-(b-o)*(c-s);if(m===0)return!1;let h=((b-o)*(s-a)-(x-a)*(i-o))/m,y=((l-i)*(s-a)-(c-s)*(i-o))/m;if(h<0||h>1||y<0||y>1)return!1;let g=i+h*(l-i),A=s+h*(c-s);return k(g,A)}static isPointInPolygon(t,e){let n=e.length,u=!1;for(let i=0,s=n-1;i<n;s=i++)e[i].y>t.y!=e[s].y>t.y&&t.x<(e[s].x-e[i].x)*(t.y-e[i].y)/(e[s].y-e[i].y)+e[i].x&&(u=!u);return u}static create(t,e){return new r(t,e)}static createByMagnitudeAndAngle(t,e){return new r(t*Math.cos(e),t*Math.sin(e))}static getAngle(t){return Math.atan2(t.y,t.x)}static angleBetween(t,e){return Math.acos(r.dotprod(t,e)/(t.magnitude*e.magnitude))}static clone(t){return new r(t.x,t.y)}static magnitude(t){return t.magnitude}static length_(t){return t.magnitude}static squareMagnitude(t){return t.squareMagnitude}static distance(t,e){return r.subtract(t,e).magnitude}static add(t,e){return new r(t.x+e.x,t.y+e.y)}static subtract(t,e){return new r(t.x-e.x,t.y-e.y)}static multiply(t,e){return new r(t.x*e,t.y*e)}static multVec(t,e){return new r(t.x*e.x,t.y*e.y)}static divide(t,e){return r.multiply(t,1/e)}static dotprod(t,e){return t.x*e.x+t.y*e.y}static dot(t,e){return t.x*e.x+t.y*e.y}static crossprod(t,e){return t.x*e.y-t.y*e.x}static unitVec(t){return r.divide(t,t.magnitude)}static projectionFromTo(t,e){let n=r.unitVec(e);return r.multiply(n,r.dotprod(t,n))}static rotate(t,e){let n=Math.cos(e),u=-Math.sin(e),i=Math.sin(e),s=Math.cos(e),l=t.x*n+t.y*u,c=t.x*i+t.y*s;return new r(l,c)}static rotateAroundPivot(t,e,n){let u=Math.cos(n),i=Math.sin(n),s=t.x-e.x,l=t.y-e.y,c=u*s-i*l+e.x,o=i*s+u*l+e.y;return new r(c,o)}static normal(t){return new r(-t.y,t.x)}static normalLeft(t){return new r(-t.y,t.x)}static normalRight(t){return new r(t.y,-t.x)}static manhattanDistance(t,e){return Math.abs(t.x-e.x)+Math.abs(t.y-e.y)}static lerp(t,e,n){let u=p(t.x,e.x,n),i=p(t.y,e.y,n);return new r(u,i)}clone(){return new r(this.x,this.y)}sameLike(t){return this.x===t.x&&this.y===t.y}copy(){return new r(this.x,this.y)}get angle(){return Math.atan2(this.y,this.x)}set angle(t){let e=this.magnitude;this.x=e*Math.cos(t),this.y=e*Math.sin(t)}setAngle(t){let e=this.magnitude;return this.x=e*Math.cos(t),this.y=e*Math.sin(t),this}get degree(){return 360/(2*Math.PI)*Math.atan2(this.y,this.x)}get normalRight(){let t=-this.y,e=this.x;return this.x=t,this.y=e,this}get normalLeft(){let t=this.y,e=-this.x;return this.x=t,this.y=e,this}set degree(t){let e=Math.PI*2/360*t;this.setAngle(e)}setDegree(t){let e=Math.PI*2/360*t;return this.setAngle(e)}get magnitude(){return Math.sqrt(this.x*this.x+this.y*this.y)}get length(){return Math.sqrt(this.x*this.x+this.y*this.y)}get squareMagnitude(){return this.x*this.x+this.y*this.y}distance(t){return r.subtract(this,t).magnitude}unitVec(){return this.divide(this.magnitude)}add(t){return this.x+=t.x,this.y+=t.y,this}addRnd(t){return this.x+=P(-t,t),this.y+=P(-t,t),this}subtract(t){return this.x-=t.x,this.y-=t.y,this}multiply(t){return this.x*=t,this.y*=t,this}multVec(t){return this.x*=t.x,this.y*=t.y,this}divide(t){return this.multiply(1/t)}dotprod(t){return this.x*t.x+this.y*t.y}dot(t){return this.x*t.x+this.y*t.y}crossprod(t){return this.x*t.y-this.y*t.x}rotate(t){let e=Math.cos(t),n=Math.sin(t),u=this.x*e-this.y*n,i=this.x*n+this.y*e;return this.x=u,this.y=i,this}rotateAroundPivot(t,e){let n=Math.cos(e),u=Math.sin(e),i=this.x-t.x,s=this.y-t.y,l=n*i-u*s+t.x,c=u*i+n*s+t.y;return this.x=l,this.y=c,this}normal(){let t=-this.y,e=this.x;return this.x=t,this.y=e,this}lerp(t,e){let n=p(this.x,t.x,e),u=p(this.y,t.y,e);return this.x=n,this.y=u,this}floorValues(){return this.x=this.x|0,this.y=this.y|0,this}isInPolygon(t){return r.isPointInPolygon(this,t)}};var d=V;0&&(module.exports={V2,createPseudoPoissonDistribution,fract,quinticinterpol,smoothstep});
//# sourceMappingURL=bundle.js.map