const puppeteer = require("puppeteer-extra");
const StealthPlugin = require("puppeteer-extra-plugin-stealth");
const {executablePath} = require('puppeteer');
var os = require('os');

const generatePagePicture = () => new Promise (async (resolve, reject) => {
    puppeteer.use(StealthPlugin());

    var localPath = null;
    console.log(os.type())

    if (os.type() == 'Windows_NT') {
        localPath = "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe";
    } else if (os.type() == 'Linux') {
        localPath = "/usr/bin/google-chrome"
    }

    /**
     * executablePath: chrome base path, you can see on your installation directory for chrome app
     */
    const browser = await puppeteer.launch({
        headless: 'new',
        args: ["--no-sandbox", "--disable-setuid-sandbox", "--start-maximized"],
        // executablePath: executablePath(),
        executablePath: localPath
    });

    var url = 'https://adobe.com';
    const page = await browser.newPage();
    await page.setUserAgent("Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/44.0.2403.157 Safari/537.36");

    await page.setViewport({
        width: 1920,
        height: 1080,
        deviceScaleFactor: 1,
    });

    await page.setDefaultNavigationTimeout(90000);
    await page.goto(url, { waitUntil: 'networkidle0' });

    await page.waitForTimeout(5000);
    await page.screenshot({
        path: 'screenshot.jpg'
    })

    await browser.close();

    resolve('success')
});

(async () => {
    await generatePagePicture()
})()