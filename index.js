// gold-dz - awal package ta3ek! - by Fares Oran
function getGoldPrice() {
  return {
    date: new Date().toLocaleDateString('fr-DZ'),
    location: "Oran, Algérie",
    gold_18k: "12,500 DA/g",
    gold_21k: "14,200 DA/g",
    gold_24k: "16,800 DA/g",
    message: "Souk Oran - Prix du jour"
  };
}

console.log("=== GOLD DZ - Prix du jour ===");
console.log(getGoldPrice());
console.log("==============================");

module.exports = { getGoldPrice };
