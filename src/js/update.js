import { tiers, summonerSpells, runePaths, runes, queueData } from "./data.js";
import { winRate, KDAcalculator } from "./utility.js"
import { fetchDdragonVersion } from "./load.js";

const ddragonURL = "https://ddragon.leagueoflegends.com/cdn";
var ddragonVersionHistory = await fetchDdragonVersion();
const ddragonURLwithVersion = `${ddragonURL}/` + ddragonVersionHistory[0];


// clears all html info
function clearSummonerInfo() {
  document.getElementById("summonerName").innerHTML = "";
  document.getElementById("summonerLevel").innerHTML = "";
  document.getElementById("summonerProfileIcon").src = "";
  document.getElementById("rankFlex").innerHTML = "";
  document.getElementById("rankFlexWinRate").innerHTML = "";
  document.getElementById("rankSolo").innerHTML = "";
  document.getElementById("rankSoloWinRate").innerHTML = "";
  document.getElementById("matchData").innerHTML = "";
  document.getElementById("recentOverallStatsWinRate").innerHTML = "";
  document.getElementById("recentOverallStatsKDA").innerHTML = "";
  document.getElementById("recentOverallStatsKillParticipation").innerHTML = "";
  document.getElementById("recentOverallStatsCSGoldDmgVS").innerHTML = "";
  document.getElementById("recentOverallStatsTeamPosition").innerHTML = "";
}

// displays name and profile picture
function updateSummonerInfo(gameName, tagLine, summonerData) {
  document.getElementById("summonerName").innerHTML = `${gameName}#${tagLine}`;
  document.getElementById("summonerLevel").innerHTML = `Level: ${summonerData.summonerLevel}`;
  const profileIconUrl = `${ddragonURLwithVersion}/img/profileicon/${summonerData.profileIconId}.png`;
  document.getElementById("summonerProfileIcon").src = profileIconUrl;
}

// displays ranked stats dasboard
function updateRankedStats(rankFlex, rankSolo) {
  document.getElementById("rankedStatsHeading").innerHTML = "Ranked Stats";
  document.getElementById("rankedFlexHeading").innerHTML = "Ranked Flex";
  if (rankFlex.tier != tiers.UNRANKED) {
    document.getElementById("rankFlex").innerHTML = rankFlex.tier + " " + rankFlex.rank + " " + rankFlex.leaguePoints + "LP<br>";
    document.getElementById("rankFlexWinRate").innerHTML = rankFlex.wins + "W " + rankFlex.losses + "L " + "Win Rate: " + rankFlex.winRate + "%";
  } else {
    document.getElementById("rankFlex").innerHTML = rankFlex.tier;
  }
  document.getElementById("rankedSoloHeading").innerHTML = "Ranked Solo";
  if (rankSolo.tier != tiers.UNRANKED) {
    document.getElementById("rankSolo").innerHTML = rankSolo.tier + " " + rankSolo.rank + " " + rankSolo.leaguePoints + "LP<br>";
    document.getElementById("rankSoloWinRate").innerHTML = rankSolo.wins + "W " + rankSolo.losses + "L " + "Win Rate: " + rankSolo.winRate + "%";
  } else {
    document.getElementById("rankSolo").innerHTML = rankSolo.tier;
  }
}

