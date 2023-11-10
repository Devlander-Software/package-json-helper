
describe('isDeepEqual', () => {
    const buildPackage = require('../dist/cjs')
const {isDeepEqual} = buildPackage;
  it('should return true for two equal numbers', () => {
    expect(isDeepEqual(1, 1)).toBe(true);
  });

  it('should return false for two different numbers', () => {
    expect(isDeepEqual(1, 2)).toBe(false);
  });

  it('should return true for two equal strings', () => {
    expect(isDeepEqual('test', 'test')).toBe(true);
  });

  it('should return false for two different strings', () => {
    expect(isDeepEqual('test', 'jest')).toBe(false);
  });

  it('should return true for two identical objects', () => {
    const obj1 = { a: 1, b: { c: 2 } };
    const obj2 = { a: 1, b: { c: 2 } };
    expect(isDeepEqual(obj1, obj2)).toBe(true);
  });

  it('should return false for two different objects', () => {
    const obj1 = { a: 1, b: { c: 2 } };
    const obj2 = { a: 1, b: { c: 3 } };
    expect(isDeepEqual(obj1, obj2)).toBe(false);
  });

  it('should return true for two identical arrays', () => {
    expect(isDeepEqual([1, 2, 3], [1, 2, 3])).toBe(true);
  });

  it('should return false for two different arrays', () => {
    expect(isDeepEqual([1, 2, 3], [1, 2, 4])).toBe(false);
  });

  it('should return true for two null values', () => {
    expect(isDeepEqual(null, null)).toBe(true);
  });

  it('should return false for a null and an object', () => {
    expect(isDeepEqual(null, {})).toBe(false);
  });

  // Add more test cases as necessary
});
