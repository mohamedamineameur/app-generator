import bcrypt from 'bcrypt';
import dotenv from 'dotenv';
import User from '../models/user.model';

dotenv.config();

const saltRounds = parseInt(process.env.SALT_ROUNDS || '10', 10);

export async function adminGenerate() {
  try {
    const {
      ADMIN_USERNAME,
      ADMIN_EMAIL,
      ADMIN_PASSWORD,
      ADMIN_ROLE,
    } = process.env;

    // Validation
    if (!ADMIN_USERNAME || ADMIN_USERNAME.length < 3) {
      throw new Error('ADMIN_USERNAME must be at least 3 characters long');
    }

    if (!ADMIN_EMAIL || !/\S+@\S+\.\S+/.test(ADMIN_EMAIL)) {
      throw new Error('ADMIN_EMAIL must be a valid email address');
    }

    if (
      !ADMIN_PASSWORD ||
      !/^(?=.*[A-Z])(?=.*\d)(?=.*[^\w\s]).{12,}$/.test(ADMIN_PASSWORD)
    ) {
      throw new Error(
        'ADMIN_PASSWORD must be at least 12 characters, contain an uppercase letter, a number, and a special character'
      );
    }

    if (!['user', 'sudo'].includes(ADMIN_ROLE || '')) {
      throw new Error('ADMIN_ROLE must be either "user" or "sudo"');
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(ADMIN_PASSWORD, saltRounds);

    // Check if user already exists
    const existingUser = await User.findOne({
      where: {
        username: ADMIN_USERNAME,
      },
    });
    if (existingUser) {
      console.log(
        `⚠️ User with username "${ADMIN_USERNAME}" already exists. Skipping creation.`
      );
      return;
    }
    // Create user
    const newUser = await User.create({
      username: ADMIN_USERNAME,
      email: ADMIN_EMAIL,
      password: hashedPassword,
      role: ADMIN_ROLE,
    });

    console.log('✅ Admin user created successfully:', newUser.username);
  } catch (error) {
    console.error(
      '❌ Error creating admin user:',
      error instanceof Error ? error.message : error
    );
  }
}

