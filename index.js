require('dotenv').config();
const { Builder, By, Key, until } = require('selenium-webdriver');

// settings
let postUrl = 'https://lihkg.com/thread/1663223/page/1';
let times = 10;
let delay = 10000;
let username = process.env.USERNAME;
let password = process.env.PASSWORD;
let reply = 'push';

// xpath location
let menu = '/html/body/div[1]/nav/div[1]/div[2]/div[1]/i';
let loginBtn = '/html/body/div[1]/div[1]/div/div[2]/div[1]/a[2]';
let usernameInput = '/html/body/div[2]/div/div[1]/div/form/div[2]/input[1]';
let passwordInput = '/html/body/div[2]/div/div[1]/div/form/div[2]/input[2]';
// let captchaTick = '/html/body/div[2]/div[3]/div[1]/div/div/span/div[1]';
// let captcha = '/html/body/div/div/div[2]';
// let login = '/html/b9ody/div[3]/div/div[2]/a[2]';
let dialog = '/html/body/div[3]/div/div[1]/div/form/div[1]';
let replyBtn = '/html/body/div[1]/nav/div[2]/div[2]/span[2]/i';
let replyInput = '/html/body/div[1]/div[5]/div[2]/div/div[2]/div[2]/div/div';
let submitBtn = '/html/body/div[1]/div[5]/div[2]/div/div[3]/div[2]/a';
let confirmBtn = '/html/body/div[1]/div[5]/div[2]/div[3]/div[3]/div[2]/a[2]';

async function pushPost() {
  // declare webdriver
  let d = await new Builder().forBrowser('firefox').build();

  try {
    await d.get(postUrl);

    async function interact(element, action) {
      await d.wait(until.elementsLocated(By.xpath(element), 10000));
      let act = await d.findElement(By.xpath(element));

      switch (action) {
        case 'click':
          return act.click();
        default:
          return act.sendKeys(action);
      }
    }

    interact(menu, 'click');
    interact(loginBtn, 'click');
    interact(usernameInput, username);
    interact(passwordInput, password);

    // wait for captcha finish
    await d.wait(until.elementsLocated(By.xpath(dialog), 10000));
    await d.wait(
      until.elementIsNotVisible(d.findElement(By.xpath(dialog))),
      100000
    );

    while (i < times) {
      interact(replyBtn, 'click');
      interact(replyInput, reply);
      interact(submitBtn, 'click');
      setTimeout(interact(confirmBtn, 'click'), delay);
      i++;
    }
  } finally {
    d.quit();
  }
}

pushPost();
