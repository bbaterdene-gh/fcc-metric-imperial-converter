'use strict';

const expect = require('chai').expect;
const ConvertHandler = require('../controllers/convertHandler.js');

module.exports = function (app) {
  
  let convertHandler = new ConvertHandler();

  app.get('/api/convert', (req, res) => {
    let { input } = req.query

    const initNum = convertHandler.getNum(input)
    let initUnit = convertHandler.getUnit(input)
    if ( initUnit === 'l') {
      initUnit = 'L'
    }
    if (convertHandler.spellOutUnit(initUnit) === 'invalid unit' && isNaN(initNum) ) {
      return res.send('invalid number and unit')
    }

    if (convertHandler.spellOutUnit(initUnit) === 'invalid unit') {
      return res.send('invalid unit')
    }

    if (isNaN(initNum)) {
      return res.send('invalid number')
    }

    let returnNum = convertHandler.convert(initNum, initUnit).toFixed(5)
    const returnUnit = convertHandler.getReturnUnit(initUnit)

    const string = convertHandler.getString(initNum, initUnit, returnNum, returnUnit)
    return res.json({
      initNum,
      initUnit,
      returnNum,
      returnUnit,
      string,
    })
  })
};
