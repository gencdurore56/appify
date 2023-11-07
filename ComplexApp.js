// Filename: ComplexApp.js
// Description: This code is a complex app that simulates a virtual online store.

// Declare a class for the virtual online store
class OnlineStore {
  constructor(name, location) {
    this.name = name;
    this.location = location;
    this.inventory = [];
  }

  // Method to add a product to the inventory
  addProduct(product) {
    this.inventory.push(product);
    console.log(`${product.name} has been added to the inventory.`);
  }

  // Method to remove a product from the inventory
  removeProduct(product) {
    this.inventory = this.inventory.filter((p) => p !== product);
    console.log(`${product.name} has been removed from the inventory.`);
  }

  // Method to display the inventory
  displayInventory() {
    console.log(`Inventory of ${this.name}:`);

    if (this.inventory.length === 0) {
      console.log("No products in inventory.");
    } else {
      this.inventory.forEach((product) => {
        console.log(`- ${product.name} (${product.price}$)`);
      });
    }
  }
}

// Declare a class for the products in the online store
class Product {
  constructor(name, price, description) {
    this.name = name;
    this.price = price;
    this.description = description;
  }
}

// Instantiate the virtual online store
const myStore = new OnlineStore("MyStore", "New York");

// Create some products
const product1 = new Product("Product 1", 50, "This is product 1");
const product2 = new Product("Product 2", 100, "This is product 2");
const product3 = new Product("Product 3", 75, "This is product 3");

// Add products to the inventory
myStore.addProduct(product1);
myStore.addProduct(product2);
myStore.addProduct(product3);

// Display the inventory
myStore.displayInventory();

// Remove a product from the inventory
myStore.removeProduct(product2);

// Display the updated inventory
myStore.displayInventory();