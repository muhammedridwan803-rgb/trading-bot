/**
 * Minimal launcher: loads server/.env then starts telegramService.
 */
const fs = require('fs');
const path = require('path');

function loadEnvFile(envPath){
  if(!fs.existsSync(envPath)) return;
  const raw = fs.readFileSync(envPath,'utf8');
  raw.split(/\\r?\\n/).forEach(line=>{
    line = line.trim();
    if(!line || line.startsWith('#')) return;
    const i = line.indexOf('=');
    if(i === -1) return;
    const key = line.slice(0,i).trim();
    let val = line.slice(i+1).trim();
    if((val.startsWith('"') && val.endsWith('"')) || (val.startsWith("'") && val.endsWith("'"))) val = val.slice(1,-1);
    if(typeof process.env[key] === 'undefined') process.env[key] = val;
  });
  console.log('[BOT_LAUNCHER] loaded env from', envPath);
}

loadEnvFile(path.resolve(__dirname, '../server/.env'));

(async ()=>{
  try{
    const tg = require('./telegramService');
    await tg.startBot();
    console.log('[BOT_LAUNCHER] ready');
  }catch(e){
    console.error('[BOT_LAUNCHER] start error', e && e.message ? e.message : e);
    process.exit(1);
  }
})();
