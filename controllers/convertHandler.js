const { init } = require("express/lib/application");
const { evaluate } = require('mathjs')

function ConvertHandler() {
  
  this.getNum = function(input) {
    const [, ...result] = input.match(/([\d.,/]*)([\s\S]*)/)
    const num = result.slice(0, result.length - 1).join('') || 1;
    if (num != 1 && num.split('/').length > 2 ) {
      return new Error("It's double fraction")
    }
    return evaluate(num)
  };
  
  this.getUnit = function(input) {
    const validUnits = ['gal', 'L', 'mi', 'km', 'lbs', 'kg']
    const [, ...result] = input.match(/([\d.,]*)([\s\S]*)/)
    let unit = result[ result.length - 1 ]

    if ( unit !== 'L') {
      unit = unit.toLowerCase()
    } else {
      unit = unit.toUpperCase()
    }

    if( !validUnits.includes(unit) ) {
      return new Error('invalid unit')
    }

    return unit
  };
  
  this.getReturnUnit = function(initUnit) {
    let result;
    switch (initUnit) {
      case 'gal':
        result = 'L'
        break
      case 'L':
        result = 'gal'
        break
      case 'lbs':
        result = 'kg'
        break
      case 'kg':
        result = 'lbs'
        break
      case 'mi':
        result = 'km'
        break
      case 'km':
        result = 'mi'
        break
      default:
        result = 'invalid unit'
    }
    return result;
  };

  this.spellOutUnit = function(unit) {
    let result;
    switch (unit) {
      case 'gal':
        result = 'gallons'
        break
      case 'L':
        result = 'liters'
        break
      case 'lbs':
        result = 'pounds'
        break
      case 'kg':
        result = 'kilograms'
        break
      case 'mi':
        result = 'miles'
        break
      case 'km':
        result = 'kilometers'
        break
      default:
        result = 'invalid unit'
    }
    return result;
  };
  
  this.convert = function(initNum, initUnit) {
    const galToL = 3.78541;
    const lbsToKg = 0.453592;
    const miToKm = 1.60934;
    let result;
    switch (initUnit) {
      case 'gal':
        result = initNum * galToL
        break
      case 'L':
        result = initNum / galToL
        break
      case 'lbs':
        result = initNum * lbsToKg
        break
      case 'kg':
        result = initNum / lbsToKg
        break
      case 'mi':
        result = initNum * miToKm
        break
      case 'km':
        result = initNum / miToKm
        break
      default:
        result = 'invalid number'
    }

    return result;
  };
  
  this.getString = function(initNum, initUnit, returnNum, returnUnit) {
    let result = `${initNum} ${this.spellOutUnit(initUnit)} converts to ${returnNum} ${this.spellOutUnit(returnUnit)}`;
    
    return result;
  };
  
}

module.exports = ConvertHandler;
