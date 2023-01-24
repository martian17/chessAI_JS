//const http = require('https'); // or 'https' for https:// URLs
//const fs = require('fs');
import * as https from "https";
import * as fs from "fs";


const urls = JSON.parse(fs.readFileSync("./wikiurls.json"));

urls.map((url,i)=>{
    https.get(url,(res)=>{
        //let fname = url.split("/").pop().trim();
        let fname = `${i%2&1?"b":"w"}${Math.floor(i/2)+1}.png`;//url.split("/").pop().trim();
        const file = fs.createWriteStream(fname);
        res.pipe(file);
        file.on("finish",()=>{
            file.close();
            console.log(`finished downloading ${fname}`);
        });
    });
});


