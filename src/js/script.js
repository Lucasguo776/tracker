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
  CHALLENGER: "CHALLENGER" ,
} 

const summonerSpells = [
  { id: 21, name: "SummonerBarrier" },
  { id: 1, name: "SummonerBoost" },
  { id: 14, name: "SummonerDot" },
  { id: 3, name: "SummonerExhaust" },
  { id: 4, name: "SummonerFlash" },
  { id: 6, name: "SummonerHaste" },
  { id: 7, name: "SummonerHeal" },
  { id: 13, name: "SummonerMana" },
  { id: 11, name: "SummonerSmite" },
  { id: 12, name: "SummonerTeleport" },
];

const runePaths = [
  { id: 8000, code: "7201_Precision", name: "Precision" },
  { id: 8100, code: "7200_Domination", name: "Domination" },
  { id: 8200, code: "7202_Sorcery", name: "Sorcery" },
  { id: 8300, code: "7203_Whimsy", name: "Inspiration" },
  { id: 8400, code: "7204_Resolve", name: "Resolve" },
];

const runes = [
  { id: 8112, name: "Electrocute", iconURL: "Electrocute/Electrocute" },
  { id: 8128, name: "DarkHarvest", iconURL: "DarkHarvest/DarkHarvest" },
  { id: 9923, name: "HailOfBlades", iconURL: "HailOfBlades/HailOfBlades" },
  { id: 8126, name: "CheapShot", iconURL: "CheapShot/CheapShot" },
  { id: 8139, name: "TasteofBlood", iconURL: "TasteofBlood/GreenTerror_TasteOfBlood" },
  { id: 8143, name: "SuddenImpact", iconURL: "SuddenImpact/SuddenImpact" },
  { id: 8137, name: "SixthSense", iconURL: "SixthSense/SixthSense" },
  { id: 8140, name: "GrislyMementos", iconURL: "GrislyMementos/GrislyMementos" },
  { id: 8141, name: "DeepWard", iconURL: "DeepWard/DeepWard" },
  { id: 8135, name: "TreasureHunter", iconURL: "TreasureHunter/TreasureHunter" },
  { id: 8105, name: "RelentlessHunter", iconURL: "RelentlessHunter/RelentlessHunter" },
  { id: 8106, name: "UltimateHunter", iconURL: "UltimateHunter/UltimateHunter" },
  { id: 8351, name: "GlacialAugment", iconURL: "GlacialAugment/GlacialAugment" },
  { id: 8360, name: "UnsealedSpellbook", iconURL: "UnsealedSpellbook/UnsealedSpellbook" },
  { id: 8369, name: "FirstStrike", iconURL: "FirstStrike/FirstStrike" },
  { id: 8306, name: "HextechFlashtraption", iconURL: "HextechFlashtraption/HextechFlashtraption" },
  { id: 8304, name: "MagicalFootwear", iconURL: "MagicalFootwear/MagicalFootwear" },
  { id: 8321, name: "CashBack", iconURL: "CashBack/CashBack2" },
  { id: 8313, name: "TripleTonic", iconURL: "PerfectTiming/AlchemistCabinet" },
  { id: 8352, name: "TimeWarpTonic", iconURL: "TimeWarpTonic/TimeWarpTonic" },
  { id: 8345, name: "BiscuitDelivery", iconURL: "BiscuitDelivery/BiscuitDelivery" },
  { id: 8347, name: "CosmicInsight", iconURL: "CosmicInsight/CosmicInsight" },
  { id: 8410, name: "ApproachVelocity", iconURL: "ApproachVelocity/ApproachVelocity" },
  { id: 8316, name: "JackOfAllTrades", iconURL: "JackOfAllTrades/JackofAllTrades2" },
  { id: 8005, name: "PressTheAttack", iconURL: "PressTheAttack/PressTheAttack" },
  { id: 8008, name: "LethalTempo", iconURL: "LethalTempo/LethalTempoTemp" },
  { id: 8021, name: "FleetFootwork", iconURL: "FleetFootwork/FleetFootwork" },
  { id: 8010, name: "Conqueror", iconURL: "Conqueror/Conqueror" },
  { id: 9101, name: "AbsorbLife", iconURL: "AbsorbLife/AbsorbLife" },
  { id: 9111, name: "Triumph", iconURL: "Triumph/Triumph" },
  { id: 8009, name: "PresenceOfMind", iconURL: "PresenceOfMind/PresenceOfMind" },
  { id: 9104, name: "LegendAlacrity", iconURL: "LegendAlacrity/LegendAlacrity" },
  { id: 9105, name: "LegendHaste", iconURL: "LegendHaste/LegendHaste" },
  { id: 9103, name: "LegendBloodline", iconURL: "LegendBloodline/LegendBloodline" },
  { id: 8014, name: "CoupDeGrace", iconURL: "CoupDeGrace/CoupDeGrace" },
  { id: 8017, name: "CutDown", iconURL: "CutDown/CutDown" },
  { id: 8299, name: "LastStand", iconURL: "LastStand/LastStand" },
  { id: 8437, name: "GraspOfTheUndying", iconURL: "GraspOfTheUndying/GraspOfTheUndying" },
  { id: 8439, name: "Aftershock", iconURL: "Aftershock/Aftershock" },
  { id: 8465, name: "Guardian", iconURL: "VeteranAftershock/VeteranAftershock" },
  { id: 8446, name: "Demolish", iconURL: "Demolish/Demolish" },
  { id: 8463, name: "FontOfLife", iconURL: "FontOfLife/FontOfLife" },
  { id: 8401, name: "ShieldBash", iconURL: "ShieldBash/ShieldBash" },
  { id: 8429, name: "Conditioning", iconURL: "Conditioning/Conditioning" },
  { id: 8444, name: "SecondWind", iconURL: "SecondWind/SecondWind" },
  { id: 8473, name: "BonePlating", iconURL: "BonePlating/BonePlating" },
  { id: 8451, name: "Overgrowth", iconURL: "Overgrowth/Overgrowth" },
  { id: 8453, name: "Revitalize", iconURL: "Revitalize/Revitalize" },
  { id: 8242, name: "Unflinching", iconURL: "Unflinching/Unflinching" },
  { id: 8214, name: "SummonAery", iconURL: "SummonAery/SummonAery" },
  { id: 8229, name: "ArcaneComet", iconURL: "ArcaneComet/ArcaneComet" },
  { id: 8230, name: "PhaseRush", iconURL: "PhaseRush/PhaseRush" },
  { id: 8224, name: "AxiomArcanist", iconURL: "NullifyingOrb/Axiom_Arcanist" },
  { id: 8226, name: "ManaflowBand", iconURL: "ManaflowBand/ManaflowBand" },
  { id: 8275, name: "NimbusCloak", iconURL: "NimbusCloak/6361" },
  { id: 8210, name: "Transcendence", iconURL: "Transcendence/Transcendence" },
  { id: 8234, name: "Celerity", iconURL: "Celerity/CelerityTemp" },
  { id: 8233, name: "AbsoluteFocus", iconURL: "AbsoluteFocus/AbsoluteFocus" },
  { id: 8237, name: "Scorch", iconURL: "Scorch/Scorch" },
  { id: 8232, name: "Waterwalking", iconURL: "Waterwalking/Waterwalking" },
  { id: 8236, name: "GatheringStorm", iconURL: "GatheringStorm/GatheringStorm" }
]

