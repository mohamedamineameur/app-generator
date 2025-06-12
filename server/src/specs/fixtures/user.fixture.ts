import User from "../../models/user.model";
import { faker } from "@faker-js/faker";

interface UserOverrides {
  email?: string;
  password?: string;
  firstName?: string;
  lastName?: string;
  roleId?: number | null;
}

export const createUserFixture = (overrides: UserOverrides = {}) => {
  if (!overrides.email) {
    overrides.email = faker.internet.email();
  }
  if (!overrides.password) {
    overrides.password = faker.internet.password();
  }
  if (!overrides.firstName) {
    overrides.firstName = faker.person.firstName();
  }
  if (!overrides.lastName) {
    overrides.lastName = faker.person.lastName();
  }
  if (!overrides.roleId) {
    overrides.roleId = null
  }

  const user = User.create({
    email: overrides.email,
    password: overrides.password,
    firstName: overrides.firstName,
    lastName: overrides.lastName,
    roleId: overrides.roleId,
  });
  return user;
};
