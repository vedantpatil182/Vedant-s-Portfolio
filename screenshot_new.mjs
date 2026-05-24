import puppeteer from 'puppeteer-core';
import path from 'path';

const CHROME = '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';
const PUBLIC = "/Users/ankushpatil/Downloads/Project's/portfolio-main/public";

const sites = [
  {
    url: 'https://aura-models1-8.vercel.app',
    output: `${PUBLIC}/auramodels-full.png`,
    name: 'AuraModels'
  },
  {
    url: 'https://coffee-co-nine.vercel.app',
    output: `${PUBLIC}/koppee-full.png`,
    name: 'KOPPEE'
  },
  {
    url: 'https://architecture-design-portfolio.vercel.app',
    output: `${PUBLIC}/archi-full.png`,
    name: 'Archi'
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
  try {
    await page.goto(site.url, { waitUntil: 'networkidle2', timeout: 60000 });
    
    // Scroll to bottom to trigger lazy loading and custom script triggers
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

    await new Promise(r => setTimeout(r, 3000));
    await page.screenshot({ path: site.output, fullPage: true });
    console.log(`✅ Saved: ${site.output}`);
  } catch (error) {
    console.error(`❌ Failed to capture ${site.name}:`, error);
  }
}

await browser.close();
console.log('🎉 Done capturing screenshots!');