const queueData = [
  { queueId: 0, map: "Custom games", description: "Custom Game" },
  { queueId: 2, map: "Summoner's Rift", description: "5v5 Blind Pick" },
  { queueId: 4, map: "Summoner's Rift", description: "5v5 Ranked Solo" },
  { queueId: 6, map: "Summoner's Rift", description: "5v5 Ranked Premade" },
  { queueId: 7, map: "Summoner's Rift", description: "Co-op vs AI" },
  { queueId: 8, map: "Twisted Treeline", description: "3v3 Normal" },
  { queueId: 9, map: "Twisted Treeline", description: "3v3 Ranked Flex" },
  { queueId: 14, map: "Summoner's Rift", description: "5v5 Draft Pick" },
  { queueId: 16, map: "Crystal Scar", description: "5v5 Dominion Blind Pick" },
  { queueId: 25, map: "Crystal Scar", description: "Dominion Co-op vs AI" },
  { queueId: 31, map: "Summoner's Rift", description: "Co-op vs AI Intro Bot" },
  { queueId: 32, map: "Summoner's Rift", description: "Co-op vs AI Beginner Bot" },
  { queueId: 33, map: "Summoner's Rift", description: "Co-op vs AI Intermediate Bot" },
  { queueId: 400, map: "Summoner's Rift", description: "5v5 Draft Pick" },
  { queueId: 420, map: "Summoner's Rift", description: "5v5 Ranked Solo" },
  { queueId: 430, map: "Summoner's Rift", description: "5v5 Blind Pick" },
  { queueId: 440, map: "Summoner's Rift", description: "5v5 Ranked Flex" },
  { queueId: 450, map: "Howling Abyss", description: "5v5 ARAM" },
  { queueId: 700, map: "Summoner's Rift", description: "Clash" },
  { queueId: 900, map: "Summoner's Rift", description: "ARURF" },
  { queueId: 1020, map: "Summoner's Rift", description: "One for All" },
];

