// Example Mirai Bot command
var apiUrl = "https://rahat-time-api.onrender.com/time";

var request = require("request");
var fs = require("fs");

request({ url: apiUrl, encoding: null }, function(err, response, body) {
    if (err) return console.log(err);

    fs.writeFileSync("./cache/rahat_time.gif", body);

    Api.sendMessage(
        {
            body: "⏱️ সময় + 🗓️ তারিখ",
            attachment: fs.createReadStream("./cache/rahat_time.gif")
        },
        event.threadID,
        () => fs.unlinkSync("./cache/rahat_time.gif")
    );
});
