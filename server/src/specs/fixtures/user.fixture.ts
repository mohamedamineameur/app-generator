import User from "../../models/user.model";
import { faker } from "@faker-js/faker";
import bcrypt from 'bcrypt';
import dotenv from 'dotenv';
dotenv.config();

const saltRounds = parseInt(process.env.SALT_ROUNDS || '10', 10);

interface UserOverrides {
  username?: string;
  email?: string;
  role?: string;
  password?: string;
}

export const createUserFixture = async (overrides: UserOverrides = {}) => {
  const defaultPassword = "StrongPassword1234@";

  const username = overrides.username || faker.internet.username(); // ⚠️ remplacer userName() déprécié
  const email = overrides.email || faker.internet.email();
  const role = overrides.role || "user";
  const plainPassword = overrides.password || defaultPassword;

  const hashedPassword = await bcrypt.hash(plainPassword, saltRounds);

  const user = await User.create({
    username,
    email,
    role,
    password: hashedPassword,
  });

  // ✅ Transforme en plain object et ajoute le mot de passe non hashé
  return {
    ...user.get({ plain: true }),
    nonHashedPassword: plainPassword,
  };
};
