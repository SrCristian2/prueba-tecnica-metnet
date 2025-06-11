import { Response } from "../../src/helpers/Response";

describe("Response helper", () => {
  it("should send correct response", () => {
    const mockRes: any = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
    Response(mockRes, 200, true, { foo: "bar" }, "ok");
    expect(mockRes.status).toHaveBeenCalledWith(200);
    expect(mockRes.json).toHaveBeenCalledWith({
      success: true,
      data: { foo: "bar" },
      message: "ok",
    });
  });
});