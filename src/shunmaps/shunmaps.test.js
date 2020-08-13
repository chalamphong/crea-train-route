import Shunmaps from "./";

const routes = {
  A: {
    B: 8,
    C: 10
  },
  B: {
    D: 2,
    E: 12,
    X: 9,
    Y: 12,
    C: 2
  },
  C: {
    Z: 12,
    F: 22
  },
  D: {
    E: 10
  },
  E: {
    F: 12
  },
  G: {
    H: 12
  },
  X: {
    Z: 2
  },
  Z: {
    X: 2
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
    it("Returns path with the least number of stops when durations are the same", () => {
      expect(shunmaps.getShortestRoute({ from: "B", to: "F" })).toEqual({
        duration: 24,
        path: ["E"],
        stops: 1
      });
    });
    it("does not route back to parent", () => {
      expect(shunmaps.getShortestRoute({ from: "X", to: "Z" })).toEqual({
        duration: 2,
        path: [],
        stops: 0
      });
    });
  });
  describe("getAllRoutes", () => {
    it("Check sanity", () => {
      expect(shunmaps.getAllRoutes({ from: "A", to: "C" })).toEqual([
        {
          duration: 10,
          path: [],
          stops: 0
        },
        {
          duration: 10,
          path: ["B"],
          stops: 1
        }
      ]);
    });
  });
});
