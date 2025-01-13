// import { tiers } from './public/enums.js';

const tiers = {
  UNRANKED: "UNRANKED",
  IRON: "IRON",
  BRONZE: "BRONZE",
  SILVER: "SILVER",
  GOLD: "GOLD",
  PLATINUM: "PLATINUM",
  EMERALD: "EMERALD",
  MASTER: "MASTER",
  GRANDMASTER: "GRANDMASTER",
  CHALLENGER: "CHALLENGER" 
} 

const localhostURL = "http://localhost:3000";
var puuid = "";
var summonerId = "";


document.addEventListener("keydown", function(event) {
  if (event.key === 'Enter') {
      searchSummoner();
  }
});

// Utility function that clears all html info
function clearSummonerInfo() {
  document.getElementById("summonerName").innerHTML = "";
  document.getElementById("summonerLevel").innerHTML = "";
  document.getElementById("summonerProfileIcon").src = "";
  document.getElementById("rankFlex").innerHTML = "";
  document.getElementById("rankFlexWinRate").innerHTML = "";
  document.getElementById("rankSolo").innerHTML = "";
  document.getElementById("rankSoloWinRate").innerHTML = "";
  document.getElementById("matchData").innerHTML = "";
}

// Utility function for win rate
function winRate(wins, losses) {
  if (losses === 0) return 100;
  return Math.round((100 * wins) / (wins + losses));
}

// Fetch functions
async function fetchAccountData(gameName, tagLine, regionId) {
  const response = await fetch(localhostURL + `/account/by-riot-id?gameName=${gameName}&tagLine=${tagLine}&regionId=${regionId}`);
  return response.json();
}

async function fetchSummonerData(puuid) {
  const response = await fetch(localhostURL + `/summoner/by-puuid?puuid=${puuid}`);
  return response.json();
}

async function fetchRankedData(summonerId) {
  const response = await fetch(localhostURL + `/league/ranked-entries/by-summonerid?encryptedSummonerId=${summonerId}`);
  return response.json();
}

async function fetchMatchListData(puuid) {
  const response = await fetch(localhostURL + `/match/by-puuid?puuid=${puuid}`);
  return response.json();
}

async function fetchMatchHistoryData(matchListData) {
  const responseArray = [];
  for(const matchId of matchListData) {
    const response = await fetch(localhostURL +  `/match/by-matchid?matchid=${matchId}`);
    const response1 = await response.json();
    responseArray.push(response1);
  }
  return responseArray;
}

// Process ranked data
function processRankedData(summonerRankedData) {
  const rankFlex = { tier: "UNRANKED" };
  const rankSolo = { tier: "UNRANKED" };
  if(summonerRankedData.length === 0) {
    return { rankFlex, rankSolo };
  }

  for (const rankedData of summonerRankedData) {
    if (rankedData.queueType === "RANKED_FLEX_SR") {
      Object.assign(rankFlex, {
        tier: rankedData.tier,
        rank: rankedData.rank,
        wins: rankedData.wins,
        losses: rankedData.losses,
        leaguePoints: rankedData.leaguePoints,
        winRate: winRate(rankedData.wins, rankedData.losses),
      });
    } else if (rankedData.queueType === "RANKED_SOLO_5x5") {
      Object.assign(rankSolo, {
        tier: rankedData.tier,
        rank: rankedData.rank,
        wins: rankedData.wins,
        losses: rankedData.losses,
        leaguePoints: rankedData.leaguePoints,
        winRate: winRate(rankedData.wins, rankedData.losses),
      });
    }
  }

  return { rankFlex, rankSolo };
}

