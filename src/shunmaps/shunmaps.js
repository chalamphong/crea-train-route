export default class ShunMaps {
  constructor({ routes }) {
    this.routes = routes;
  }

  static formatRoute(destination) {
    return {
      path: destination.path,
      duration: destination.minutesToDestination + destination.minutesToParent
    };
  }

  prepareDestinations({ parent, minutesToParent = 0, path = [], routes }) {
    if (routes) {
      return Object.keys(routes).map(destination => {
        return {
          parent: parent,
          destination,
          path,
          minutesToParent,
          minutesToDestination: routes[destination],
          routes: this.routes[destination]
        };
      });
    }

    return [];
  }

  getAllRoutes({ from, to }) {
    const routes = [];
    let fromRoutes = this.routes[from];
    if (!fromRoutes) {
      return routes;
    }

    let destinations = this.prepareDestinations({
      parent: from,
      routes: this.routes[from]
    });

    while (destinations.length > 0) {
      destinations.forEach(destination => {
        // Found Route, push to list
        if (destination.destination === to) {
          routes.push(ShunMaps.formatRoute(destination));
        }
      });

      // Get next level destinations
      let newDestinations = [];
      destinations.forEach(fromNode => {
        const {
          minutesToParent: minutesToGrandParent,
          minutesToDestination: minutesToParent,
          routes: destinationRoutes,
          destination: parent,
          path = []
        } = fromNode;
        const stops = path.map(stop => stop.station);
        if (!stops.includes(parent) && destinationRoutes) {
          const fromDestinations = this.prepareDestinations({
            parent,
            path: [
              ...path,
              { station: parent, minutesToStation: minutesToParent }
            ],
            minutesToParent: minutesToGrandParent + minutesToParent,
            routes: destinationRoutes
          });
          newDestinations = [...newDestinations, ...fromDestinations];
        }
      });

      destinations = newDestinations;
    }

    return routes;
  }

  getShortestRoute({ from, to }) {
    const allRoutes = this.getAllRoutes({ from, to });

    if (allRoutes.length > 0) {
      allRoutes.sort((routeA, routeB) => {
        if (routeA.duration !== routeB.duration) {
          return routeA.duration - routeB.duration;
        }

        return routeA.path.length - routeB.path.length;
      });
      return allRoutes[0];
    }
  }
}
