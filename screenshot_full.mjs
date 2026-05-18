import puppeteer from 'puppeteer-core';
import path from 'path';

const CHROME = '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';
const PUBLIC = "/Users/ankushpatil/Downloads/Project's/portfolio-main/public";

const sites = [
  {
    url: 'https://quick-blog-vedant-patil.vercel.app/',
    output: `${PUBLIC}/quickblog-full.png`,
    name: 'QuickBlog'
  },
  {
    url: 'https://green-cart-client-ten.vercel.app/',
    output: `${PUBLIC}/greencart-full.png`,
    name: 'GreenCart'
  }
];

const browser = await puppeteer.launch({
  executablePath: CHROME,
  headless: true,
  args: ['--no-sandbox', '--disable-setuid-sandbox']
});

const page = await browser.newPage();
await page.setViewport({ width: 1280, height: 800 });

for (const site of sites) {
  console.log(`📸 Capturing FULL PAGE for ${site.name} from ${site.url}...`);
  await page.goto(site.url, { waitUntil: 'networkidle2', timeout: 60000 });
  
  // Scroll to bottom to trigger lazy loading
  await page.evaluate(async () => {
    await new Promise((resolve) => {
      let totalHeight = 0;
      let distance = 100;
      let timer = setInterval(() => {
        let scrollHeight = document.body.scrollHeight;
        window.scrollBy(0, distance);
        totalHeight += distance;
        if (totalHeight >= scrollHeight) {
          clearInterval(timer);
          resolve();
        }
      }, 100);
    });
  });

  await new Promise(r => setTimeout(r, 2000));
  await page.screenshot({ path: site.output, fullPage: true });
  console.log(`✅ Saved: ${site.output}`);
}

await browser.close();
console.log('🎉 Done!');