// displays recentoverallstats dashboard
function updateRecentOverallStats(recentStats) {
  const stats = recentStats.recentOverallStats;
  const gamesPlayed = stats.wins + stats.losses;
  document.getElementById("recentStatsHeading").innerHTML = "Recent Stats";
  document.getElementById("recentOverallStatsWinRate").innerHTML = stats.gamesPlayed + "G " + stats.wins + "W " + stats.losses + "L " + "Win Rate: " + winRate(stats.wins, stats.losses) + "%";
  document.getElementById("recentOverallStatsKDA").innerHTML = Math.round(stats.kills / gamesPlayed * 10) / 10 
                                                              + " / " + Math.round(stats.deaths / gamesPlayed * 10) / 10 
                                                              + " / " + Math.round(stats.assists / gamesPlayed * 10) / 10 
                                                              + " " + Math.round((stats.kills + stats.assists) / stats.deaths * 100)/100 + "KDA";
  document.getElementById("recentOverallStatsKillParticipation").innerHTML = Math.round(stats.killParticipation * 100) + "% Kill Participation";
  document.getElementById("recentOverallStatsCSGoldDmgVS").innerHTML = Math.round((stats.creepScore / stats.minutesPlayed) * 10) / 10 + " CS/min " 
                                                                        + Math.round(stats.gold / stats.minutesPlayed) + " Gold/min "
                                                                        + Math.round(stats.damage / stats.minutesPlayed) + " Damage/min "
                                                                        + stats.visionScore + " Vision Score ";
  document.getElementById("recentOverallStatsTeamPosition").innerHTML = "TOP: " + stats.rolesPlayed.topLane 
                                                                      + " JUNGLE: " + stats.rolesPlayed.jungle 
                                                                      + " MID: " + stats.rolesPlayed.midLane 
                                                                      + " SUPPORT: " + stats.rolesPlayed.support 
                                                                      + " BOTTOM: " + stats.rolesPlayed.botLane;
  
}

// displays recent champion stats
function updateRecentChampionStats(recentStats) {
  // const stats = recentStats.recentChampionStats;
  // const arrayDisplay = stats.map(obj => {
  //   return Object.entries(obj).map(([key, value]) => `${key}: ${value}`).join(', ');
  // }).join('<br>');
  // document.getElementById("recentChampionStats").innerHTML = arrayDisplay;
  const stats = recentStats.recentChampionStats;

  const generateTable = (stats) => {
    let tableHTML = `
      <table border="1" style="border-collapse: collapse; width: 100%; text-align: center;">
        <thead>
          <tr>
            <th>Champion</th>
            <th>Total Games</th>
            <th>Wins</th>
            <th>Losses</th>
            <th>Win Rate</th>
            <th>Average KDA</th>
            <th>CS per Minute</th>
          </tr>
        </thead>
        <tbody>
    `;

    stats.forEach((champion) => {
      const totalGames = champion.championWins + champion.championLosses;
      const winRate = ((champion.championWins / totalGames) * 100).toFixed(2);
      const averageKDA = (
        (champion.championKills + champion.championAssists) /
        Math.max(1, champion.championDeaths)
      ).toFixed(2);
      const csPerMinute = (
        champion.championCreepScore /
        champion.championMinutesPlayed
      ).toFixed(2);

      tableHTML += `
        <tr>
          <td>${champion.championName}</td>
          <td>${totalGames}</td>
          <td>${champion.championWins}</td>
          <td>${champion.championLosses}</td>
          <td>${winRate}%</td>
          <td>${averageKDA}</td>
          <td>${csPerMinute}</td>
        </tr>
      `;
    });

    tableHTML += `
        </tbody>
      </table>
    `;
    return tableHTML;
  };

  // Render the table in the HTML
  document.getElementById("recentChampionStats").innerHTML = generateTable(stats);
}

