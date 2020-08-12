import routeparser from "./";

describe("Route parser", () => {
  // Remove warning logs from test interface
  const mocKFunc = jest.fn();
  console.log = mocKFunc;
  console.error = mocKFunc;
  console.info = mocKFunc;
  console.warn = mocKFunc;
  it("parses csv string", () => {
    const csvString = "A,B,5";
    const expected = {
      A: {
        B: 5
      }
    };

    expect(routeparser.parse(csvString)).toEqual(expected);
  });
  it("parses csv string with multiple rows", () => {
    const csvString = "A,B,5\nB,C,8";
    const expected = {
      A: {
        B: 5
      },
      B: {
        C: 8
      }
    };

    expect(routeparser.parse(csvString)).toEqual(expected);
  });
  it("parses csv string with multiple rows and multiple destination for single source", () => {
    const csvString = "A,B,5\nB,C,8\nA,C,10";
    const expected = {
      A: {
        B: 5,
        C: 10
      },
      B: {
        C: 8
      }
    };

    expect(routeparser.parse(csvString)).toEqual(expected);
  });
  it("ignores routes with empty source", () => {
    const csvString = ",B,5\nB,C,8\nA,C,10";
    const expected = {
      A: {
        C: 10
      },
      B: {
        C: 8
      }
    };

    expect(routeparser.parse(csvString)).toEqual(expected);
  });
  it("ignores routes with empty destination", () => {
    const csvString = "A,,5\nB,C,8\nA,C,10";
    const expected = {
      A: {
        C: 10
      },
      B: {
        C: 8
      }
    };

    expect(routeparser.parse(csvString)).toEqual(expected);
  });
  it("ignores routes with non numerical minutes", () => {
    const csvString = "A,B,ds\nB,C,8\nA,C,10";
    const expected = {
      A: {
        C: 10
      },
      B: {
        C: 8
      }
    };

    expect(routeparser.parse(csvString)).toEqual(expected);
  });
  it("works with floating minutes", () => {
    const csvString = "A,B,9.8\nB,C,8\nA,C,10";
    const expected = {
      A: {
        C: 10,
        B: 9.8
      },
      B: {
        C: 8
      }
    };

    expect(routeparser.parse(csvString)).toEqual(expected);
  });
});
