const chai = require('chai');
let assert = chai.assert;
const ConvertHandler = require('../controllers/convertHandler.js');

let convertHandler = new ConvertHandler();

suite('Unit Tests', function(){
  test('convertHandler should correctly read a whole number input.', function() {
    assert.isFinite(convertHandler.getNum('1mi'), "convertHandler couldn't correctly read a whole number input.")
  });

  test('convertHandler should correctly read a decimal number input.', function() {
    assert.isFinite(convertHandler.getNum('1.2mi'), "convertHandler couldn't correctly read a decimal number input.")
  });

  test('convertHandler should correctly read a fractional input.', function() {
    assert.isFinite(convertHandler.getNum('2/3mi'), "convertHandler couldn't correctly read a fractional input.")
  });

  test('convertHandler should correctly read a fractional input with a decimal.', function() {
    assert.isFinite(convertHandler.getNum('2/3.6mi'), "convertHandler couldn't correctly read a fractional input with a decimal.")
  });

  test('convertHandler should correctly return an error on a double-fraction (i.e. 3/2/3).', function() {
    assert.instanceOf(convertHandler.getNum('2/3.6/3mi'), Error, "convertHandler couldn't correctly return an error on a double-fraction.")
  });

  test('convertHandler should correctly default to a numerical input of 1 when no numerical input is provided.', function() {
    assert.equal(1, convertHandler.getNum('mi'), "convertHandler couldn't correctly default to a numerical input of 1 when no numerical input is provided.")
  });

  test('convertHandler should correctly read each valid input unit.', function() {
    assert.equal('gal', convertHandler.getUnit('gal'), "convertHandler couldn't correctly read each valid input unit.")
    assert.equal('L', convertHandler.getUnit('2L'), "convertHandler couldn't correctly read each valid input unit.")
    assert.equal('mi', convertHandler.getUnit('3mi'), "convertHandler couldn't correctly read each valid input unit.")
    assert.equal('km', convertHandler.getUnit('4km'), "convertHandler couldn't correctly read each valid input unit.")
    assert.equal('lbs', convertHandler.getUnit('5lbs'), "convertHandler couldn't correctly read each valid input unit.")
    assert.equal('kg', convertHandler.getUnit('6kg'), "convertHandler couldn't correctly read each valid input unit.")
  });

  test('convertHandler should correctly return an error for an invalid input unit.', function() {
    assert.instanceOf(convertHandler.getUnit('ls'), Error, "convertHandler couldn't correctly return an error for an invalid input unit.")
  });

  test('convertHandler should return the correct return unit for each valid input unit.', function() {
    assert.equal('L', convertHandler.getReturnUnit('gal'), "convertHandler couldn't return the correct return unit for each valid input unit.")
    assert.equal('gal', convertHandler.getReturnUnit('L'), "convertHandler couldn't return the correct return unit for each valid input unit.")
    assert.equal('mi', convertHandler.getReturnUnit('km'), "convertHandler couldn't return the correct return unit for each valid input unit.")
    assert.equal('km', convertHandler.getReturnUnit('mi'), "convertHandler couldn't return the correct return unit for each valid input unit.")
    assert.equal('lbs', convertHandler.getReturnUnit('kg'), "convertHandler couldn't return the correct return unit for each valid input unit.")
    assert.equal('kg', convertHandler.getReturnUnit('lbs'), "convertHandler couldn't return the correct return unit for each valid input unit.")
  });

  test('convertHandler should correctly return the spelled-out string unit for each valid input unit.', function() {
    assert.equal('gallons', convertHandler.spellOutUnit('gal'), "convertHandler couldn't correctly return the spelled-out string unit for each valid input unit.")
    assert.equal('liters', convertHandler.spellOutUnit('L'), "convertHandler couldn't correctly return the spelled-out string unit for each valid input unit.")
    assert.equal('kilometers', convertHandler.spellOutUnit('km'), "convertHandler couldn't correctly return the spelled-out string unit for each valid input unit.")
    assert.equal('miles', convertHandler.spellOutUnit('mi'), "convertHandler couldn't correctly return the spelled-out string unit for each valid input unit.")
    assert.equal('kilograms', convertHandler.spellOutUnit('kg'), "convertHandler couldn't correctly return the spelled-out string unit for each valid input unit.")
    assert.equal('pounds', convertHandler.spellOutUnit('lbs'), "convertHandler couldn't correctly return the spelled-out string unit for each valid input unit.")
  });

  test('convertHandler should correctly convert gal to L.', function() {
    assert.equal('L', convertHandler.getReturnUnit('gal'), "convertHandler couldn't correctly convert gal to L.")
  });

  test('convertHandler should correctly convert L to gal.', function() {
    assert.equal('gal', convertHandler.getReturnUnit('L'), "convertHandler couldn't correctly convert L to gal.")
  });

  test('convertHandler should correctly convert mi to km.', function() {
    assert.equal('km', convertHandler.getReturnUnit('mi'), "convertHandler couldn't correctly convert mi to km.")
  });

  test('convertHandler should correctly convert km to mi.', function() {
    assert.equal('mi', convertHandler.getReturnUnit('km'), "convertHandler couldn't correctly convert km to mi.")
  });

  test('convertHandler should correctly convert lbs to kg.', function() {
    assert.equal('kg', convertHandler.getReturnUnit('lbs'), "convertHandler couldn't correctly convert lbs to kg.")
  });

  test('convertHandler should correctly convert kg to lbs.', function() {
    assert.equal('lbs', convertHandler.getReturnUnit('kg'), "convertHandler couldn't correctly convert kg to lbs.")
  });
});