import blab from "../blab";

const validatePlace = place => {
  if (typeof place !== "string") {
    return false;
  }

  if (place.trim().length === 0) {
    return false;
  }

  return true;
};

const parse = toParse => {
  let toParseString = toParse;
  if (Buffer.isBuffer(toParseString)) {
    toParseString = toParse.toString();
  }

  const routes = {};
  const rows = toParseString.split(/\r?\n/);
  for (let i = 0; i < rows.length; i++) {
    const route = rows[i];
    const [from, to, minutes] = route.split(",");
    const rowNumber = i + 1;

    if (!validatePlace(from)) {
      blab.warn(
        `Route at row number ${rowNumber} has an invalid source . This row will be ignored`
      );
      continue;
    }

    if (!validatePlace(to)) {
      blab.warn(
        `Route at row number ${rowNumber} has an invalid destination . This row will be ignored`
      );
      continue;
    }

    const normalizedMinutes = Number.parseFloat(minutes, 10);

    if (Number.isNaN(normalizedMinutes)) {
      blab.warn(
        `Route ${from} ${to} has invalid travel time at row number ${rowNumber}. This row will be ignored`
      );
      continue;
    }

    const fromData = routes[from] || {};
    fromData[to] = normalizedMinutes;

    routes[from] = fromData;
  }

  return routes;
};

export default {
  parse
};
