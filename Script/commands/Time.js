const moment = require("moment-timezone");
const fs = require("fs-extra");
const { createCanvas } = require("canvas");
const GIFEncoder = require("gifencoder");

module.exports.config = {
 name: "time",
 version: "5.1",
 hasPermssion: 0,
 credits: "🔰𝐑𝐀𝐇𝐀𝐓 𝐈𝐒𝐋𝐀𝐌🔰",
 description: "Beautiful date/time generator",
 commandCategory: "Info",
 cooldowns: 1
};

module.exports.run = async function ({ api, event }) {

api.sendMessage("⏳𝐏𝐥𝐞𝐚𝐬𝐞 𝐰𝐚𝐢𝐭...", event.threadID);

setTimeout(() => {

const now = moment.tz("Asia/Dhaka");

const date = now.format("DD MMMM YYYY");
const time = now.format("hh:mm A");
const day = now.format("dddd");

const WIDTH = 900;
const HEIGHT = 1100;

const canvas = createCanvas(WIDTH, HEIGHT);
const ctx = canvas.getContext("2d");

const encoder = new GIFEncoder(WIDTH, HEIGHT);
const path = __dirname + "/cache/rahat_time.gif";

encoder.createReadStream().pipe(fs.createWriteStream(path));

encoder.start();
encoder.setRepeat(0);
encoder.setDelay(90);
encoder.setQuality(20);

for (let i = 0; i < 40; i++) {

let hue = i * 9;
let color = `hsl(${hue},100%,50%)`;

let gradient = ctx.createRadialGradient(
 WIDTH/2, HEIGHT/2, 100,
 WIDTH/2, HEIGHT/2, 600
);

gradient.addColorStop(0, "#001010");
gradient.addColorStop(1, "#000000");

ctx.fillStyle = gradient;
ctx.fillRect(0, 0, WIDTH, HEIGHT);

ctx.shadowColor = color;
ctx.shadowBlur = 40;
ctx.lineWidth = 15;
ctx.strokeStyle = color;
ctx.strokeRect(40, 40, WIDTH - 80, HEIGHT - 80);

ctx.shadowBlur = 0;

ctx.font = "110px Arial Black";
ctx.fillStyle = "#FFFFFF";
ctx.textAlign = "center";
ctx.fillText(time, WIDTH / 2, 220);

ctx.font = "80px Arial Black";
ctx.fillStyle = color;
ctx.fillText(day.toUpperCase(), WIDTH / 2, 330);

ctx.font = "45px Arial";
ctx.fillStyle = "#CFCFCF";
ctx.fillText(date, WIDTH / 2, 400);

ctx.font = "38px Arial";
const days = ["Sun","Mon","Tue","Wed","Thu","Fri","Sat"];

ctx.fillStyle = color;

let x = 120;
let y = 500;

days.forEach(d => {
 ctx.fillText(d, x, y);
 x += 110;
});

let firstDay = now.clone().startOf("month").day();
let totalDays = now.daysInMonth();

x = 120;
y = 570;

for (let i = 0; i < firstDay; i++) x += 110;

for (let d = 1; d <= totalDays; d++) {

 if (d === now.date()) {

  ctx.beginPath();
  ctx.arc(x, y - 30, 42, 0, Math.PI * 2);
  ctx.fillStyle = color;
  ctx.fill();

  ctx.font = "45px Arial Black";
  ctx.fillStyle = "#000";
  ctx.fillText(d, x, y - 15);

 } else {

  ctx.font = "42px Arial";
  ctx.fillStyle = "#D0D0D0";
  ctx.fillText(d, x, y - 15);

 }

 x += 110;

 if (x > 800) {
  x = 120;
  y += 100;
 }

}

ctx.font = "40px Arial Black";
ctx.fillStyle = color;
ctx.shadowColor = color;
ctx.shadowBlur = 25;
ctx.fillText("Rahat Bot", WIDTH / 2, HEIGHT - 70);

ctx.shadowBlur = 0;

encoder.addFrame(ctx);
}

encoder.finish();

setTimeout(() => {

api.sendMessage({
 body: `⏱️ সময় ${time}\n🗓️ তারিখ ${date}`,
 attachment: fs.createReadStream(path)
},
event.threadID,
() => fs.unlinkSync(path)
);

}, 800);

}, 0);

};
