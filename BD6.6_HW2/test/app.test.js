let request = require('supertest');
let { getAllGames } = require('../controllers');
let { app } = require('../index.js');
let http = require('http');

jest.mock('../controllers', () => ({
  ...jest.requireActual('../controllers'),
  getAllGames: jest.fn(),
}));

let server;

beforeAll(async () => {
  server = http.createServer(app);
  server.listen(3001);
});

afterAll(async () => {
  server.close();
});

describe('Controller Function tests', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should return all games', async () => {
    let mockGames = [
      {
        gameId: 1,
        title: 'The Legend of Zelda: Breath of the Wild',
        genre: 'Adventure',
        platform: 'Nintendo Switch',
      },
      {
        gameId: 2,
        title: 'Red Dead Redemption 2',
        genre: 'Action',
        platform: 'PlayStation 4',
      },
      {
        gameId: 3,
        title: 'The Witcher 3: Wild Hunt',
        genre: 'RPG',
        platform: 'PC',
      },
    ];

    getAllGames.mockReturnValue(mockGames);

    let result = await getAllGames();
    expect(result).toEqual(mockGames);
    expect(result.length).toBe(3);
  });
});

describe('API Endpoint tests', () => {
  it('GET /games should get all games', async () => {
    let res = await request(server).get('/games');

    expect(res.statusCode).toBe(200);
    expect(res.body).toEqual({
      games: [
        {
          gameId: 1,
          title: 'The Legend of Zelda: Breath of the Wild',
          genre: 'Adventure',
          platform: 'Nintendo Switch',
        },
        {
          gameId: 2,
          title: 'Red Dead Redemption 2',
          genre: 'Action',
          platform: 'PlayStation 4',
        },
        {
          gameId: 3,
          title: 'The Witcher 3: Wild Hunt',
          genre: 'RPG',
          platform: 'PC',
        },
      ]
    });
    expect(res.body.games.length).toBe(3);
  });

  it('GET /games/details/:id should get a game by ID', async () => {
    let res = await request(server).get('/games/details/1');

    expect(res.statusCode).toBe(200);
    expect(res.body).toEqual({
      game: {
        gameId: 1,
        title: 'The Legend of Zelda: Breath of the Wild',
        genre: 'Adventure',
        platform: 'Nintendo Switch',
      },
    });
  });
});
