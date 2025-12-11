/**
 * Minimal adminService used by the bot.
 * Keep this file in server/src/services so require('../server/src/services/adminService') resolves.
 */
let settings = {
  admins: ["6491714705"],   // put your telegram ID here
  sendToGroup: true,
  sendToAdminDM: false,
  riskSettings: { defaultRR: 1.5, maxSignalsPerDay: 5 },
  forexEnabled: true,
  futuresEnabled: true
};

function getSettings() { return settings; }
function isAdmin(id) { return settings.admins.includes(String(id)); }
function getAdmins(){ return settings.admins; }
module.exports = { getSettings, isAdmin, getAdmins, save: () => {}, reload: () => {}, setSetting: () => {}, addAdmin: () => {}, removeAdmin: () => {} };
