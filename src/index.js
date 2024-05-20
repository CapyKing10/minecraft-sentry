const mineflayer = require('mineflayer');
const fs = require('fs');
const config = JSON.parse(fs.readFileSync("./config.json", "utf-8"));
const utils = require("./utils");

const mainBot = () => {
  const bot = mineflayer.createBot({
    host: config.ip,
    port: config.port,
    username: config.username,
    skipValidation: true
  });
  
  if (config.isCracked) {
    bot.on("spawn", (message) => {
      bot.waitForTicks(20);
      bot.chat(`/login ${config.password}`);
    })
  }
  
  const playersInView = new Set();
  
  bot.on('entitySpawn', (entity) => {
    if (entity.type === 'player') {
      if (entity.username == bot.username) return;
      if (!playersInView.has(entity.username)) {
        playersInView.add(entity.username);
        utils.enterRenderdistance(entity.username, Math.round(entity.position.x), Math.round(entity.position.y), Math.round(entity.position.z), "Summer Valley", "Entered");
      }
    }
  });
  
  bot.on('entityGone', (entity) => {
    if (entity.type === 'player') {
      if (entity.username == bot.username) return;
      if (playersInView.has(entity.username)) {
        playersInView.delete(entity.username);
        utils.enterRenderdistance(entity.username, Math.round(entity.position.x), Math.round(entity.position.y), Math.round(entity.position.z), "Summer Valley", "Left");
      }
    }
  });
  
  bot.on("error", (err) => {
    console.log(err);
    bot.end();
  });

  bot.on("kicked", (err) => {
      console.log(err);
      bot.end();
  });

  bot.on("end", () => {
      bot.removeAllListeners();
      setTimeout(mainBot, 5000);
  });
}