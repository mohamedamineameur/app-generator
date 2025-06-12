import { Sequelize } from 'sequelize';

const isTestMode = process.env.NODE_ENV === 'test';

export const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: isTestMode ? ':memory:' : './database.sqlite',
    logging: false, 
});


