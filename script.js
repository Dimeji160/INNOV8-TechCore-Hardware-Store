//Load saved products from localStorage
 let cart = JSON.parse(localStorage.getItem("cart")) || [];
 //Find the cart items container
 const cartItems = document.querySelector("#cart-items");
 //Find the total items element
 const totalItems = document.querySelector("#total-items");
 //Find the delivery cost element
 const deliveryCost = document.querySelector("#delivery-cost");
 //Find the total cost element
 const totalCost = document.querySelector("#total-cost");
 //Find the Clear Cart button
 const clearCartButton = document.querySelector("#clear-cart-button");
  //Find the Checkout button
 const checkoutButton = document.querySelector("#checkout-button");
 // Find the delivery location selector
 const deliveryLocation = document.querySelector("#delivery-location");
 //Create a function to display cart products
 function updateCartDisplay() {
 //Check whether the cart container exists
 if (!cartItems) {
 return;
 }
 //Clear the previous cart display
 cartItems.innerHTML = "";
 //Start the total at zero
 let total = 0;
 //Loop through all products in the cart
 for (let i = 0; i < cart.length; i++) {
 //Create a paragraph for the product
 // STEP 1: Create a container for the cart product
 const item = document.createElement("div");
 item.className = "cart-product";
 //Create the product image
 const image = document.createElement("img");
 image.src = cart[i].image;
 image.alt = cart[i].name;
 //Set the image dimensions
 image.width = 100;
 image.height = 100;
 //Create the product details
 const details = document.createElement("p");
 details.textContent =
 cart[i].name + " - ₦" +
 cart[i].price.toLocaleString("en-NG");
 //Add the image and details to the container
 item.appendChild(image);
 item.appendChild(details);
 //Create the Remove button
 const removeButton = document.createElement("button");
 //Add text to the button
 removeButton.textContent = "Remove";
 //Give the button a CSS class
 removeButton.className = "remove-button";
 //Listen for a click on the Remove button
 removeButton.addEventListener("click", function() {
 //Remove only the selected product
 cart.splice(i, 1);
 //Save the updated cart
 localStorage.setItem("cart", JSON.stringify(cart));
 //Refresh the cart display and totals
 updateCartDisplay();
 });
 //Add the Remove button beside the product
 item.appendChild(removeButton);
 //Display the product inside the cart
  cartItems.appendChild(item);
 //Add the product price to the total
 total = total + cart[i].price;
 }
 //Display the number of products
 if (totalItems) {
 totalItems.textContent = cart.length;
 }
 //Read the delivery charge
 const delivery = deliveryCost
 ? Number(deliveryCost.textContent.replace(/[₦,]/g, ""))
 : 0;
 //Calculate the final total
 let finalTotal = total + delivery;
 //Show zero when the cart is empty
 if (cart.length === 0) {
 finalTotal = 0;
 }
 //Display the final total
 if (totalCost) {
 totalCost.textContent =
 "₦" + finalTotal.toLocaleString("en-NG");
 }
 }
 //Register the Clear Cart button event
  if (clearCartButton) {
 //Listen for a click on the button
 clearCartButton.addEventListener("click", function() {
 //Empty the cart array
 cart = [];
 //Remove saved products from localStorage
 localStorage.removeItem("cart");
 //Refresh the cart display and totals
 updateCartDisplay();
 //Confirm the action in the Console
 console.log("Cart cleared successfully!");
 });
 }
 //Select all Add to Cart buttons
 const addToCartButtons = document.querySelectorAll(".add-to-cart");
 //Loop through each Add to Cart button
 addToCartButtons.forEach(function(button) {
 //Listen for a click
 button.addEventListener("click", function() {
 //Find the product card
 const productCard = button.closest(".product-card");
 //Get the product name
 const productName =
 productCard.querySelector("h3").textContent;
 //Get the product price
 const productPrice =
 productCard.querySelector(".price").textContent;
 //Convert the price into a number
 const price = Number(
 productPrice.replace(/[₦,]/g, "")
 );
  //Find the product image
 const productImage = productCard.querySelector("img").getAttribute("src");

 //reate a product object
 const product = {
 name: productName,
 price: price,
 image: productImage
 };

 //Add the product to the cart array
 cart.push(product);
 //Save the updated cart
 localStorage.setItem("cart", JSON.stringify(cart));
 //Display the cart in the Console
 console.log(cart);
 //Start the total at zero
 let total = 0;
 //Add the prices of all products
 for (let i = 0; i < cart.length; i++) {
 total = total + cart[i].price;
 }
 //Display the total in the Console
 console.log(
 "Total Price: ₦" +
 total.toLocaleString("en-NG")
 );
 //Refresh the cart display if available
 updateCartDisplay();
 });
 });
 //Display saved products when the page opens
 updateCartDisplay();
 // STEP 1: Check whether the Checkout button exists
 if (checkoutButton) {
 // STEP 2: Listen for a click
 checkoutButton.addEventListener("click", function() {
 // STEP 3: Check whether the cart is empty
 if (cart.length === 0) {
 alert("Your cart is empty. Please add a product first.");
 return;
 }
 // STEP 4: Open the checkout page
 window.location.href = "checkout.html";
 });
 }
 //Update total when delivery location changes
 if (deliveryLocation) {
 deliveryLocation.addEventListener("change", function() {
 updateCheckoutSummary();
 }); 
 }
 // Calculate and display the checkout order summary
 function updateCheckoutSummary() {
 const checkoutItems = document.querySelector("#checkout-items");
 const checkoutSubtotal = document.querySelector("#checkout-subtotal");
 const checkoutDelivery = document.querySelector("#checkout-delivery");
 const orderTotal = document.querySelector("#order-total");
 // Stop if this is not the checkout page
 if (!checkoutItems) {
 return;
 }
 // Display the products in the order
 checkoutItems.innerHTML = "";
 let subtotal = 0;
 for (let i = 0; i < cart.length; i++) {
 const item = document.createElement("p");
 item.textContent =
 cart[i].name + " - ₦" +
 cart[i].price.toLocaleString("en-NG");
 checkoutItems.appendChild(item);
 subtotal = subtotal + cart[i].price;
 }
 // Read the selected delivery charge
 const delivery = deliveryLocation
 ? Number(deliveryLocation.value)
 : 0;
 // Calculate the final amount
 const finalTotal = cart.length === 0
 ? 0
 : subtotal + delivery; 
 // Display the amounts
 if (checkoutSubtotal) {
 checkoutSubtotal.textContent =
 "₦" + subtotal.toLocaleString("en-NG");
 }
 if (checkoutDelivery) {
 checkoutDelivery.textContent =
 "₦" + delivery.toLocaleString("en-NG");
 }
 if (orderTotal) {
 orderTotal.textContent =
 "₦" + finalTotal.toLocaleString("en-NG");
 }
 }
 //Display order summary when page opens
 updateCheckoutSummary();
 //Find the checkout form
 const checkoutForm = document.querySelector("#checkout-form");
 // STEP 18: Check whether the form exists
 if (checkoutForm) {
 checkoutForm.addEventListener("submit", function(event) {
 event.preventDefault();
 console.log("Place Order button clicked!");
 });
 }