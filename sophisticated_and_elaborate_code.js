/* sophisticated_and_elaborate_code.js */
/* A complex program that implements a banking system */

// Definition of Bank class
class Bank {
  constructor(name) {
    this.name = name;
    this.customers = [];
  }

  addCustomer(customer) {
    this.customers.push(customer);
  }

  removeCustomer(customer) {
    const index = this.customers.indexOf(customer);
    if (index !== -1) {
      this.customers.splice(index, 1);
    }
  }

  listCustomers() {
    console.log(`Customers of ${this.name}:`);
    this.customers.forEach((customer) => {
      console.log(customer.name);
    });
  }
}

// Definition of Customer class
class Customer {
  constructor(name) {
    this.name = name;
    this.accounts = [];
  }

  openAccount(account) {
    this.accounts.push(account);
  }

  closeAccount(account) {
    const index = this.accounts.indexOf(account);
    if (index !== -1) {
      this.accounts.splice(index, 1);
    }
  }

  listAccounts() {
    console.log(`Accounts of ${this.name}:`);
    this.accounts.forEach((account) => {
      console.log(account);
    });
  }
}

// Definition of Account class
class Account {
  constructor(accountNumber, balance = 0) {
    this.accountNumber = accountNumber;
    this.balance = balance;
  }

  deposit(amount) {
    this.balance += amount;
    console.log(`Deposited ${amount} into account ${this.accountNumber}`);
  }

  withdraw(amount) {
    if (this.balance >= amount) {
      this.balance -= amount;
      console.log(`Withdrew ${amount} from account ${this.accountNumber}`);
    } else {
      console.log(`Insufficient funds in account ${this.accountNumber}`);
    }
  }
}

// Sample usage of the banking system
const myBank = new Bank("MyBank");

const customer1 = new Customer("John Doe");
const customer2 = new Customer("Jane Smith");

const account1 = new Account("123456", 5000);
const account2 = new Account("654321");

customer1.openAccount(account1);
customer1.openAccount(account2);

account1.withdraw(2000);
account2.deposit(3000);

myBank.addCustomer(customer1);
myBank.addCustomer(customer2);

myBank.listCustomers();
customer1.listAccounts();