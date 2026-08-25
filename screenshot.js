const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch({ headless: 'new' });
  const page = await browser.newPage();
  await page.setViewport({ width: 1200, height: 800 });
  await page.goto('file:///Users/alaeddinekhadimourabbih/.gemini/antigravity/scratch/sky_bar/index.html', { waitUntil: 'networkidle0' });
  
  const menuElement = await page.$('#menu');
  if (menuElement) {
    await menuElement.screenshot({ path: 'screenshot-menu.png' });
    console.log('Screenshot saved as screenshot-menu.png');
  } else {
    console.log('#menu element not found');
  }
  
  await browser.close();
})();
