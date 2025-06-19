
  import User from '../models/user.model';
  import { userSchema } from '../schemas/user.schema';
  import { validateSchema } from '../utils/validateSchema';
  import bcrypt from 'bcrypt';
  import dotenv from 'dotenv';
  dotenv.config();

  // salte round for password hashing
  const saltRounds = parseInt(process.env.SALT_ROUNDS || '10', 10);
  
  function isValidPassword(password:string) {
    const regex = /^(?=.*[A-Z])(?=.*\d)(?=.*[^\w\s]).{12,}$/;
    return regex.test(password);
  }
  
  export async function createUser(req:any, res:any) {
    try {
      const schema = userSchema().create();
      validateSchema(schema, req.body);
      if (!isValidPassword(req.body.password)) {
        return res.status(400).json({
          error: "The password must be at least 12 characters long and include at least one uppercase letter, one digit, and one special character."
        });
      }
      
      //test password regex


      // Hash the password before saving
      req.body.password = await bcrypt.hash(req.body.password, saltRounds);
      // Check if the user already exists
      const existingUser = await User.findOne({ where: { email: req.body.email } });
      if (existingUser) {
        return res.status(400).json({ error: 'User with this email already exists' });
      }
      // Create the new user
  
      const newUser = await User.create(req.body);
      res.status(201).json(newUser);
    } catch (error) {
        res.status(400).json({ error: (error instanceof Error) ? error.message : 'An unknown error occurred' });

    }
  }


  export async function getAllUsers(req:any, res:any) {
    try {
      const items = await User.findAll();
      res.status(200).json(items);
    } catch (error) {
        res.status(400).json({ error: (error instanceof Error) ? error.message : 'An unknown error occurred' });

    }
  }


  export async function getUserById(req:any, res:any) {
    try {
      const schema = userSchema().readById();
      validateSchema(schema, req.body);
  
      const item = await User.findByPk(req.params.id);
      if (!item) {
        return res.status(404).json({ error: 'User not found' });
      }
  
      res.status(200).json(item);
    } catch (error) {
        res.status(400).json({ error: (error instanceof Error) ? error.message : 'An unknown error occurred' });

    }
  }


  export async function updateUser(req:any, res:any) {
    try {
      const schema = userSchema().update();
      validateSchema(schema, req.body);
      // Hash the password if it is being updated
      if (req.body.password) {
        if (!isValidPassword(req.body.password)) {
          return res.status(400).json({
            error: "The password must be at least 12 characters long and include at least one uppercase letter, one digit, and one special character."
          });
        }
        req.body.password = await bcrypt.hash(req.body.password, saltRounds);
      }
  
      const item = await User.findByPk(req.body.id);
      if (!item) {
        return res.status(404).json({ error: 'User not found' });
      }
  
      await item.update(req.body);
      res.status(200).json(item);
    } catch (error) {
        res.status(400).json({ error: (error instanceof Error) ? error.message : 'An unknown error occurred' });

    }
  }


  export async function deleteUser(req:any, res:any) {
    try {
      const schema = userSchema().destroy();
      validateSchema(schema, req.body);
  
      const item = await User.findByPk(req.params.id);
      if (!item) {
        return res.status(404).json({ error: 'User not found' });
      }
  
      await item.destroy();
      res.status(200).json({ message: 'User deleted successfully' });
    } catch (error) {
        res.status(400).json({ error: (error instanceof Error) ? error.message : 'An unknown error occurred' });

    }
  }
  