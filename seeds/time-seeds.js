const sequelize = require('../config/connection');
const { Time } = require('../models');


const userdata = [
    {
        time: '10:00'
    },
    {
        time: '11:00'
    },
    {
        time: '12:00'
    },
    {
        time: '13:00'
    },
    {
        time: '14:00'
    },
    {
        time: '15:00'
    },
    {
        time: '16:00'
    },
  ];
  
  const seedsTime= () => Time.bulkCreate(userdata, {individualHooks: true});

  module.exports = seedsTime;