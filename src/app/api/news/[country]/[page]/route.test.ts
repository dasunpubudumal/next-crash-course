import { GET } from "./route";
import { createMocks } from "node-mocks-http";

describe("News API", () => {
  it("should return news", async () => {
    const { req } = createMocks({
      method: "GET",
    });
    const response = await GET(req, { params: { page: "1" } });
    expect(response).toBeDefined();
    expect(response.status).toBe(200);
    expect(response.body).toBeDefined();
  });
});
