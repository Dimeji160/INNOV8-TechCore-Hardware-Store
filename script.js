 /* ==================================================
 SECTION 1: CART ARRAY AND LOCAL STORAGE
 ================================================== */
 // Load saved products from Local Storage
 let cart = JSON.parse(localStorage.getItem("cart")) || [];
 /* ==================================================
 SECTION 2: HTML ELEMENT SELECTORS
 ================================================== */
 // Cart page elements
 const cartItems = document.querySelector("#cart-items");
 const totalItems = document.querySelector("#total-items");
 const deliveryCost = document.querySelector("#delivery-cost");
 const totalCost = document.querySelector("#total-cost");
 // Cart buttons
 const clearCartButton = document.querySelector("#clear-cart-button");
 const checkoutButton = document.querySelector("#checkout-button");
 // Checkout delivery selector
 const deliveryLocation = document.querySelector("#delivery-location");

 /* ==================================================
 SECTION 3: DISPLAY CART PRODUCTS AND CALCULATE TOTAL
 ================================================== */
 function updateCartDisplay() {
 // Stop if this is not the cart page
 if (!cartItems) {
 return;
 }
 // Clear the previous cart display
 cartItems.innerHTML = "";
 // Start the total at zero
 let total = 0;
 // Loop through every product in the cart
 for (let i = 0; i < cart.length; i++) {
 // Create a container for the product
 const item = document.createElement("div");
 item.className = "cart-product";
 // Create the product image
 const image = document.createElement("img");
 image.src = cart[i].image;
 image.alt = cart[i].name;
 image.width = 100;
 image.height = 100;
 // Create the product name and price
 const details = document.createElement("p");
 details.textContent =
 cart[i].name + " - ₦" +
 cart[i].price.toLocaleString("en-NG");
 // Add the image and details to the container
 item.appendChild(image);
 item.appendChild(details);
 // Create the Remove button
 const removeButton = document.createElement("button");
 removeButton.textContent = "Remove";
 removeButton.className = "remove-button";
 // Remove the selected product
 removeButton.addEventListener("click", function() {
 cart.splice(i, 1);
 // Save the updated cart
 localStorage.setItem("cart", JSON.stringify(cart));
 // Refresh products and totals
 updateCartDisplay();
 });
 // Add the Remove button to the product container
 item.appendChild(removeButton);
 // Display the product on the cart page
 cartItems.appendChild(item);
 // Add the product price to the total
 total = total + cart[i].price;
 }
 // Display the number of products
 if (totalItems) {
 totalItems.textContent = cart.length;
 }
 // Read the delivery charge on the cart page
 const delivery = deliveryCost ? Number(deliveryCost.textContent.replace(/[₦,]/g, "")) : 0;
 // Calculate the final total
 let finalTotal = total + delivery;
 // Keep the total at zero if the cart is empty
 if (cart.length === 0) {
 finalTotal = 0;
 }
 // Display the final total
 if (totalCost) {
 totalCost.textContent = "₦" + finalTotal.toLocaleString("en-NG");
 }
 } //close updatecartdisplay 

 /* ==================================================
 SECTION 4: CLEAR CART BUTTON
 ================================================== */
 if (clearCartButton) {
 clearCartButton.addEventListener("click", function() {
 // Empty the cart array
 cart = [];
 // Remove saved products from Local Storage
 localStorage.removeItem("cart");
 // Refresh the cart display and totals
 updateCartDisplay();
 });
 } 

 /* ==================================================
 SECTION 5: ADD TO CART BUTTONS
 ================================================== */
 // Select all Add to Cart buttons
 const addToCartButtons = document.querySelectorAll(".add-to-cart");
 // Listen for clicks on each button
 addToCartButtons.forEach(function(button) {
 button.addEventListener("click", function() {
 // Find the product card
 const productCard = button.closest(".product-card");
 // Get the product name
 const productName = productCard.querySelector("h3").textContent;
 // Get the product price
 const productPrice = productCard.querySelector(".price").textContent;
 // Convert the price into a number
 const price = Number(productPrice.replace(/[₦,]/g, "")
 );
 // Get the product image path
 const productImage = productCard.querySelector("img").getAttribute("src");
 // Create the product object
 const product = {
 name: productName,
 price: price,
 image: productImage
 };
 // Add the product object to the cart array
 cart.push(product);
 // Save the updated cart in Local Storage
 localStorage.setItem("cart", JSON.stringify(cart));
 // Refresh the cart display
 updateCartDisplay();
 });
 });

 /* ==================================================
 SECTION 6: CHECKOUT BUTTON
 ================================================== */
 if (checkoutButton) {
 checkoutButton.addEventListener("click", function() {
 // Check whether the cart is empty
 if (cart.length === 0) {
 alert("Your cart is empty. Please add a product first.");
 return;
 }
 // Open the checkout page
 window.location.href = "checkout.html";
 });
 }

 /* ==================================================
 SECTION 7: DELIVERY LOCATION CHANGE
 ================================================== */
 // Update the checkout summary when delivery changes
 if (deliveryLocation) {
 deliveryLocation.addEventListener("change", function() {
 updateCheckoutSummary();
 });
 }

 /* ==================================================
 SECTION 8: CHECKOUT SUMMARY AND TOTAL CALCULATION
 ================================================== */
 function updateCheckoutSummary() {
 // Find checkout page elements
 const checkoutItems = document.querySelector("#checkout-items");
 const checkoutSubtotal = document.querySelector("#checkout-subtotal");
 const checkoutDelivery = document.querySelector("#checkout-delivery");
 const orderTotal = document.querySelector("#order-total");
 // Stop if this is not the checkout page
 if (!checkoutItems) {
 return;
 }
 // Clear the previous order summary
 checkoutItems.innerHTML = "";
 // Start the subtotal at zero
 let subtotal = 0;
 // Display each product in the order
 for (let i = 0; i < cart.length; i++) {
 const item = document.createElement("p");
 item.textContent =
 cart[i].name + " - ₦" +
 cart[i].price.toLocaleString("en-NG");
 checkoutItems.appendChild(item);
 // Add the product price to the subtotal
 subtotal = subtotal + cart[i].price;
 }
 // Get the selected delivery charge
 const delivery = deliveryLocation ? Number(deliveryLocation.value) : 0;
 // Calculate the final amount
 const finalTotal = cart.length === 0 ? 0 : subtotal + delivery;
 // Display the subtotal
 if (checkoutSubtotal) {
 checkoutSubtotal.textContent = "₦" + subtotal.toLocaleString("en-NG");}
 // Display the delivery charge
 if (checkoutDelivery) {
 checkoutDelivery.textContent = "₦" + delivery.toLocaleString("en-NG");
 }
 // Display the final order total
 if (orderTotal) {
 orderTotal.textContent = "₦" + finalTotal.toLocaleString("en-NG");}
 }

 /* ==================================================
 SECTION 9: INITIAL PAGE DISPLAY
 ================================================== */
 // Display saved cart products when the page opens
 updateCartDisplay();
 // Display the saved order summary when checkout opens
 updateCheckoutSummary();

 /* ==================================================
 SECTION 10: CHECKOUT FORM
 ================================================== */
 // Find the checkout form
 const checkoutForm = document.querySelector("#checkout-form");
 // Handle form submission
 if (checkoutForm) {
 checkoutForm.addEventListener("submit", function(event) {
 // Prevent the page from reloading
 event.preventDefault();
 // Place Order functionality will be added here
 });
 }