
import { 
  fetchDdragonVersion, 
  fetchAccountData, 
  fetchSummonerData, 
  fetchRankedData, 
  fetchMatchListData, 
  fetchMatchHistoryData 
} from './load.js';

import { 
  processRankedData, 
  processRecentStats 
} from './load.js';

import { 
  clearSummonerInfo, 
  updateSummonerInfo, 
  updateRankedStats, 
  updateRecentOverallStats, 
  updateRecentChampionStats, 
  updateRecentMatchData 
} from './update.js';


var puuid = "";
var summonerId = "";

document.addEventListener("keydown", function(event) {
  if (event.key === 'Enter') {
      searchSummoner();
  }
});

// Main function
async function searchSummoner() {
  clearSummonerInfo();
  const gameName = document.getElementById("gameName").value;
  const tagLine = document.getElementById("tagLine").value;
  const regionId = document.getElementById("regionSelect").value;

  try {
    // Fetch data  
    const accountData = await fetchAccountData(gameName, tagLine, regionId);
    puuid = accountData.puuid;
    
    const summonerData = await fetchSummonerData(puuid);
    summonerId = summonerData.id;
    
    const rankedData = await fetchRankedData(summonerId);
    const recentMatchListData = await fetchMatchListData(puuid);
    const recentMatchData = await fetchMatchHistoryData(recentMatchListData);
    
    // Process data
    const { rankFlex, rankSolo } = processRankedData(rankedData);
    const recentStats = processRecentStats(recentMatchData);

    // Update UI
    updateSummonerInfo(gameName, tagLine, summonerData);
    updateRankedStats(rankFlex, rankSolo);
    updateRecentOverallStats(recentStats);
    updateRecentChampionStats(recentStats);
    updateRecentMatchData(recentStats);

    console.log(puuid);
    console.log(rankFlex);
    console.log(rankSolo);
    console.log(recentMatchData);
    console.log(recentStats);
  } catch (error) {
    console.error("Error fetching or processing data:", error);
  }
}

export { searchSummoner, puuid };