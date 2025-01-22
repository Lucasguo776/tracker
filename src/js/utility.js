
// gets KDA
function KDAcalculator(kills, deaths, assists) {
  if (deaths === 0) {
    deaths = 1;
  }
  return Math.round((kills + assists) / deaths * 100) / 100;
}
  
// Utility function for win rate
function winRate(wins, losses) {
if (losses === 0) return 100;
  return Math.round((100 * wins) / (wins + losses));
}
  
export { KDAcalculator, winRate };