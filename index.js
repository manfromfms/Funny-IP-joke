const express = require("express");
const {
    createCanvas, Image
} = require("canvas");
const app = express();

const fs = require('fs')

app.get("/", async (req, res) => {
    res.setHeader("Content-Type", "text/html; charset=utf-8");
    res.send(`<h1>This website is just a joke. No user data is stored</h1>`);
});

app.get("/generate", async (req, res) => {
    const canvas = createCanvas(800, 600);
    const ctx = canvas.getContext("2d");

    const clientIp = req.header("x-forwarded-for");

    var responseIP = await fetch('https://freeipapi.com/api/json/' + clientIp)
    var dataIp = await responseIP.json()

    var text = ''

    for (let i in dataIp) {
        text += `${i}: ${dataIp[i]}\n`
    }

    ctx.font = "30px Arial";
    ctx.fillText(`${text}`, 50, 50);

    const buffer = canvas.toBuffer("image/png");

    res.type("png");
    res.send(buffer);
});

const port = 3000;
app.listen(port, () => {
    console.log(`Server is running on :${port}`);
});