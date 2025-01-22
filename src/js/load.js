import { winRate } from './utility.js'; // Assuming winRate is defined in a utility file
import { puuid } from './script.js'; // If puuid is defined globally elsewhere

const localhostURL = "http://localhost:3000";

// Fetch functions
async function fetchDdragonVersion() {
  const response = await fetch(localhostURL + '/ddragon/version');
  return response.json();
}

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

/**
 * Processes a summoner's ranked data and returns detailed statistics for both Flex and Solo queues.
 *
 * Parameters:
 * - summonerRankedData (Array): An array of ranked data objects for a summoner, where each object contains
 *   details about the summoner's performance in a specific ranked queue.
 *
 * Returns:
 * - Object: An object containing two properties:
 *   - rankFlex: An object with data for the summoner's performance in the Flex ranked queue, including tier, 
 *     rank, wins, losses, league points, and win rate.
 *   - rankSolo: An object with data for the summoner's performance in the Solo ranked queue, including tier, 
 *     rank, wins, losses, league points, and win rate.
 * 
 * If the summoner has no ranked data, both `rankFlex` and `rankSolo` will default to "UNRANKED".
 */
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

/**
 * Processes match statistics for a specific player and returns an object containing detailed performance data.
 *
 * Parameters:
 * - match (Object): The match data object, typically containing information about the match, participants,
 *   and other game-related data.
 * - counter (number): The index of the participant in the `match.info.participants` array representing the player
 *   whose stats are being processed.
 * - totalCurrentTeamKills (number): The total number of kills achieved by the player's team in the match.
 *
 * Returns:
 * - Object: An object containing detailed statistics for the specified player, including match ID, 
 *   participant information, performance metrics, items, summoner spells, and rune paths.
 */
function processMatchStatsHelper(match, counter, totalCurrentTeamKills) {
  const playerStats = match.info.participants[counter];

  const recentMatchStats = {
    matchId: match.info.gameId,
    participants: [],
    queueId: match.info.queueId,
    gameResult: "",
    gameEndTimestamp: match.info.gameEndTimestamp, 
    kills: playerStats.kills,
    deaths: playerStats.deaths,
    assists: playerStats.assists,
    minutesPlayed: playerStats.timePlayed / 60,
    creepScore: playerStats.neutralMinionsKilled + playerStats.totalMinionsKilled,
    gold: playerStats.goldEarned,
    damage: playerStats.totalDamageDealtToChampions, 
    visionScore: playerStats.visionScore, 
    killParticipation: (playerStats.kills + playerStats.assists) / totalCurrentTeamKills,
    championName: playerStats.championName,
    champLevel: playerStats.champLevel,
    itemIds: [],
    summoner1Id: playerStats.summoner1Id,
    summoner2Id: playerStats.summoner2Id,
    runePathPrimary: playerStats.perks.styles[0].style,
    runePathSecondary: playerStats.perks.styles[1].style,
    runeKeystone: playerStats.perks.styles[0].selections[0].perk,
  };

  if (recentMatchStats.championName === "FiddleSticks") {
    recentMatchStats.championName = "Fiddlesticks";
  }

  for (const player of match.info.participants) {
    recentMatchStats.participants.push({
      gameName: player.riotIdGameName,
      tagLine: player.riotIdTagline,
      championName: player.championName,
      teamId: player.teamId,
    });
  }

  if (playerStats.gameEndedInEarlySurrender) {
    recentMatchStats.gameResult = "REMAKE";
  } else if (playerStats.win) {
    recentMatchStats.gameResult = "WIN";
  } else {
    recentMatchStats.gameResult = "LOSS";
  }

  recentMatchStats.itemIds.push(playerStats.item0);
  recentMatchStats.itemIds.push(playerStats.item1);
  recentMatchStats.itemIds.push(playerStats.item2);
  recentMatchStats.itemIds.push(playerStats.item3);
  recentMatchStats.itemIds.push(playerStats.item4);
  recentMatchStats.itemIds.push(playerStats.item5);
  recentMatchStats.itemIds.push(playerStats.item6);

  return recentMatchStats;
}

/**
 * Processes individual champion statistics for a summoner in a given match.
 *
 * Parameters:
 * - playerStats (Object): The individual player statistics from the match, containing detailed data
 *   such as champion name, kills, deaths, assists, and other match performance metrics.
 * - totalCurrentTeamKills (number): The total number of kills achieved by the player's team in the match.
 *
 * Returns:
 * - Object: An object representing the updated champion stats, including win/loss record, kills, deaths,
 *   assists, creep score, and more. If the champion has not been recorded yet, it initializes the stats.
 */
function processRecentChampionStatsHelper(playerStats, totalCurrentTeamKills, recentStats) {
  let champion = recentStats.recentChampionStats.find(item => item.championName === playerStats.championName);
  
  if (!champion) {
    // Initialize the champion stats if not found
    champion = {
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
    };
    recentStats.recentChampionStats.push(champion);
  } else {
    // Update the champion stats if already recorded
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
  }

  return recentStats;
}

/**
 * Processes recent match data for a summoner and calculates overall and champion-specific statistics.
 *
 * Parameters:
 * - recentMatchData (Array): An array of recent match data objects, each containing information about the match,
 *   participants, and the player's performance. The data is used to calculate various statistics for the summoner.
 *
 * Returns:
 * - Object: An object containing two properties:
 *   - recentOverallStats: A summary of the summoner's overall performance across all recent matches
 *   - recentChampionStats: An array of objects representing the summoner's performance with individual champions
 *   - recentMatchData: An array of objects containing stats each game played 
 */
function processRecentStats(recentMatchData) {
  var recentStats = {
    recentOverallStats: {
      gamesPlayed: 0,
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
      rolesPlayed: { topLane: 0, jungle: 0, midLane: 0, botLane: 0, support: 0 },
    },
    recentChampionStats: [],
    recentMatchData: [],
  };

  var totalOverallTeamKills = 0;
  for (const match of recentMatchData) {
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

    recentStats.recentOverallStats.gamesPlayed++;

    // Calculate total team kills for kill participation
    var teamId = counter < 5 ? 100 : 200; // Determine player's team
    for(var i = 0; i < 10; i++) {
      if (match.info.participants[i].teamId === teamId) {
        totalOverallTeamKills += match.info.participants[i].kills;
        totalCurrentTeamKills += match.info.participants[i].kills;
      }
    }

    recentStats.recentMatchData.push(processMatchStatsHelper(match, counter, totalCurrentTeamKills));

    if (playerStats.gameEndedInEarlySurrender) {
      continue;
    }

    if (playerStats.win) {
      recentStats.recentOverallStats.wins += 1;
    } else  {
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
    } else if (playerStats.teamPosition === "BOTTOM") {
      recentStats.recentOverallStats.rolesPlayed.botLane++;
    } else if (playerStats.teamPosition === "UTILITY") {
      recentStats.recentOverallStats.rolesPlayed.support++;
    }

    // Update champion stats correctly by calling the helper function
    recentStats = processRecentChampionStatsHelper(playerStats, totalCurrentTeamKills, recentStats);
  }

  recentStats.recentOverallStats.killParticipation = (recentStats.recentOverallStats.kills + recentStats.recentOverallStats.assists) / totalOverallTeamKills;
  recentStats.recentChampionStats.sort((a, b) => b.championWins + b.championLosses - a.championWins - a.championLosses);
  return recentStats;
}

export { 
  fetchDdragonVersion, 
  fetchAccountData, 
  fetchSummonerData, 
  fetchRankedData, 
  fetchMatchListData, 
  fetchMatchHistoryData, 
  processRankedData, 
  processRecentStats 
};