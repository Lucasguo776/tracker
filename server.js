import express from 'express';
import fetch from 'node-fetch';
import cors from 'cors';  // Import the CORS package

const app = express();
const PORT = 3000;

import { APIkey } from './config.js';

var regionURL = "";
var regionRoutingAccountURL = "";
var regionRoutingURL = "";

// Enable CORS for all origins (you can restrict this if needed)
app.use(cors());

app.get('/account/by-riot-id', async (req, res) => {
  const { gameName, tagLine, regionId } = req.query;
  const numericRegionId = Number(regionId);

  const regionURLArray = [
    "https://br1.api.riotgames.com",
    "https://eun1.api.riotgames.com", 
    "https://euw1.api.riotgames.com", 
    "https://jp1.api.riotgames.com",
    "https://kr.api.riotgames.com",
    "https://la1.api.riotgames.com",
    "https://la2.api.riotgames.com",
    "https://me1.api.riotgames.com",
    "https://na1.api.riotgames.com",
    "https://oc1.api.riotgames.com",
    "https://ph2.api.riotgames.com",
    "https://ru.api.riotgames.com",
    "https://sg2.api.riotgames.com",
    "https://th2.api.riotgames.com",
    "https://tw2.api.riotgames.com",
    "https://vn2.api.riotgames.com"
  ];

  regionURL = regionURLArray[numericRegionId];

  if (numericRegionId === 0 || numericRegionId === 5 || numericRegionId === 6 || numericRegionId === 8) {
    regionRoutingAccountURL = "https://americas.api.riotgames.com";
  } else if (numericRegionId === 1 || numericRegionId === 2 || numericRegionId === 7 
            || numericRegionId === 11 || numericRegionId === 14) {
    regionRoutingAccountURL = "https://europe.api.riotgames.com";
  } else {
    regionRoutingAccountURL = "https://asia.api.riotgames.com";
  }
 
  if (numericRegionId === 9 || numericRegionId === 10 || numericRegionId === 12 
    || numericRegionId === 13 || numericRegionId === 15 || numericRegionId === 16) {
    regionRoutingURL = "https://sea.api.riotgames.com";
  } else {
    regionRoutingURL = regionRoutingAccountURL;
  }
  
  const summonerAccountURL = regionRoutingAccountURL + `/riot/account/v1/accounts/by-riot-id/${gameName}/${tagLine}?api_key=${APIkey}`;

  try {
    const response = await fetch(summonerAccountURL);
    const data = await response.json();
    res.json(data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to fetch summoner data' });
  }
});

app.get('/summoner/by-puuid', async (req, res) => {
  const { puuid } = req.query;
  
  const summonerURL = regionURL + `/lol/summoner/v4/summoners/by-puuid/${puuid}?api_key=${APIkey}`;
  
  try {
    const response = await fetch(summonerURL);
    const data = await response.json();
    res.json(data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to fetch summoner data' });
  }
});

app.get('/league/ranked-entries/by-summonerid', async (req, res) => {
  const { encryptedSummonerId} = req.query;
  
  const summonerURL = regionURL + `/lol/league/v4/entries/by-summoner/${encryptedSummonerId}?api_key=${APIkey}`;
  
  try {
    const response = await fetch(summonerURL);
    const data = await response.json();
    res.json(data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to fetch summoner data' });
  }
});

app.get('/match/by-puuid', async (req, res) => {
  // const { puuid, startTime, endTime, queue, type, start, count } = req.query;
  const { puuid } = req.query;

  // 30 days before
  const startTime = Math.floor(Date.now() / 1000) - 30 * 24 * 60 * 60 - 5*24*60*60; 
  const matchListURL = regionRoutingURL + `/lol/match/v5/matches/by-puuid/${puuid}/ids?startTime=${startTime}&start=0&count=20&api_key=${APIkey}`;
  
  try {
    const response = await fetch(matchListURL);
    const data = await response.json();
    res.json(data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to fetch summoner data' });
  }
});

app.get('/match/by-matchid', async (req, res) => {
  const { matchid } = req.query;

  const matchURL = regionRoutingURL + `/lol/match/v5/matches/${matchid}?api_key=${APIkey}`;

  try {
    const response = await fetch(matchURL);
    const data = await response.json();
    res.json(data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to fetch summoner data' });
  }
});


app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});