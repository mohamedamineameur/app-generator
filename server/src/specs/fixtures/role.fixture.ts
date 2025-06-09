import Role from "../../models/role.model";
import { faker } from "@faker-js/faker";

interface RoleOverrides {
  name?: string;
  description?: string;
}
export const createRoleFixture = (overrides: RoleOverrides = {}) => {
  if (!overrides.name) {
    overrides.name = faker.person.jobTitle();
  }
  if (!overrides.description) {
    overrides.description = faker.lorem.sentence();
  }
  
  const role = Role.create({
    name: overrides.name,
    description: overrides.description,
  });
  
  return role;
}