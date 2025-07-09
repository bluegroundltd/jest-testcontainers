import { createClient } from "redis";

const globals = (global as unknown) as any;

describe("redis example suite", () => {
  let redisClient: ReturnType<typeof createClient>;

  beforeAll(async () => {
    const connectionUri = `redis://${globals.__TESTCONTAINERS_REDIS_IP__}:${globals.__TESTCONTAINERS_REDIS_PORT_6379__}`;
    redisClient = createClient({ url: connectionUri });
    await redisClient.connect();
  });

  afterAll(async () => {
    await redisClient.quit();
  });

  it("should set the container name correctly", () => {
    expect(globals.__TESTCONTAINERS_REDIS_NAME__).toEqual(
      "/unique-container-name"
    );
  });

  it("should write correctly", async () => {
    const value: number = 73;
    const setResult = await redisClient.set("test", value.toString());
    expect(setResult).toEqual("OK");
  });

  it("should read the written value correctly", async () => {
    const getResult = await redisClient.get("test");
    expect(getResult).toEqual("73");
  });
});
