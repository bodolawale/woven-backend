import { expect } from 'chai';

describe('Simple Unit Test', () => {
  it('should be true', () => {
    expect(true).to.be.true;
  });

  it('should fail', () => {
    expect(true).to.be.false;
  });
});