function processRecentStats(recentMatchData) {
  var recentStats = {
    recentOverallStats: {
      wins: 0,
      losses: 0,
      kills: 0,
      deaths: 0,
      assists: 0,
      minutesPlayed: 0,
      creepScore: 0,
      gold: 0,
      damage: 0,
      visionScore: 0,
      killParticipation: 0,
      rolesPlayed: {
        topLane: 0,
        jungle: 0,
        midLane: 0,
        botLane: 0,
        support: 0
      }
    },
    recentChampionStats: [],
  };

  var totalOverallTeamKills = 0;
  for(const match of recentMatchData) {
    // Determine participant within match
    var counter = 0;
    for(const playerId of match.metadata.participants) {
      if (playerId === puuid) {
        break;
      }
      counter++;
    }

    var playerStats = match.info.participants[counter];
    var totalCurrentTeamKills = 0;

    if (playerStats.win) {
      recentStats.recentOverallStats.wins += 1;
    } else {
      recentStats.recentOverallStats.losses += 1;
    }
    recentStats.recentOverallStats.kills += playerStats.kills;
    recentStats.recentOverallStats.deaths += playerStats.deaths;
    recentStats.recentOverallStats.assists += playerStats.assists;
    recentStats.recentOverallStats.minutesPlayed += playerStats.timePlayed / 60;
    recentStats.recentOverallStats.creepScore += playerStats.neutralMinionsKilled + playerStats.totalMinionsKilled;
    recentStats.recentOverallStats.gold += playerStats.goldEarned;
    recentStats.recentOverallStats.damage += playerStats.totalDamageDealtToChampions;
    recentStats.recentOverallStats.visionScore += playerStats.visionScore;
    if (playerStats.teamPosition === "TOP") {
      recentStats.recentOverallStats.rolesPlayed.topLane++;
    } else if (playerStats.teamPosition === "JUNGLE") {
      recentStats.recentOverallStats.rolesPlayed.jungle++;
    } else if (playerStats.teamPosition === "MIDDLE") {
      recentStats.recentOverallStats.rolesPlayed.midLane++;
    } else if (playerStats.teamPosition === "Bottom") {
      recentStats.recentOverallStats.rolesPlayed.botLane++;
    } else if (playerStats.teamPosition === "UTILITY") {
      recentStats.recentOverallStats.rolesPlayed.support++;
    }

    // Calculate total team kills for kill participation
    var teamId = counter < 5 ? 100 : 200; // Determine player's team
    for(var i = 0; i < 10; i++) {
      if (match.info.participants[i].teamId === teamId) {
        totalOverallTeamKills += match.info.participants[i].kills;
        totalCurrentTeamKills += match.info.participants[i].kills;
      }
    }

    // Update champion stats correctly
    var champion = recentStats.recentChampionStats.find(item => item.championName === playerStats.championName);
    if (!champion) {
      recentStats.recentChampionStats.push({
        championName: playerStats.championName,
        championWins: playerStats.win ? 1 : 0,
        championLosses: playerStats.win ? 0 : 1,
        championKills: playerStats.kills,
        championDeaths: playerStats.deaths,
        championAssists: playerStats.assists,
        championMinutesPlayed: playerStats.timePlayed / 60, 
        championCreepScore: playerStats.neutralMinionsKilled + playerStats.totalMinionsKilled, 
        championGold: playerStats.goldEarned, 
        championDamage: playerStats.totalDamageDealtToChampions, 
        championVisionScore: playerStats.visionScore, 
        championTeamKills: totalCurrentTeamKills,
        championKillParticipation: (playerStats.kills + playerStats.assists) / totalCurrentTeamKills
      });
      console.log(totalCurrentTeamKills);
    } else {
      champion.championWins += playerStats.win ? 1 : 0;
      champion.championLosses += playerStats.win ? 0 : 1;
      champion.championKills += playerStats.kills;
      champion.championDeaths += playerStats.deaths;
      champion.championAssists += playerStats.assists;
      champion.championMinutesPlayed += playerStats.timePlayed / 60;
      champion.championCreepScore += playerStats.neutralMinionsKilled + playerStats.totalMinionsKilled;
      champion.championGold += playerStats.goldEarned; 
      champion.championDamage += playerStats.totalDamageDealtToChampions; 
      champion.championVisionScore += playerStats.visionScore; 
      champion.championTeamKills += totalCurrentTeamKills;
      champion.championKillParticipation = (champion.championKills + champion.championAssists) / champion.championTeamKills;
      console.log(champion.championTeamKills);
    }
  }
  console.log(recentStats.recentOverallStats.creepScore/recentStats.recentOverallStats.minutesPlayed);
  recentStats.recentOverallStats.killParticipation = (recentStats.recentOverallStats.kills + recentStats.recentOverallStats.assists) / totalOverallTeamKills;
  return recentStats;
}

// Update UI functions
function updateSummonerInfo(gameName, tagLine, summonerData) {
  document.getElementById("summonerName").innerHTML = `${gameName}#${tagLine}`;
  document.getElementById("summonerLevel").innerHTML = `Level: ${summonerData.summonerLevel}`;
  const profileIconUrl = `https://ddragon.leagueoflegends.com/cdn/14.24.1/img/profileicon/${summonerData.profileIconId}.png`;
  document.getElementById("summonerProfileIcon").src = profileIconUrl;
}

function updateRankedStats(rankFlex, rankSolo) {
  document.getElementById("rankedStatsHeading").innerHTML = "Ranked Stats";
  document.getElementById("rankedFlexHeading").innerHTML = "Ranked Flex";
  console.log(rankFlex);
  console.log(rankSolo);
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

function updateRecentOverallStats(recentStats) {
  const stats = recentStats.recentOverallStats;
  const gamesPlayed = stats.wins + stats.losses;
  document.getElementById("recentStatsHeading").innerHTML = "Recent Stats";
  document.getElementById("recentOverallStatsWinRate").innerHTML = stats.wins + "W " + stats.losses + "L " + "Win Rate: " + winRate(stats.wins, stats.losses) + "%";
  document.getElementById("recentOverallStatsKDA").innerHTML = stats.kills / gamesPlayed + " / " + stats.deaths / gamesPlayed + " / " + stats.assists / gamesPlayed + " " + Math.round((stats.kills + stats.assists) / stats.deaths * 100)/100 + "KDA";
  document.getElementById("recentOverallStatsKillParticipation").innerHTML = Math.round(stats.killParticipation * 100); + "% Kill Participation";
  document.getElementById("recentOverallStatsCSGoldDmgVS").innerHTML = Math.round((stats.creepScore / stats.minutesPlayed) * 10) / 10 + " CS/min " 
                                                                        + Math.round(stats.gold / stats.minutesPlayed) + " Gold/min "
                                                                        + Math.round(stats.damage / stats.minutesPlayed) + " Damage/min "
                                                                        + stats.visionScore + " Vision Score ";
  document.getElementById("recentOverallStatsTeamPosition").innerHTML = "TOP: "
  console.log(recentStats);
}

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
    console.log(puuid);
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

    console.log(recentMatchData);
    const arraydisplay = recentMatchListData.join('<br>');
    document.getElementById("matchData").innerHTML = arraydisplay;
  } catch (error) {
    console.error("Error fetching or processing data:", error);
  }
}