// displays all match stats
function updateRecentMatchData(recentStats) {
  let tableHTML = `
    <table border="1" style="border-collapse: collapse; width: 100%; text-align: center;">
      <tbody>
  `;
  for (const match of recentStats.recentMatchData) {
    const queueMap = new Map(queueData.map(q => [q.queueId, q.description]));
    const queueType = queueMap.get(match.queueId);

    let mins = Math.floor(match.minutesPlayed);
    let secs = Math.round((match.minutesPlayed - mins) * 60);
    let date = new Date(match.gameEndTimestamp);

    const summonerSpellMap = new Map(summonerSpells.map(q => [q.id, q.name]));
    const summonerSpell1 = summonerSpellMap.get(match.summoner1Id);
    const summonerSpell2 = summonerSpellMap.get(match.summoner2Id);
    
    const runePathsMapName = new Map(runePaths.map(q => [q.id, q.name]));
    const runePathPrimaryName = runePathsMapName.get(match.runePathPrimary);

    const runePathsMapCode = new Map(runePaths.map(q => [q.id, q.code]));
    const runePathsSecondaryCode = runePathsMapCode.get(match.runePathSecondary);

    const runesMapURL = new Map(runes.map(q => [q.id, q.iconURL]));
    const runeKeystoneURL = runesMapURL.get(match.runeKeystone);

    const KDA = KDAcalculator(match.kills, match.deaths, match.assists);
    const killParticipation = Math.round(match.killParticipation * 100);
    const csPerMinute = Math.round(match.creepScore / match.minutesPlayed * 10) / 10;
    tableHTML += `
      <tr>
        <td>${match.gameResult} ${mins}m ${secs}s<br><br>${queueType}<br>${date.toLocaleString()}</td>
        <td>
          <img class="championIconMain" src="${ddragonURLwithVersion}/img/champion/${match.championName}.png"><br>
          ${match.champLevel}
        </td>
        <td class="summonerSpellIcon">
          <img src="${ddragonURLwithVersion}/img/spell/${summonerSpell1}.png">
          <img src="${ddragonURL}/img/perk-images/Styles/${runePathPrimaryName}/${runeKeystoneURL}.png">
          <br>
          <img src="${ddragonURLwithVersion}/img/spell/${summonerSpell2}.png">
          <img src="${ddragonURL}/img/perk-images/Styles/${runePathsSecondaryCode}.png">
        </td>
        <td class="summonerSpellIcon">
          <img src="${ddragonURLwithVersion}/img/item/${match.itemIds[0]}.png">
          <img src="${ddragonURLwithVersion}/img/item/${match.itemIds[1]}.png">
          <img src="${ddragonURLwithVersion}/img/item/${match.itemIds[2]}.png">
          <img src="${ddragonURLwithVersion}/img/item/${match.itemIds[3]}.png">
          <br>
          <img src="${ddragonURLwithVersion}/img/item/${match.itemIds[4]}.png">
          <img src="${ddragonURLwithVersion}/img/item/${match.itemIds[5]}.png">
          <img src="${ddragonURLwithVersion}/img/item/${match.itemIds[6]}.png">
        </td>
        <td>
          ${match.kills} / ${match.deaths} / ${match.assists}
          <br>
          ${KDA} KDA (${killParticipation}%)
          <br>
          ${match.creepScore} CS (${csPerMinute})
          <br>
          ${match.visionScore} Vision
        </td>
        <td class="championIconSmall">
          <img src="${ddragonURLwithVersion}/img/champion/${match.participants[0].championName}.png">
          ${match.participants[0].gameName}
          <img src="${ddragonURLwithVersion}/img/champion/${match.participants[5].championName}.png">
          ${match.participants[5].gameName}
          <br>
          <img src="${ddragonURLwithVersion}/img/champion/${match.participants[1].championName}.png">
          ${match.participants[1].gameName}
          <img src="${ddragonURLwithVersion}/img/champion/${match.participants[6].championName}.png">
          ${match.participants[6].gameName}
          <br>
          <img src="${ddragonURLwithVersion}/img/champion/${match.participants[2].championName}.png">
          ${match.participants[2].gameName}
          <img src="${ddragonURLwithVersion}/img/champion/${match.participants[7].championName}.png">
          ${match.participants[7].gameName}
          <br>
          <img src="${ddragonURLwithVersion}/img/champion/${match.participants[3].championName}.png">
          ${match.participants[3].gameName}
          <img src="${ddragonURLwithVersion}/img/champion/${match.participants[8].championName}.png">
          ${match.participants[8].gameName}
          <br>
          <img src="${ddragonURLwithVersion}/img/champion/${match.participants[4].championName}.png">
          ${match.participants[4].gameName}
          <img src="${ddragonURLwithVersion}/img/champion/${match.participants[9].championName}.png">
          ${match.participants[9].gameName}
        </td>
      </tr>
    `;
  }
  tableHTML += `
      </tbody>
    </table>
  `;
  document.getElementById("recentMatchData").innerHTML = tableHTML;
}

export { 
  clearSummonerInfo, 
  updateSummonerInfo, 
  updateRankedStats, 
  updateRecentOverallStats, 
  updateRecentChampionStats, 
  updateRecentMatchData 
};






