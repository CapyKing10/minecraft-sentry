const axios = require('axios');
const fs = require('fs');
const config = JSON.parse(fs.readFileSync("./config.json", "utf-8"));

function enterRenderdistance(username, x, y, z, status) {
    const embed = {
        title: `${username} ${status} Render Distance!`,
        color: hexToDecimalRGB(config.embedColor),
        thumbnail: {
            url: `https://mc-heads.net/head/${username}`
        },
        fields: [
            {
                name: "at coordinates: ",
                value: "```" + `x: ${x}, y: ${y}, z: ${z}` + "```",
                inline: true
            },
        ],
        footer: {
            text: config.embedFooterText,
            icon_url: config.image
        },
        timestamp: new Date()
    };

    const payload = {
        username: config.webhookName,
        avatar_url: config.image,
        embeds: [embed]
    };

    axios.post(config.webhookURL, payload)
    .catch(error => {
        console.error('Error sending message to the webhook: ', error);
    });
}

function hexToDecimalRGB(hex) {
    if (hex.startsWith('#')) {
        hex = hex.slice(1);
    }
    const decimalColorCode = parseInt(hex, 16);
    return decimalColorCode;
}

exports.enterRenderdistance = enterRenderdistance;