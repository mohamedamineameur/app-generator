import Route from "../../models/route.model";

interface RouteOverrides {
    name?: string;
    description?: string;
  }
export const createRouteFixture = (overrides: RouteOverrides = {}) => {
    if (!overrides.name) {
        overrides.name = `route-${Math.random().toString(36).substring(2, 15)}`;
    }
    if (!overrides.description) {
        overrides.description = `Description for ${overrides.name}`;
    }

    const route = Route.create({
        name: overrides.name,
        description: overrides.description,
    });

    return route;
};