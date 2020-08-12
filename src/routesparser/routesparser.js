const parse = toParse => {
  let toParseString = toParse;
  if (Buffer.isBuffer(toParseString)) {
    toParseString = toParse.toString();
  }

  const routes = {};
  toParseString.split(/\r?\n/).forEach(route => {
    const [from, to, minutes] = route.split(",");
    const fromData = routes[from] || {};
    fromData[to] = minutes;

    routes[from] = fromData;
  });

  return routes;
};

export default {
  parse
};
