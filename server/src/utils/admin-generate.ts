import prompts from 'prompts';
import User from '../models/user.model';
import bcrypt from 'bcrypt';
import dotenv from 'dotenv';

dotenv.config();
const saltRounds = parseInt(process.env.SALT_ROUNDS || '10', 10);

export async function adminGenerate() {
  try {
    const response = await prompts([
      {
        type: 'text',
        name: 'username',
        message: 'Enter username:',
        validate: value => value.length >= 3 ? true : 'Username must be at least 3 characters long'
      },
      {
        type: 'text',
        name: 'email',
        message: 'Enter email:',
        validate: value => /\S+@\S+\.\S+/.test(value) ? true : 'Invalid email format'
      },
      {
        type: 'password',
        name: 'password',
        message: 'Enter password (at least 12 characters, one uppercase letter, one digit, and one special character):',
        validate: value => /^(?=.*[A-Z])(?=.*\d)(?=.*[^\w\s]).{12,}$/.test(value) ? true : 'Password must meet the criteria'
      },
      {
        type: 'select',
        name: 'role',
        message: 'Select role:',
        choices: [
          { title: 'User', value: 'user' },
          { title: 'Sudo', value: 'sudo' }
        ],
        initial: 0
      }
    ]);

    // Hash the password
    const hashedPassword = await bcrypt.hash(response.password, saltRounds);

    // Create the user
    const newUser = await User.create({
      username: response.username,
      email: response.email,
      password: hashedPassword,
      role: response.role
    });

    console.log('Admin user created successfully:', newUser);
  } catch (error) {
    console.error('Error creating admin user:', error instanceof Error ? error.message : 'An unknown error occurred');
  }
}

adminGenerate()
  .then(() => console.log('Admin generation script completed'))
  .catch(error => console.error('Error in admin generation script:', error instanceof Error ? error.message : 'An unknown error occurred'));

// To run this script, you can use the command line:
// npm run admin-generate