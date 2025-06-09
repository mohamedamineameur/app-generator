import { sequelize } from "../config/database";

export const preTestSetup = async () => {
  // Synchronize the database schema
  await sequelize.sync({ force: true });

  // Optionally, you can add seed data here if needed
  // await seedDatabase();
  
  console.log("✅ Database synchronized for testing.");
};
