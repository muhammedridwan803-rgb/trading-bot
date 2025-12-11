const { Telegraf } = require('telegraf');

let adminService = null;
try { adminService = require('../server/src/services/adminService'); } catch(e){ console.warn('adminService missing', e && e.message); }
let aiService = null;
try { aiService = require('../server/src/services/aiService'); } catch(e){ console.warn('aiService missing', e && e.message); }

const token = process.env.TELEGRAM_BOT_TOKEN || null;
let bot = null;

function shortTok(t){ if(!t) return '(none)'; return t.slice(0,6)+'...'+t.slice(-4); }

async function startBot(){
  console.log('[telegramService] startBot: TELEGRAM_BOT_TOKEN =', shortTok(token));
  if(!token){ console.warn('[telegramService] token not set — bot will not start.'); return; }
  bot = new Telegraf(token);

  bot.start(ctx => ctx.reply('Hello — bot started.'));
  bot.command('ping', ctx => ctx.reply('pong'));
  bot.command('admindashboard', ctx => {
    if(!adminService) return ctx.reply('Admin service not available.');
    const s = adminService.getSettings();
    ctx.reply('Admin dashboard (JSON):\n' + JSON.stringify(s, null, 2));
  });

  await bot.launch().catch(e => console.error('[telegramService] bot.launch ERR', e && e.message ? e.message : e));
  console.log('[telegramService] Telegram bot started.');
  process.once('SIGINT', () => bot.stop('SIGINT'));
  process.once('SIGTERM', () => bot.stop('SIGTERM'));
}

async function postSignalToChat(signal, chatId){
  if(!token) throw new Error('No TELEGRAM_BOT_TOKEN set');
  if(!bot) await startBot();
  const text = `Signal: ${signal.symbol} ${signal.direction}\\nEntry: ${signal.entry}\\nSL: ${signal.stopLoss}`;
  return bot.telegram.sendMessage(chatId, text);
}

module.exports = { startBot, postSignalToChat };
