//const http = require('https'); // or 'https' for https:// URLs
//const fs = require('fs');
import * as https from "https";
import * as fs from "fs";
import fetch from "node-fetch";


const urls = JSON.parse(fs.readFileSync("./wikiurls.json"));




urls.map(async (url,i)=>{
    url = url.replace("/25px","/100px");
    console.log(url);
    let res = await fetch(url, {
        "headers": {
            "accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9",
            "accept-language": "en-US,en;q=0.9,ja;q=0.8,zh-TW;q=0.7,zh;q=0.6",
            "cache-control": "no-cache",
            "pragma": "no-cache",
            "sec-ch-ua": "\"Not_A Brand\";v=\"99\", \"Google Chrome\";v=\"109\", \"Chromium\";v=\"109\"",
            "sec-ch-ua-arch": "\"x86\"",
            "sec-ch-ua-bitness": "\"64\"",
            "sec-ch-ua-full-version-list": "\"Not_A Brand\";v=\"99.0.0.0\", \"Google Chrome\";v=\"109.0.5414.74\", \"Chromium\";v=\"109.0.5414.74\"",
            "sec-ch-ua-mobile": "?0",
            "sec-ch-ua-model": "\"\"",
            "sec-ch-ua-platform": "\"Linux\"",
            "sec-ch-ua-platform-version": "\"5.15.0\"",
            "sec-fetch-dest": "document",
            "sec-fetch-mode": "navigate",
            "sec-fetch-site": "none",
            "sec-fetch-user": "?1",
            "upgrade-insecure-requests": "1"
        },
        "referrerPolicy": "strict-origin-when-cross-origin",
        "body": null,
        "method": "GET"
    });
    const fname = `${i%2&1?"b":"w"}${Math.floor(i/2)+1}.png`;
    const file = fs.createWriteStream(fname);

    res.body.pipe(file);
    file.on("finish",()=>{
        file.close();
        console.log(`finished downloading ${fname}`);
    });
});


