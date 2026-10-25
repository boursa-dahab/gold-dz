// gold-dz v1.1.0 - Prix réel Ga3 Dzayer - by Fares Oran
// Stratégie: Investing Onca + Dollar Square 255 + base prix hors masna3iya

async function getGoldPriceLive() {
  try {
    // 1. Jib prix Onca men API gratuit
    const response = await fetch('https://api.gold-api.com/price/XAU');
    if (!response.ok) throw new Error('API failed');
    const data = await response.json();
    const ounceUSD = data.price; // Ex: 2700$

    // 2. Dollar Square - Souk parallèle Dzayer
    const dollarDZ = 255; // T9ad tbadlou hna

    // 3. 7seb prix gram base (24k = 99.9% pur)
    const gram24k = (ounceUSD / 31.1035) * dollarDZ;
    const gram21k = gram24k * 0.875; // 21/24 = 87.5%
    const gram18k = gram24k * 0.75;  // 18/24 = 75%

    return {
      date: new Date().toLocaleDateString('fr-DZ'),
      time: new Date().toLocaleTimeString('fr-DZ'),
      location: 'Algérie - Ga3 Dzayer',
      source: `Onca: $${Math.round(ounceUSD)} | Dollar: ${dollarDZ} DA`,
      gold_18k: `${Math.round(gram18k).toLocaleString('fr-DZ')} DA/g`,
      gold_21k: `${Math.round(gram21k).toLocaleString('fr-DZ')} DA/g`,
      gold_24k: `${Math.round(gram24k).toLocaleString('fr-DZ')} DA/g`,
      details: {
        ounce_usd: Math.round(ounceUSD),
        dollar_dzd: dollarDZ,
        gram_24k_raw: Math.round(gram24k),
        purity: { '18k': '75%', '21k': '87.5%', '24k': '99.9%' }
      },
      message: 'Prix base hors masna3iya - Ga3 Dzayer',
      masna3iya_note: 'Bijoutiers yzido masna3iya (2000-4000 DA/g)'
    };
  } catch (error) {
    // Fallback si API ma khdamch - prix Oran
    return {
      date: new Date().toLocaleDateString('fr-DZ'),
      location: 'Oran, Algérie - Fallback',
      gold_18k: '12,500 DA/g (fallback)',
      gold_21k: '14,200 DA/g (fallback)',
      gold_24k: '16,800 DA/g (fallback)',
      error: 'API indisponible, prix fallback',
      message: 'Souk Oran - Prix du jour'
    };
  }
}

// Version synchrone pour compatibilité (prix Oran)
function getGoldPrice() {
  return {
    date: new Date().toLocaleDateString('fr-DZ'),
    location: 'Oran, Algérie',
    gold_18k: '12,500 DA/g',
    gold_21k: '14,200 DA/g',
    gold_24k: '16,800 DA/g',
    message: 'Souk Oran - Prix du jour (utilise getGoldPriceLive() pour prix réel)'
  };
}

// Pour Node < 18 qui n'a pas fetch natif
if (typeof fetch === 'undefined') {
  try {
    global.fetch = require('node-fetch');
  } catch {}
}

console.log("=== GOLD DZ v1.1.0 - Prix Ga3 Dzayer ===");
getGoldPriceLive().then(price => {
  console.log(price);
  console.log("=======================================");
});

module.exports = { getGoldPrice, getGoldPriceLive };
