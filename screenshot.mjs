import puppeteer from 'puppeteer-core';

const CHROME = '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';
const PUBLIC = "/Users/ankushpatil/Downloads/Project's/portfolio-main/public";

const sites = [
  {
    url: 'https://quick-blog-vedant-patil.vercel.app/',
    output: `${PUBLIC}/quickblog.png`,
    name: 'QuickBlog'
  },
  {
    url: 'https://green-cart-client-ten.vercel.app/',
    output: `${PUBLIC}/greencart-ecommerce.png`,
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
  console.log(`📸 Capturing ${site.name} from ${site.url}...`);
  await page.goto(site.url, { waitUntil: 'networkidle2', timeout: 30000 });
  await new Promise(r => setTimeout(r, 2000));
  await page.screenshot({ path: site.output, fullPage: false });
  console.log(`✅ Saved: ${site.output}`);
}

await browser.close();
console.log('🎉 Done!');
