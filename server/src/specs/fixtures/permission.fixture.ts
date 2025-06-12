import Permission from "../../models/permission.model";
import { createRouteFixture } from "./route.fixture";
import { createRoleFixture } from "./role.fixture";

interface PermissionOverrides {
  routeId?: string;
  roleId?: string;
}
export const createPermissionFixture = async (overrides: PermissionOverrides = {}) => {
  if (!overrides.routeId) {
    const route = await createRouteFixture();
    overrides.routeId = route.id.toString();
  }
  if (!overrides.roleId) {
    const role = await createRoleFixture();
    overrides.roleId = role.id.toString();
  }

  const permission = await Permission.create({
    routeId: overrides.routeId,
    roleId: overrides.roleId,
  });

  return permission;
}