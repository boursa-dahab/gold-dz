// gold-dz v1.2.0 - Simple - Tarikh lyom + 3 kara - by Fares Oran
// Stratégie: Onca + Dollar 255 = 18k/21k/24k - Ga3 Dzayer

async function getGoldPriceLive() {
  try {
    const response = await fetch('https://api.gold-api.com/price/XAU');
    if (!response.ok) throw new Error('API failed');
    const data = await response.json();
    const ounceUSD = data.price;

    const dollarDZ = 255;
    const gram24k = (ounceUSD / 31.1035) * dollarDZ;
    const gram21k = gram24k * 0.875;
    const gram18k = gram24k * 0.75;

    // Simple: tarikh lyom + 3 kara bark - kima Fares y7eb
    return {
      date: new Date().toLocaleDateString('fr-DZ'),
      gold_18k: `${Math.round(gram18k).toLocaleString('fr-DZ')} DA/g`,
      gold_21k: `${Math.round(gram21k).toLocaleString('fr-DZ')} DA/g`,
      gold_24k: `${Math.round(gram24k).toLocaleString('fr-DZ')} DA/g`
    };
  } catch (error) {
    // Fallback simple
    return {
      date: new Date().toLocaleDateString('fr-DZ'),
      gold_18k: '24,576 DA/g',
      gold_21k: '28,672 DA/g',
      gold_24k: '32,768 DA/g'
    };
  }
}

// Version avec details pour li y7eb (optionnel)
async function getGoldPriceDetails() {
  try {
    const response = await fetch('https://api.gold-api.com/price/XAU');
    const data = await response.json();
    const ounceUSD = data.price;
    const dollarDZ = 255;
    const gram24k = (ounceUSD / 31.1035) * dollarDZ;

    return {
      date: new Date().toLocaleDateString('fr-DZ'),
      time: new Date().toLocaleTimeString('fr-DZ'),
      location: 'Algérie - Ga3 Dzayer',
      source: `Onca: $${Math.round(ounceUSD)} | Dollar: ${dollarDZ} DA`,
      gold_18k: `${Math.round(gram24k * 0.75).toLocaleString('fr-DZ')} DA/g`,
      gold_21k: `${Math.round(gram24k * 0.875).toLocaleString('fr-DZ')} DA/g`,
      gold_24k: `${Math.round(gram24k).toLocaleString('fr-DZ')} DA/g`,
      message: 'Prix base hors masna3iya'
    };
  } catch {
    return await getGoldPriceLive();
  }
}

// Ancienne fonction pour compatibilité
function getGoldPrice() {
  return {
    date: new Date().toLocaleDateString('fr-DZ'),
    gold_18k: '24,576 DA/g',
    gold_21k: '28,672 DA/g',
    gold_24k: '32,768 DA/g'
  };
}

if (typeof fetch === 'undefined') {
  try { global.fetch = require('node-fetch'); } catch {}
}

console.log("=== GOLD DZ v1.2.0 - Simple ===");
getGoldPriceLive().then(price => {
  console.log(price);
  console.log("=== Tarikh lyom + 3 kara ===");
});

module.exports = { getGoldPrice, getGoldPriceLive, getGoldPriceDetails };
