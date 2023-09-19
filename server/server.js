const express = requrie('express');
const {randomBytes} = require('crypto')
const { getFromRedis, errorResponse, successResponse} = require('./utils.js')
const app = express();
const PORT = 3000;

app.use(express.json())
app.use(express.urlencoded())

app.post("/submit", async (req,res)=>{
    try {
        let data = {
            'src': req.body.src,
            'input': req.body.stdin,
            'lang': req.body.lang,
            'timeOut': req.body.timeout,
            'folder': randomBytes(10).toString('hex')
        }
        await sendMessage(data);
        res.status(202).send(successResponse(`http://localhost:3000/results/${data.folder}`));
    } catch (error) {
        console.log(error);
        res.status(500).send(errorResponse(500, "System error"));
    }

})

app.get("/results/:id", async (req, res) => {

    try {
        let key = req.params.id;
        let status = await getFromRedis(key);

        if (status == null) {
            res.status(202).send({ "status": "Queued" });
        }
        else if (status == 'Processing') {
            res.status(202).send({ "status": "Processing" });
        }
        else {
            status = JSON.parse(status);
            res.status(200).send(successResponse(status));
        }
    } catch (error) {
        res.status(500).send(errorResponse(500, "System error"));
    }

});

app.listen(PORT, () => console.log("Server running at port " + PORT))
