const puppeteer = require('puppeteer');
const fs = require('fs');

(async () => {
  if (!fs.existsSync('public/screenshots')){
      fs.mkdirSync('public/screenshots', { recursive: true });
  }

  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.setViewport({ width: 1280, height: 800 });

  console.log('Taking screenshot of Home Page...');
  await page.goto('https://online-cafe-phi.vercel.app/', { waitUntil: 'networkidle2' });
  await new Promise(r => setTimeout(r, 2000));
  await page.screenshot({ path: 'public/screenshots/home.png' });

  console.log('Taking screenshot of AI Chat...');
  await page.goto('https://online-cafe-phi.vercel.app/ai-assistant', { waitUntil: 'networkidle2' });
  await new Promise(r => setTimeout(r, 2000));
  await page.screenshot({ path: 'public/screenshots/ai_chat.png' });

  console.log('Taking screenshot of Admin...');
  await page.goto('https://online-cafe-phi.vercel.app/admin', { waitUntil: 'networkidle2' });
  await new Promise(r => setTimeout(r, 2000));
  await page.screenshot({ path: 'public/screenshots/admin.png' });

  await browser.close();
  console.log('All screenshots taken!');
})();
