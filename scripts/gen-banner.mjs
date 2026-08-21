import { execFileSync, execSync } from 'node:child_process';
import { mkdirSync, writeFileSync, rmSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const TMP = path.join(ROOT, 'scripts', '.tmp-banner');
const OUT = path.join(ROOT, 'public', 'recursos', 'imagenes');
mkdirSync(TMP, { recursive: true });
mkdirSync(OUT, { recursive: true });

const CHROME = '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';
const LOGO_URL = 'file://' + path.join(OUT, 'logoTPC-dark.png');

const bannerPage = () => `<!doctype html>
<html lang="es"><head><meta charset="utf-8">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Gelasio:wght@500;600;700&family=Karla:wght@400;500;600;700&family=Caveat:wght@500;600&display=swap" rel="stylesheet">
<style>
  * { margin:0; padding:0; box-sizing:border-box; }
  html, body { width:1200px; height:630px; overflow:hidden; background:transparent; }
  .canvas { position:relative; width:1200px; height:630px; overflow:hidden; background:transparent; }
  .bg-base { position:absolute; inset:0; background:linear-gradient(135deg,#ffffff 0%,#eef4fb 100%); }
  .diag-top { position:absolute; top:-160px; right:-160px; width:620px; height:620px; background:linear-gradient(135deg, rgba(0,163,255,0.10) 0%, rgba(56,189,248,0.02) 100%); transform:rotate(20deg); border-radius:80px; }
  .diag-stripe { position:absolute; top:416px; right:-265px; width:1100px; height:107px; background:linear-gradient(90deg,#00a3ff,#38bdf8); transform:rotate(-25deg); border-radius:50px; opacity:0.12; }
  .diag-bottom { position:absolute; bottom:-80px; left:-80px; width:260px; height:260px; background:#0f172a; transform:rotate(15deg); border-radius:60px; opacity:0.92; }
  .glow-spot { position:absolute; top:120px; left:60px; width:360px; height:360px; background:rgba(0,163,255,0.30); filter:blur(110px); border-radius:50%; }
  .content { position:absolute; inset:0; display:flex; flex-direction:column; align-items:center; justify-content:center; text-align:center; gap:16px; padding:0 100px; }
  .content { width:640px; left:50%; transform:translateX(-50%); right:auto; }
  .logo { width:250px; object-fit:contain; }
  .title { font-family:'Gelasio', Georgia, serif; font-size:46px; font-weight:700; line-height:1.15; color:#0f172a; letter-spacing:-0.02em; }
  .title .hl { color:#00a3ff; position:relative; white-space:nowrap; }
  .title .hl::after { content:""; position:absolute; left:0; right:-6px; bottom:-8px; height:14px; background-image:url("data:image/svg+xml;utf8,%3Csvg%20xmlns='http://www.w3.org/2000/svg'%20viewBox='0%200%20220%2014'%3E%3Cpath%20d='M3%209%20C%2040%203,%2070%2012,%20108%208%20C%20146%204,%20180%2011,%20217%206'%20fill='none'%20stroke='%2300a3ff'%20stroke-width='4'%20stroke-linecap='round'/%3E%3C/svg%3E"); background-repeat:no-repeat; background-size:100% 100%; background-position:bottom; opacity:0.85; }
  .tag { font-family:'Karla', sans-serif; font-size:21px; color:#475569; max-width:520px; line-height:1.55; font-weight:500; }
  .sign { font-family:'Caveat', cursive; font-size:24px; color:#00a3ff; }
</style>
</head><body>
<div class="canvas">
  <div class="bg-base"></div>
  <div class="diag-top"></div>
  <div class="diag-stripe"></div>
  <div class="diag-bottom"></div>
  <div class="glow-spot"></div>
  <div class="content">
    <img class="logo" src="${LOGO_URL}" alt="">
    <h1 class="title">Sitios web limpios, rápidos y<BR>enfocados en <span class="hl">vender más</span></h1>
    <p class="tag">One Page Web, catálogos con pedido por WhatsApp, sitios corporativos y mantenimiento web para pymes en Chile.</p>
    <div class="sign">Tu Pyme Conectada</div>
  </div>
</div>
</body></html>`;

function shot(file, w, h, out) {
  execFileSync(CHROME, [
    '--headless', '--disable-gpu', '--hide-scrollbars',
    '--force-device-scale-factor=1',
    '--window-size=' + w + ',' + h,
    '--screenshot=' + out,
    '--virtual-time-budget=12000',
    'file://' + file,
  ], { stdio: 'ignore' });
}

// 1) Banner 1200x630
const bannerHtml = path.join(TMP, 'banner.html');
writeFileSync(bannerHtml, bannerPage());
shot(bannerHtml, 1200, 630, path.join(OUT, 'bannerFacebook-v2.png'));

rmSync(TMP, { recursive: true, force: true });
console.log('OK: banner generado en', OUT);