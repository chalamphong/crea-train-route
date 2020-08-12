export default class shunMaps {
  constructor({ routes }) {
    this.routes = routes;
  }

  prepareDestinations({ parent, minutesToParent = 0, path = [] }) {
    const routes = this.routes[parent];
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

    // Let destinations = Object.keys(fromRoutes).map(destination => {
    //   return {
    //     parent: from,
    //     destination,
    //     path: [],
    //     minutesToParent: 0,
    //     minutesToDestination: fromRoutes[destination],
    //     routes: this.routes[destination]
    //   };
    // });
    let destinations = this.prepareDestinations({
      parent: from
    });

    while (destinations.length > 0) {
      destinations.forEach(destination => {
        // Found Route, push to list
        if (destination.destination === to) {
          routes.push({
            stops: destination.path.length,
            path: destination.path,
            duration:
              destination.minutesToDestination + destination.minutesToParent
          });
        }
      });

      // Get next level destinations
      const newDestinations = [];
      destinations.forEach(fromNode => {
        const {
          minutesToParent: minutesToGrandParent,
          minutesToDestination: minutesToParent,
          routes: destinationRoutes,
          destination: parent,
          path
        } = fromNode;
        if (destinationRoutes) {
          Object.keys(destinationRoutes).forEach(newDestinationNode => {
            newDestinations.push({
              parent,
              destination: newDestinationNode,
              path: [...path, parent],
              minutesToParent: minutesToGrandParent + minutesToParent,
              minutesToDestination: destinationRoutes[newDestinationNode],
              routes: this.routes[newDestinationNode]
            });
          });
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
        return routeA.duration - routeB.duration;
      });
      return allRoutes[0];
    }
  }
}
