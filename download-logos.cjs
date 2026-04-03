const https = require('https');
const http = require('http');
const fs = require('fs');
const path = require('path');
const { URL } = require('url');

const outputDir = path.join(__dirname, 'public', 'logos');
if (!fs.existsSync(outputDir)) fs.mkdirSync(outputDir, { recursive: true });

const domains = [
  'waaree.com', 'adani.com', 'vikramsolar.com', 'renewsys.com',
  'canadiansolar.com', 'jinkosolar.com', 'longi.com', 'risen-energy.com',
  'goldisolar.com', 'sungrowpower.com', 'growatt.com', 'sma.de',
  'fronius.com', 'deltaww.com', 'goodwe.com', 'solaredge.com',
  'huawei.com', 'havells.com', 'deyeinverter.com', 'luminousindia.com',
  'livguard.com', 'exideind.com', 'byd.com', 'dyness.com',
  'pylontech.us', 'loomsolar.com', 'polycab.com', 'keicables.com',
  'staubli.com', 'amphenol.com', 'clenergy.com', 'k2-systems.com',
  'larsentoubro.com', 'se.com', 'abb.com',
];

function fetchUrl(urlStr, redirects = 5) {
  return new Promise((resolve, reject) => {
    if (redirects === 0) return reject(new Error('Too many redirects'));
    let parsed;
    try { parsed = new URL(urlStr); } catch(e) { return reject(e); }
    const lib = parsed.protocol === 'https:' ? https : http;
    const req = lib.get(urlStr, { headers: { 'User-Agent': 'Mozilla/5.0' } }, (res) => {
      if ([301,302,303,307,308].includes(res.statusCode) && res.headers.location) {
        const next = res.headers.location.startsWith('http')
          ? res.headers.location
          : `${parsed.protocol}//${parsed.host}${res.headers.location}`;
        res.destroy();
        return resolve(fetchUrl(next, redirects - 1));
      }
      resolve(res);
    });
    req.on('error', reject);
    req.setTimeout(10000, () => { req.destroy(); reject(new Error('timeout')); });
  });
}

async function downloadDomain(domain) {
  const dest = path.join(outputDir, `${domain}.png`);
  const sources = [
    `https://img.logo.dev/${domain}?token=pk_test_BxixHxShRKGB0SaH9OTMWg`,
    `https://t1.gstatic.com/faviconV2?client=SOCIAL&type=FAVICON&fallback_opts=TYPE,SIZE,URL&url=https://${domain}&size=128`,
  ];

  for (const url of sources) {
    try {
      const res = await fetchUrl(url);
      if (res.statusCode === 200) {
        const ct = res.headers['content-type'] || '';
        if (ct.startsWith('image')) {
          await new Promise((resolve, reject) => {
            const file = fs.createWriteStream(dest);
            res.pipe(file);
            file.on('finish', () => { file.close(); resolve(); });
            file.on('error', reject);
          });
          const size = fs.statSync(dest).size;
          if (size > 500) { console.log(`✓ ${domain}`); return; }
          fs.unlinkSync(dest);
        } else { res.destroy(); }
      } else { res.destroy(); }
    } catch (_) { /* try next */ }
  }
  console.log(`✗ ${domain}`);
}

(async () => {
  console.log('Downloading logos to public/logos/...\n');
  for (const domain of domains) await downloadDomain(domain);
  console.log('\nDone!');
})();
