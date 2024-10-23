const express = require('express');
const { getAllGames, getGameById } = require('./controllers');

const app = express();

app.use(express.json());

app.get('/games', async (req, res) => {
  let games = await getAllGames();
  res.json({ games });
});

app.get("/games/details/:id", async (req, res) => {
  let id = parseInt(req.params.id);
  let game = await getGameById(id);
  res.json({ game });
});


module.exports = {app};