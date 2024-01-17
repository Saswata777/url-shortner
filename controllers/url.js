const shortid =require('shortid');
const URL = require('../modules/url.js');

async function handleGenerateshortURL(req, res){
    const body = req.body;
    if(!body.url) return res.status(400).json({error:'url is required'})
    const shortId = shortid();
    await URL.create({
        shortId: shortId,
        longUrl: body.url,
        visitHistory: []
    });
    
    return res.json({id : shortId});
}

async function handleGetAnalytics (req, res){
    const shortId = req.params.shortId;
    const result = await URL.findOne({});
    return res.json({totalClicks: result.visitHistory.length, 
                    analytics: result.visitHistory,
    });
}

module.exports = {
    handleGenerateshortURL,
    handleGetAnalytics
}