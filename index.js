// 1. Store Details
let storeName = "Store ni Mark";
let storeLocation = "Metro Manila";
let storeCapacity = 230; // Maximum number of products the store can hold

// 2. Dynamic Product Inventory
let products = [
    { name: "Laptop", price: 18999, quantity: 50 },
    { name: "Smartphone", price: 9999, quantity: 100 },
    { name: "Tablet", price: 12999, quantity: 80 }
];

// 3. Inventory Validation
function checkInventoryCapacity() {
    let totalQuantity = products.reduce((total, product) => total + product.quantity, 0);
    if (totalQuantity > storeCapacity) {
        console.log("Warning: Store is over capacity!");
    } else if (totalQuantity === storeCapacity) {
        console.log("Store is at full capacity, cannot add new products.");
    } else {
        console.log("Store is within capacity.");
    }
}

// 4. Product Manipulation (Add & Remove Products Dynamically)
function addProduct(productName, price, quantity) {
    let totalQuantity = products.reduce((total, product) => total + product.quantity, 0);

    if (totalQuantity + quantity > storeCapacity) {
        console.log("Warning: Adding this product exceeds store capacity. Product not added.");
    } else {
        products.push({ name: productName, price: price, quantity: quantity });
        console.log(`Product ${productName} added successfully.`);
    }
    return products.reduce((total, product) => total + product.quantity, 0);
}

function removeProduct(productName, quantity) {
    let product = products.find(p => p.name === productName);
    
    if (product) {
        if (quantity > product.quantity) {
            console.log(`Error: Cannot remove ${quantity} units. Only ${product.quantity} units are available.`);
        } else {
            product.quantity -= quantity;
            console.log(`${quantity} units of ${productName} removed. Remaining quantity: ${product.quantity}`);
        }
    } else {
        console.log("Error: Product not found.");
    }
}

// 5. Most Expensive Product
function getMostExpensiveProduct() {
    let mostExpensive = products.reduce((prev, current) => (prev.price > current.price) ? prev : current);
    return mostExpensive;
}

// 6. Total Inventory Value
function calculateTotalInventoryValue() {
    return products.reduce((total, product) => total + (product.price * product.quantity), 0);
}

// 7. Automatic Restocking
function restockProduct(productName, threshold) {
    let product = products.find(p => p.name === productName);
    
    if (product && product.quantity < threshold) {
        product.quantity += 20;  // Restock 20 units
        console.log(`${productName} was restocked. New quantity: ${product.quantity}`);
    } else if (product) {
        console.log(`${productName} quantity is above the threshold.`);
    } else {
        console.log(`Product ${productName} not found.`);
    }
}

// Display Store Details and Stats
function displayStoreDetails() {
    console.log(`Store Name: ${storeName}`);
    console.log(`Store Location: ${storeLocation}`);

    let totalQuantity = products.reduce((total, product) => total + product.quantity, 0);
    let totalInventoryValue = calculateTotalInventoryValue();
    
    console.log(`Total Number of Products: ${totalQuantity}`);
    console.log(`Total Inventory Value: ${totalInventoryValue}`);
    
    let mostExpensiveProduct = getMostExpensiveProduct();
    console.log(`Most Expensive Product: ${mostExpensiveProduct.name}`);
    
    // Check if the store is at full capacity
    checkInventoryCapacity();
}

// Assuming the laptop quantity is updated somewhere in your code
function updateLaptopQuantity(newQuantity) {
    let laptop = products.find(p => p.name === "Laptop");
    if (laptop) {
        laptop.quantity = newQuantity;
        console.log(`Updated Laptop Quantity: ${laptop.quantity}`);
    }
}

// 8. User Interaction
let newProductName = prompt("Enter the name of the new product:");
let newProductPrice = parseFloat(prompt("Enter the price of the new product:"));
let newProductQuantity = parseInt(prompt("Enter the quantity of the new product:"));

addProduct(newProductName, newProductPrice, newProductQuantity);
console.log("Updated total inventory value: " + calculateTotalInventoryValue());

let removeProductConfirmation = prompt("Would you like to remove a product? (yes/no)").toLowerCase();
if (removeProductConfirmation === "yes") {
    let productNameToRemove = prompt("Enter the name of the product to remove:");
    let quantityToRemove = parseInt(prompt("Enter the quantity to remove:"));
    removeProduct(productNameToRemove, quantityToRemove);
    console.log("Updated total inventory value: " + calculateTotalInventoryValue());
}

// Example of invoking the functions to match the output format
displayStoreDetails();
updateLaptopQuantity(60);

// Restocking check for specific products
restockProduct("Laptop", 10); // Restocks Laptop if quantity is below 10
restockProduct("Smartphone", 10); // Restocks Smartphone if quantity is below 10
