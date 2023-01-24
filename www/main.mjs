import {ELEM,CSS} from "/js/htmlgen/3.0.mjs";
import {RoundBox,FlexCol,FlexRow} from "/js/components/flexbox.mjs";
import {ChessUI} from "./UI.mjs";

CSS.init();
let body = new ELEM(document.body);

let r = body.add(new FlexRow(`
min-height:100vh;
box-sizing:border-box;
padding:0.5rem;
`));

let chessUI = r.add(new RoundBox("flex:1")).add(new ChessUI);
r.add(new RoundBox("width:300px"));



