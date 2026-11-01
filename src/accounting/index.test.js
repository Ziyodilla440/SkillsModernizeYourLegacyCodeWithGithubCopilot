const { test, describe } = require('node:test');
const assert = require('node:assert');
const { AccountStorage, AccountOperations } = require('./index');

describe('Account Management System Tests', () => {
  test('TC-001: View Balance returns initial balance of 1000.00', () => {
    const ops = new AccountOperations();
    assert.strictEqual(ops.getBalance(), 1000.00);
  });

  test('TC-002: Credit Account increases balance correctly', () => {
    const ops = new AccountOperations();
    const result = ops.credit(150.00);
    assert.strictEqual(result.success, true);
    assert.strictEqual(result.newBalance, 1150.00);
    assert.strictEqual(ops.getBalance(), 1150.00);
  });

  test('TC-003: Debit Account decreases balance when sufficient funds exist', () => {
    const ops = new AccountOperations();
    const result = ops.debit(200.00);
    assert.strictEqual(result.success, true);
    assert.strictEqual(result.newBalance, 800.00);
    assert.strictEqual(ops.getBalance(), 800.00);
  });

  test('TC-004: Debit Account fails when insufficient funds', () => {
    const ops = new AccountOperations();
    const result = ops.debit(1500.00);
    assert.strictEqual(result.success, false);
    assert.strictEqual(result.message, 'Insufficient funds for this debit.');
    assert.strictEqual(ops.getBalance(), 1000.00);
  });

  test('TC-005: Boundary test with zero credit and debit', () => {
    const ops = new AccountOperations();
    const creditRes = ops.credit(0);
    assert.strictEqual(creditRes.success, true);
    assert.strictEqual(creditRes.newBalance, 1000.00);

    const debitRes = ops.debit(0);
    assert.strictEqual(debitRes.success, true);
    assert.strictEqual(debitRes.newBalance, 1000.00);
  });
});
