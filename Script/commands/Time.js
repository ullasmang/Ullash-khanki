const moment = require("moment-timezone");
const fs = require("fs-extra");
const { createCanvas } = require("canvas");
const GIFEncoder = require("gifencoder");

module.exports.config = {
 name: "time",
 version: "5.0",
 hasPermssion: 0,
 credits: "Rahat Bot",
 description: "Neon GIF Time",
 commandCategory: "Info",
 cooldowns: 1
};

module.exports.run = async function ({ api, event }) {

const date = moment.tz("Asia/Dhaka").format("DD MMMM YYYY");
const time = moment.tz("Asia/Dhaka").format("hh:mm A");
const day = moment.tz("Asia/Dhaka").format("dddd");

const WIDTH = 900;
const HEIGHT = 1100;

const encoder = new GIFEncoder(WIDTH, HEIGHT);
const canvas = createCanvas(WIDTH, HEIGHT);
const ctx = canvas.getContext("2d");

const path = __dirname + "/cache/rahat_time.gif";
const stream = encoder.createReadStream().pipe(fs.createWriteStream(path));

encoder.start();
encoder.setRepeat(0);
encoder.setDelay(400);
encoder.setQuality(10);

const colors = ["#FF0000", "#0066FF"]; // red & blue glow

for (let i = 0; i < 6; i++) {

const glow = colors[i % 2];

// background
ctx.fillStyle = "#000000";
ctx.fillRect(0, 0, WIDTH, HEIGHT);

// neon frame
ctx.shadowColor = glow;
ctx.shadowBlur = 40;
ctx.lineWidth = 12;
ctx.strokeStyle = glow;
ctx.strokeRect(40, 40, WIDTH - 80, HEIGHT - 80);

ctx.shadowBlur = 0;

// time
ctx.font = "110px Arial Black";
ctx.fillStyle = "#FFFFFF";
ctx.textAlign = "center";
ctx.fillText(time, WIDTH / 2, 220);

// day
ctx.font = "80px Arial Black";
ctx.fillStyle = glow;
ctx.fillText(day.toUpperCase(), WIDTH / 2, 330);

// date
ctx.font = "45px Arial";
ctx.fillStyle = "#CFCFCF";
ctx.fillText(date, WIDTH / 2, 400);

// footer
ctx.shadowColor = glow;
ctx.shadowBlur = 25;
ctx.font = "40px Arial Black";
ctx.fillStyle = glow;
ctx.fillText("Rahat Bot", WIDTH / 2, HEIGHT - 70);

ctx.shadowBlur = 0;

encoder.addFrame(ctx);

}

encoder.finish();

stream.on("finish", () => {

api.sendMessage({
body: `⏱️ সময় ${time}\n🗓️ তারিখ ${date}`,
attachment: fs.createReadStream(path)
}, event.threadID, () => fs.unlinkSync(path));

});

};
