// Change the setting below
const times = 100; // push counts
const comment = "push"; // the content for the reply

const fixedInterval = false; // if false, delay between push will be random
const minRandomDelayInMins = 15; // only work when fixedInterval is FALSE
const maxRandomDelayInMins = 30; // only work when fixedInterval is FALSE
const fixedDelayInMins = 30; // only work when fixedInterval is TRUE

function getElementByXpath(path) {
  return document.evaluate(
    path,
    document,
    null,
    XPathResult.FIRST_ORDERED_NODE_TYPE,
    null
  ).singleNodeValue;
}
function autoPush() {
  console.log("Pushing!");
  getElementByXpath("/html/body/div/nav/div[2]/div[2]/span[2]").click();
  getElementByXpath(
    "/html/body/div/div[5]/div[2]/div/div[2]/div[2]/div/div"
  ).innerText = comment;

  setTimeout(() => {
    getElementByXpath(
      "/html/body/div/div[5]/div[2]/div/div[3]/div[2]/a"
    ).click();
    getElementByXpath(
      "/html/body/div/div[5]/div[2]/div[3]/div[3]/div[2]/a[2]"
    ).click();
  }, 1000);
}

(function myLoop(i) {
  let randomDelayInMs =
    Math.ceil(
      Math.random() * (maxRandomDelayInMins - minRandomDelayInMins) +
        minRandomDelayInMins
    ) * 60000;
  let delay = fixedInterval ? fixedDelayInMins * 60000 : randomDelayInMs;
  console.log("Iteration: " + i);
  console.log("Delay in milliseconds: " + delay);
  console.log("Delay in minutes: " + delay / 60000);
  setTimeout(() => {
    autoPush();
    if (--i) myLoop(i);
  }, delay);
})(times);