var ddragonURL = "";
var ddragonURLwithVersion = "";

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
  document.getElementById("recentOverallStatsWinRate").innerHTML = "";
  document.getElementById("recentOverallStatsKDA").innerHTML = "";
  document.getElementById("recentOverallStatsKillParticipation").innerHTML = "";
  document.getElementById("recentOverallStatsCSGoldDmgVS").innerHTML = "";
  document.getElementById("recentOverallStatsTeamPosition").innerHTML = "";

}

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

function processMatchStatsHelper(match, counter, totalCurrentTeamKills) {
  playerStats = match.info.participants[counter];

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
  const profileIconUrl = `${ddragonURLwithVersion}/img/profileicon/${summonerData.profileIconId}.png`;
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
  
  console.log(recentStats);
}

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
    runePathsSecondaryCode = runePathsMapCode.get(match.runePathSecondary);

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


// Main function
async function searchSummoner() {
  clearSummonerInfo();
  const gameName = document.getElementById("gameName").value;
  const tagLine = document.getElementById("tagLine").value;
  const regionId = document.getElementById("regionSelect").value;

  try {
    // Fetch data
    const ddragonVersionHistory = await fetchDdragonVersion();
    const ddragonVersion = ddragonVersionHistory[0];
    ddragonURL = "https://ddragon.leagueoflegends.com/cdn"
    ddragonURLwithVersion = "https://ddragon.leagueoflegends.com/cdn/" + ddragonVersion;

    const accountData = await fetchAccountData(gameName, tagLine, regionId);
    puuid = accountData.puuid;
    console.log(puuid);
    const summonerData = await fetchSummonerData(puuid);
    summonerId = summonerData.id;
    const rankedData = await fetchRankedData(summonerId);
    const recentMatchListData = await fetchMatchListData(puuid);
    const recentMatchData = await fetchMatchHistoryData(recentMatchListData);
    
    console.log(recentMatchData);

    // Process data
    const { rankFlex, rankSolo } = processRankedData(rankedData);
    const recentStats = processRecentStats(recentMatchData);

    // Update UI
    updateSummonerInfo(gameName, tagLine, summonerData);
    updateRankedStats(rankFlex, rankSolo);
    updateRecentOverallStats(recentStats);
    updateRecentChampionStats(recentStats);
    updateRecentMatchData(recentStats);
    console.log(recentMatchData);
  } catch (error) {
    console.error("Error fetching or processing data:", error);
  }
}
