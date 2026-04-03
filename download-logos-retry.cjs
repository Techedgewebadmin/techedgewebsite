const https = require('https');
const http = require('http');
const fs = require('fs');
const path = require('path');
const { URL } = require('url');

const outputDir = path.join(__dirname, 'public', 'logos');

// Failed ones with alternative domains to try
const retries = [
  { save: 'vikramsolar.com', try: ['vikramsolar.in', 'vikramsolar.com'] },
  { save: 'renewsys.com',    try: ['renewsys.in', 'renewsys.com'] },
  { save: 'canadiansolar.com', try: ['canadiansolar.com', 'csisolar.com'] },
  { save: 'longi.com',       try: ['longi-solar.com', 'longi.com', 'longi.cn'] },
  { save: 'growatt.com',     try: ['growatt.com', 'ginverter.com'] },
  { save: 'solaredge.com',   try: ['solaredge.com', 'solaredgetechnologies.com'] },
  { save: 'luminousindia.com', try: ['luminous.in', 'luminousindia.com'] },
  { save: 'exideind.com',    try: ['exide.co.in', 'exideindustries.com', 'exideind.com'] },
  { save: 'pylontech.us',    try: ['pylontech.com.cn', 'pylon-battery.com', 'pylontech.us'] },
  { save: 'keicables.com',   try: ['kei-ind.com', 'keicables.in', 'keicables.com'] },
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

async function tryDownload(saveName, altDomains) {
  const dest = path.join(outputDir, `${saveName}.png`);

  for (const domain of altDomains) {
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
            if (size > 500) { console.log(`✓ ${saveName} (via ${domain})`); return; }
            fs.unlinkSync(dest);
          } else { res.destroy(); }
        } else { res.destroy(); }
      } catch (_) {}
    }
  }
  console.log(`✗ ${saveName} — add manually`);
}

(async () => {
  console.log('Retrying failed logos...\n');
  for (const { save, try: domains } of retries) await tryDownload(save, domains);
  console.log('\nDone!');
})();
