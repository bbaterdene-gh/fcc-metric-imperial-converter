'use strict';

const expect = require('chai').expect;
const ConvertHandler = require('../controllers/convertHandler.js');

module.exports = function (app) {
  
  let convertHandler = new ConvertHandler();

  app.get('/api/convert', (req, res) => {
    let { input } = req.query

    const initNum = Number(convertHandler.getNum(input)).toFixed(5)
    const initUnit = convertHandler.getUnit(input)
    const returnNum = Number(convertHandler.convert(initNum, initUnit)).toFixed(5)
    const returnUnit = convertHandler.getReturnUnit(initUnit)
    const string = convertHandler.getString(initNum, initUnit, returnNum, returnUnit)
    res.json({
      initNum,
      initUnit,
      returnNum,
      returnUnit,
      string,
    })
  })
};
