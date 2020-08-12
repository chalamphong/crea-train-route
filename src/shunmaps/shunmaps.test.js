import Shunmaps from "./";

const routes = {
  A: {
    B: 8,
    C: 10
  },
  B: {
    E: 12,
    X: 9,
    Y: 12
  },
  C: {
    Z: 12
  },
  D: {
    E: 1
  },
  E: {
    F: 12
  },
  G: {
    H: 12
  }
};

const shunmaps = new Shunmaps({ routes });

describe("Shunmaps", () => {
  describe("getShortestRoute", () => {
    it("Check shortest path sanity", () => {
      expect(shunmaps.getShortestRoute({ from: "A", to: "X" })).toEqual({
        duration: 17,
        path: ["B"],
        stops: 1
      });
    });
    it("Should return undefined for unknown origin", () => {
      expect(shunmaps.getShortestRoute({ from: "Q", to: "X" })).toEqual(
        undefined
      );
    });
    it("Should return undefined for unknown destination", () => {
      expect(shunmaps.getShortestRoute({ from: "A", to: "Q" })).toEqual(
        undefined
      );
    });
    it("Should return undefined for when no path exists", () => {
      expect(shunmaps.getShortestRoute({ from: "A", to: "G" })).toEqual(
        undefined
      );
    });
  });
});
