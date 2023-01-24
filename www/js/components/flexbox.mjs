import {ELEM,CSS} from "/js/htmlgen/3.0.mjs";


const makeElemClass = function(classname,css){
    CSS.add(`.${classname}{${css}}\n`);
    return class extends ELEM{
        constructor(style){
            super("div",`class:${classname}`,0,style);
        }
    }
};




export const RoundBox = makeElemClass("roundbox",`
background-color: rgb(34, 34, 34);
color:#fff;
border-radius:0.5rem;
padding:0.5rem;
`);

export const FlexCol = makeElemClass("flex-col",`
display:flex;
gap:0.5rem;
flex-direction:column;
`);

export const FlexRow = makeElemClass("flex-row",`
display:flex;
gap:0.5rem;
flex-direction:row;
`);
