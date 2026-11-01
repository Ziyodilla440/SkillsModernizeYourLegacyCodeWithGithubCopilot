const readline = require('readline');

class AccountStorage {
  constructor(initialBalance = 1000.0) {
    this.storageBalance = initialBalance;
  }

  read() {
    return this.storageBalance;
  }

  write(newBalance) {
    this.storageBalance = newBalance;
  }
}

class AccountOperations {
  constructor(storage = new AccountStorage()) {
    this.storage = storage;
  }

  getBalance() {
    return this.storage.read();
  }

  credit(amount) {
    const numAmount = parseFloat(amount);
    if (isNaN(numAmount) || numAmount < 0) {
      return { success: false, message: 'Invalid credit amount.' };
    }
    const current = this.storage.read();
    const newBalance = current + numAmount;
    this.storage.write(newBalance);
    return { success: true, newBalance };
  }

  debit(amount) {
    const numAmount = parseFloat(amount);
    if (isNaN(numAmount) || numAmount < 0) {
      return { success: false, message: 'Invalid debit amount.' };
    }
    const current = this.storage.read();
    if (current >= numAmount) {
      const newBalance = current - numAmount;
      this.storage.write(newBalance);
      return { success: true, newBalance };
    } else {
      return { success: false, message: 'Insufficient funds for this debit.' };
    }
  }
}

function promptQuestion(rl, question) {
  return new Promise(resolve => rl.question(question, resolve));
}

async function main() {
  const operations = new AccountOperations();
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });

  let continueFlag = true;

  while (continueFlag) {
    console.log('--------------------------------');
    console.log('Account Management System');
    console.log('1. View Balance');
    console.log('2. Credit Account');
    console.log('3. Debit Account');
    console.log('4. Exit');
    console.log('--------------------------------');

    const choice = (await promptQuestion(rl, 'Enter your choice (1-4): ')).trim();

    switch (choice) {
      case '1': {
        const balance = operations.getBalance();
        console.log(`Current balance: ${balance.toFixed(2)}`);
        break;
      }
      case '2': {
        const creditInput = await promptQuestion(rl, 'Enter credit amount: ');
        const result = operations.credit(creditInput);
        if (result.success) {
          console.log(`Amount credited. New balance: ${result.newBalance.toFixed(2)}`);
        } else {
          console.log(result.message);
        }
        break;
      }
      case '3': {
        const debitInput = await promptQuestion(rl, 'Enter debit amount: ');
        const result = operations.debit(debitInput);
        if (result.success) {
          console.log(`Amount debited. New balance: ${result.newBalance.toFixed(2)}`);
        } else {
          console.log(result.message);
        }
        break;
      }
      case '4': {
        continueFlag = false;
        break;
      }
      default:
        console.log('Invalid choice, please select 1-4.');
        break;
    }
  }

  console.log('Exiting the program. Goodbye!');
  rl.close();
}

if (require.main === module) {
  main();
}

module.exports = { AccountStorage, AccountOperations };
