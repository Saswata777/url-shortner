const express = require("express");
const {connectTomongoDb} = require('./connect.js');
const app = express();
const urlroute = require('./routes/url.js');
const URL  = require('./modules/url.js')

const PORT  = 8001;

connectTomongoDb('mongodb://127.0.0.1:27017/short-url')
.then(()=>{
    console.log("MongoDb connected");
})

app.use(express.json());

app.use("/url", urlroute);

app.get('/:shortId', async (req, res)=>{
    const shortId = req.params.shortId;
const entry = await URL.findOneAndUpdate({
        shortId
    }, {$push : {
        visitHistory : {
            timestamp: Date.now()} ,
    }})
    res.redirect(entry.longUrl);
})


app.listen(PORT, ()=>{
    console.log(`Server is started at Port:  ${PORT}`);
})