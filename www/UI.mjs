import {ELEM,CSS} from "/js/htmlgen/3.0.mjs";
import {EMPTY,KING,QUEEN,ROOK,BISHOP,KNIGHT,PAWN,BLACK,WHITE} from "./type-enum.mjs";
import {newarr} from "/js/ds-js/arrutil.mjs";

CSS.add(`
.chessui{
    display: flex;
    justify-content: center;
}
`);

let images = await Promise.all(newarr(14).map((_,i)=>{
    let fname = (`${i%2&1?"b":"w"}${Math.floor(i/2)}.png`);
    let img = new Image;
    img.src = `/assets/${fname}`;
    return new Promise(res=>{
        img.onload = ()=>{
            res(img);
        }
    });
}));
console.log(images);


export class ChessUI extends ELEM{
    width = 500;
    height = 500;
    constructor(){
        super("div","class:chessui");
        let canvasE = this.add("canvas");
        let canvas = this.canvas = canvasE.e;
        this.ctx = canvas.getContext("2d");
        this.updateCanvas();
    }
    state = [
        [ROOK<<1|BLACK,0,0],
        [KNIGHT<<1|BLACK,1,0],
        [BISHOP<<1|BLACK,2,0],
        [QUEEN<<1|BLACK,3,0],
        [KING<<1|BLACK,4,0],
        [BISHOP<<1|BLACK,5,0],
        [KNIGHT<<1|BLACK,6,0],
        [ROOK<<1|BLACK,7,0],
        [PAWN<<1|BLACK,0,1],
        [PAWN<<1|BLACK,1,1],
        [PAWN<<1|BLACK,2,1],
        [PAWN<<1|BLACK,3,1],
        [PAWN<<1|BLACK,4,1],
        [PAWN<<1|BLACK,5,1],
        [PAWN<<1|BLACK,6,1],
        [PAWN<<1|BLACK,7,1],
        [ROOK<<1|WHITE,0,7],
        [KNIGHT<<1|WHITE,1,7],
        [BISHOP<<1|WHITE,2,7],
        [QUEEN<<1|WHITE,3,7],
        [KING<<1|WHITE,4,7],
        [BISHOP<<1|WHITE,5,7],
        [KNIGHT<<1|WHITE,6,7],
        [ROOK<<1|WHITE,7,7],
        [PAWN<<1|WHITE,0,6],
        [PAWN<<1|WHITE,1,6],
        [PAWN<<1|WHITE,2,6],
        [PAWN<<1|WHITE,3,6],
        [PAWN<<1|WHITE,4,6],
        [PAWN<<1|WHITE,5,6],
        [PAWN<<1|WHITE,6,6],
        [PAWN<<1|WHITE,7,6]
    ];
    updateCanvas(){
        this.canvas.width = this.width;
        this.canvas.height = this.height;
        this.render();
    }
    render(state){
        if(!state){
            state = this.state;
        }
        this.state = state;
        let {ctx,width,height} = this;
        ctx.fillStyle = "#fff";
        ctx.fillRect(0,0,width,height);
        //draw grid
        let cw = this.width/8;
        let ch = this.height/8;
        for(let i = 0; i < 8; i++){
            for(let j = 0; j < 8; j++){
                if((i+j+1)&1)continue;
                ctx.fillStyle = "#88a";
                ctx.fillRect(i*cw,j*ch,cw,ch);
            }
        }

        if(!state)return;
        for(let [type,x,y] of state){
            ctx.drawImage(images[type],x*cw,y*ch,cw,ch);
        }
    }
};


