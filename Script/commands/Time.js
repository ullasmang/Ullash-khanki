const fs = require("fs-extra");
const { spawn } = require("child_process");

module.exports.config = {
 name: "time",
 version: "6.0",
 hasPermssion: 0,
 credits: "Rahat Bot",
 description: "Beautiful neon time gif",
 commandCategory: "Info",
 cooldowns: 1
};

module.exports.run = async function ({ api, event }) {

api.sendMessage("⏳wait...", event.threadID);

const child = spawn("node", [__dirname + "/time_render.js"]);

child.on("close", () => {

const path = __dirname + "/cache/rahat_time.gif";

api.sendMessage({
 body: "⏱️",
 attachment: fs.createReadStream(path)
}, event.threadID);

});

};
