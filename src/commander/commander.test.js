import { processArgs } from "./commander";

describe("processArgs", () => {
  it("returns an empty object if no arguments passed", () => {
    expect(processArgs()).toEqual({});
  });
  it("returns an empty object if argument is not an array", () => {
    expect(processArgs("foo")).toEqual({});
  });
  it("returns an empty object if argument is an empty array", () => {
    expect(processArgs([])).toEqual({});
  });
  it("returns an empty object argument array have no flags", () => {
    expect(processArgs(["foo", "bar"])).toEqual({});
  });
  it("returns an object with flags passed as expected", () => {
    expect(processArgs(["--foo", "bar"])).toEqual({
      foo: "bar"
    });
  });
  it("returns an object with flags passed as expected, for multiple arguments", () => {
    expect(processArgs(["--foo", "bar", "--bar", "baz"])).toEqual({
      foo: "bar",
      bar: "baz"
    });
  });
  it("Defaults values for flags that don't have a value to a boolean of value true", () => {
    const toTest = processArgs(["--foo", "bar", "--bar", "--baz", "bar"]);
    const expected = {
      foo: "bar",
      bar: true,
      baz: "bar"
    };
    expect(toTest).toEqual(expected);
  });
  it("Handles arguments with key and value in the same string", () => {
    const toTest = processArgs(["--foo=bar", "--bar", "--baz=bar"]);
    const expected = {
      foo: "bar",
      bar: true,
      baz: "bar"
    };
    expect(toTest).toEqual(expected);
  });
  it("Defaults flag value to true for last flag too", () => {
    const toTest = processArgs(["--foo=bar", "--bar"]);
    const expected = {
      foo: "bar",
      bar: true
    };
    expect(toTest).toEqual(expected);
  });
});
