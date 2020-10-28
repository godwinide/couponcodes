const express = require("express");
const app = express();
const dotenv = require("dotenv")
const cors = require("cors")
const rp = require("request-promise");
const $ = require("cheerio");

dotenv.config()
app.use(cors())


app.get("/", async (req,res) => {
    const coupons = [];
    const url = "https://www.triple.com.ng/index.php/bet9ja-pools-code/item/436";
    const response = await rp.get(url);
    const html = $.parseHTML(response);
    const tr = $("#table tr", html).slice(1).each((i, e) => {
       const match = {};
       const number = $("td:nth-child(1)", e).text()
       if(number.length > 0 && number !== null && number !== ""){
        match.number = $("td:nth-child(1)", e).text()
        match.home = $("td:nth-child(2)", e).text()
        match.away = $("td:nth-child(4)", e).text()
        match.code = $("td:nth-child(5)", e).text()
        coupons.push(match);
       }
    })

    res.send(coupons)
})

const PORT = process.env.PORT
app.listen(PORT, () => console.log(`server started on port ${PORT}`));