const axios = require('axios');

const siteUrl = 'https://eflesia.com'; // place ur web site url 
const webhookUrl = 'https://discord.com/api/webhooks/1093954467071791206/aEk47YcNETwMLfDvC3hi7gk0a3iWNQe9IZ1o-s5mOOkup9oVWT2UhwNP6YYgfn_W1jw_'; // place ur token

let isOnline = false;
let lastOnlineNotification = null;

function checkSite() {
  console.log('i analyse the website');

  axios.get(siteUrl)
    .then(() => {
      
      console.log('The website is online.');

      if (!isOnline) {
        isOnline = true;
        lastOnlineNotification = null;
        sendWebhook('The website is online back.');
      }
    })
    .catch((err) => {
      console.error(`the website is offline : ${err.message}`);

      const now = new Date().getTime();
      const heure24 = 24 * 60 * 60 * 1000;
      if (!lastOnlineNotification || (now - lastOnlineNotification) >= heure24) {
        lastOnlineNotification = now;
        isOnline = false;
        sendWebhook('The website is offline.');
      }
    });
}

function sendWebhook(message) {
  const data = {
    content: message
  };

  axios.post(webhookUrl, data, {
    headers: {
      'Content-Type': 'application/json'
    }
  }).then(() => {
    console.log(`webhook sent : ${message}`);
  }).catch((err) => {
    console.error(`error : ${err.message}`);
  });
}
setInterval(checkSite, 24 * 60 * 60 * 1000);
checkSite();
