const redis = require('redis');

describe('redis example suite', () => {
  let redisClient;

  beforeAll(async () => {
    const connectionUri = `redis://${global.__TESTCONTAINERS_REDIS_IP__}:${global.__TESTCONTAINERS_REDIS_PORT_6379__}`;
    redisClient = redis.createClient({ url: connectionUri });
    await redisClient.connect();
  });

  afterAll(async () => {
    await redisClient.quit();
  });

  it("should set a container name", () => {
    expect(global.__TESTCONTAINERS_REDIS_NAME__).toBeDefined();
  });

  it('should write correctly', async () => {
    // Act
    const setResult = await redisClient.set('test', 73);

    // Assert
    expect(setResult).toEqual('OK');
  });

  it('should read the written value correctly', async () => {
    // Act
    const getResult = await redisClient.get('test');

    // Assert
    expect(getResult).toEqual('73');
  });
});
