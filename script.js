 // STEP 1: Create an empty cart array
 let cart = [];
 // STEP 2: Select all Add to Cart buttons
 const addToCartButtons = document.querySelectorAll(".add-to-cart");
 // STEP 3: Loop through each button
 addToCartButtons.forEach(function(button) {
 // STEP 4: Listen for a click
 button.addEventListener("click", function() {
 // STEP 5: Find the product card
 const productCard = button.closest(".product-card");
 // STEP 6: Get the product name
 const productName = productCard.querySelector("h3").textContent;
 // STEP 7: Get the product price
 const productPrice = productCard.querySelector(".price").textContent;
 // STEP 8: Convert the price into a number
 const price = Number(productPrice.replace(/[₦,]/g, ""));
 // STEP 9: Create a product object
 const product = {
 name: productName,
 price: price
 }
 // STEP 10: Add the product to the cart array
 cart.push(product);
 // STEP 11: Display the cart in the Console
 console.log(cart);
 // STEP 12: CALCULATE THE TOTAL PRICE  
 let total = 0;
 for (let i = 0; i < cart.length; i++){
 total = total + cart[i].price;
 }
 //DISPLAY THE TOTAL PRICE 
 console.log ("total price: ₦" + total.toLocaleString("en-NG"));
 });
 });