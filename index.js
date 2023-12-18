const express = require("express");
const { createCanvas } = require("canvas");
const app = express();

app.get("/", async (req, res) => {
  res.setHeader("Content-Type", "text/html; charset=utf-8");
  res.send(`<h1>This website is just a joke. No user data is stored</h1>`);
});

app.get("/generate", async (req, res) => {
  const canvas = createCanvas(800, 600);
  const ctx = canvas.getContext("2d");

  const clientIp = req.header("x-forwarded-for");

  ctx.font = "30px Arial";

    var response = await fetch('https://freeipapi.com/api/json/' + clientIp)
    var data = await response.json()

    var text = ''

    for(let i in data) {
        text += `${i}: ${data[i]}\n`
    }

  ctx.fillText(`${text}`, 50, 50);

  const buffer = canvas.toBuffer("image/png");

  res.type("png");
  res.send(buffer);
});

const port = 3000;
app.listen(port, () => {
  console.log(`Server is running on :${port}`);
});
