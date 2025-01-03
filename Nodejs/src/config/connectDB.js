const { Sequelize } = require('sequelize');

// Option 3: Passing parameters separately (other dialects)
const sequelize = new Sequelize('test1', 'root', null, {
  host: 'localhost',
  dialect: 'mysql',
  logging: false
});

let connecDB = async () => { //async bất đồng bộ
    //draw funcion 
    try {
        await sequelize.authenticate();
        console.log('Connection has been established successfully.');
      } catch (error) {
        console.error('Unable to connect to the database:', error);
      }
}

module.exports = connecDB;