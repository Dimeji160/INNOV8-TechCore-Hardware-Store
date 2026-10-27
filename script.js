 /* ==================================================
 SECTION 1: CART ARRAY AND LOCAL STORAGE
 ================================================== */

 // Load saved products from Local Storage
 let cart = JSON.parse(localStorage.getItem("cart")) || [];
 
 /* ==================================================
 SECTION 2: HTML ELEMENT SELECTORS
 ================================================== */

 // Cart page elements
 //Finds the HTML container where the list of products in the cart will be written to the screen 
 const cartItems = document.querySelector("#cart-items");
 //Finds the text elements that displays the total count of items.
 const totalItems = document.querySelector("#total-items");
 //Finds the text element meant to display the calculated shipping fee.
 const deliveryCost = document.querySelector("#delivery-cost");
 //Finds the text element that display the grand total price 
 const totalCost = document.querySelector("#total-cost");

 // Cart buttons
 //Finds the "Cart" or "Empty Cart" button 
 const clearCartButton = document.querySelector("#clear-cart-button");
 //Finds the primary button users click to go to the checkout page or complete their purchase
 const checkoutButton = document.querySelector("#checkout-button");

 // Checkout delivery selector
 //Finds the dropdown menu or input field where the user selects their state/location for delivery 
 const deliveryLocation = document.querySelector("#delivery-location");

 //Finds the popup overlay that shows up when something goes wrong (like clicking checkout with an empty cart)
 const cartModal = document.querySelector("#cart-modal");
 //Finds the "X" or close button inside that specific cart warning popup 
 const closeModal = document.querySelector("#close-modal");

 // Order success modal
 //Finds the final success popup container that appears after an ordeer is successfully placed. 
 const successModal = document.querySelector("#success-modal");
 //Finds the specific text slot inside the success popup where the chosen payment method name will be inserted.
 const modalPaymentMethod = document.querySelector("#modal-payment-method");
 //Finds the "OK" or close button inside the final success popup.
 const closeSuccessModal = document.querySelector("#close-success-modal");

 /* ==================================================
 SECTION 3: DISPLAY CART PRODUCTS AND CALCULATE TOTAL
 ================================================== */
 //Declares the reusable JavaScript function responsible for refreshing the shopping cart interface.
 function updateCartDisplay() {

 // Stop if this is not the cart page
 //Checks if the cart container element (#cart-items) is missing from the current page if it is missing, it exits the function immediately to prvent errors.
 if (!cartItems) {
 return;
 }

 // Clear the previous cart display
 //Clears out all old products and text currently visible inside the cart list, ensuring the interface resets completely before rebuilding it. 
 cartItems.innerHTML = "";

 // Show a message if the cart is empty
 //Checks if the cart arrays contains zero items.
 if (cart.length === 0) {
 //Creates a new, empty HTML paragraph element(<p>) in the browser's memory.
 const emptyMessage = document.createElement("p");
 //Fills that paragraph with a helpful reminder message for the shopper.
 emptyMessage.textContent = "Your cart is empty. Start shopping!";
 //Injects the empty message directly into the cart container so the user can see it.
 cartItems.appendChild(emptyMessage);
 }

 // Start the total at zero
 //Creates a flexible mathematical variable named total and sets it to zero to act as a running tally for item prices.
 let total = 0;

 // Loop through every product in the cart
 //Starts a loop that goes through your cart array one product at a time, starting at index 0 and finisging at the last time.
 for (let i = 0; i < cart.length; i++) {

 // Create a container for the product
 //Creates a new HTML container block (<div>) to hold all the info for a single product. 
 const item = document.createElement("div");
 //Assigns the CSS class name "cart-product" to this container so your style can align it neatly.
 item.className = "cart-product";

 // Create the product image
 //Creates a new HTML image element (<img>).
 const image = document.createElement("img");
 //Sets the image source to the file paath link saved in your cart array.
 image.src = cart[i].image;
 //Adds accessibility text (alt text) matching the product's name.
 image.alt = cart[i].name;
 //Forces the item photo to render at a consistent, square bounding size of 100x100 pixels
 image.width = 100;
 image.height = 100;

 // Create the product name and price
 //Creates a paragraph elements (<p>) to hold text details 
 const details = document.createElement("p");
 //Assembles the product name and price string, formatting the number using Nigerian Naira comma separations 
 details.textContent = cart[i].name + " - ₦" + cart[i].price.toLocaleString("en-NG");

 // Add the image and details to the container
 //Injects the product image and text details right inside the main items container box.
 item.appendChild(image);
 item.appendChild(details);

 // Create the Remove button
 //Creates an interactive button elements 
 const removeButton = document.createElement("button");
 //Sets the buttons visible text label to "Remove". 
 removeButton.textContent = "Remove";
 //Gives the button a specific CSS class name for styling purposes  
 removeButton.className = "remove-button";

 // Remove the selected product
 //Attaches a click event listener specifically to this item's remove button.
 removeButton.addEventListener("click", function() {
 //Deletes exactly 1 item from the cart array at the current position index (i).
 cart.splice(i, 1);

 // Save the updated cart
 //Converts the newly updated array into text and saves it back to the browser storage so the removal persists.
 localStorage.setItem("cart", JSON.stringify(cart));

 // Refresh products and totals
 //Calls updateCartDisplay again right away to instantly refresh the screen and remove the item from view.
 updateCartDisplay();
 });

 // Add the Remove button to the product container
 //Places the remove button inside the product card layout box.
 item.appendChild(removeButton);

 // Display the product on the cart page
 //Appends the complete single product element box into the visible #cart-items container on the webpage.
 cartItems.appendChild(item);

 // Add the product price to the total
 //Adds the current product's price to the running math total.
 total = total + cart[i].price;
 }

 // Display the number of products
 //Checks if your cart count badge element exists, and updates it with the exact number of items left in the array.
 if (totalItems) {
 totalItems.textContent = cart.length;
 }

 // Read the delivery charge on the cart page
 // //Looks at your delivery cost text layout. If it exists, it strips away currency symbols or commas, converting the remaining string into a pure number; otherwise, it treats delivery as 0.
 const delivery = deliveryCost ? Number(deliveryCost.textContent.replace(/[₦,]/g, "")) : 0;

 // Calculate the final total
 //Calculates the grand total by adding the total price of all items to the delivery fee.
 let finalTotal = total + delivery;

 // Keep the total at zero if the cart is empty
 //Privides a fallback rule: if the cart is completely empty, override the calculation and force the grand total to become zero 
 if (cart.length === 0) {
 finalTotal = 0;
 }

 // Display the final total
 //Checks if the grand total text container exists, and formats the numeric total with Nigerian formatting to display it securely 
 if (totalCost) {
 totalCost.textContent = "₦" + finalTotal.toLocaleString("en-NG");
 }
 } //close updatecartdisplay 

 /* ==================================================
 SECTION 4: CLEAR CART BUTTON
 ================================================== */
 //Checks if the "Clear Cart" button actually exists on the page to prevent JavaScript errors.
 if (clearCartButton) {
 //Tells the browser to watch for a click on the "Clear Cart" button and runs the cleanup code inside the moment it is clicked.
 clearCartButton.addEventListener("click", function() {

 // Empty the cart array
 //Empties out your active JavaScript memory by resetting your cart variable back to a brand-new, empty array.
 cart = [];

 // Remove saved products from Local Storage
 //Deletes the saved cart data completely from the browser's persistent storage so the items don't reappear if the user reloads the page.
 localStorage.removeItem("cart");

 // Refresh the cart display and totals
 //• Calls your UI function to instantly refresh the screen, removing all items and resetting the visual counters back to zero.
 updateCartDisplay();
 });
 } 

 /* ==================================================
 SECTION 5: ADD TO CART BUTTONS
 ================================================== */

 // Select all Add to Cart buttons
 //Finds every single button on the page that has the class .add-to-cart and stores them in a list.
 const addToCartButtons = document.querySelectorAll(".add-to-cart");

 // Listen for clicks on each button
 //Loops through each of those buttons one by one so it can apply the click listener to all of them.
 addToCartButtons.forEach(function(button) {
 //Tells the browser to listen for a click on the specific button that was pressed and runs the function inside.
 button.addEventListener("click", function() {

 // Find the product card
 //Looks upwards in the HTML structure to find the main outer container (card) that holds this specific product's info.
 const productCard = button.closest(".product-card");

 // Get the product name
 //Finds the heading (<h3>) inside that product card and grabs the text, which is the name of the product.
 const productName = productCard.querySelector("h3").textContent;

 // Get the product price
 //Finds the element with the class .price inside that card and grabs its raw text value (e.g., "₦1,500").
 const productPrice = productCard.querySelector(".price").textContent;

 // Convert the price into a number
 //Cleans up the price text by stripping out the Currency symbol (₦) and commas (,), then converts the remaining string into a clean mathematical number (e.g., 1500).
 const price = Number(productPrice.replace(/[₦,]/g, "")
 );

 // Get the product image path
 //Finds the product image inside the card and grabs its file path link (source url).
 const productImage = productCard.querySelector("img").getAttribute("src");

 // Create the product object
 //Creates a structured JavaScript object containing all the scraped details for this specific product.
 const product = {
 name: productName,
 price: price,
 image: productImage
 };

 // Add the product object to the cart array
 //Adds this new product object directly into your active cart array.
 cart.push(product);

 // Save the updated cart in Local Storage
 //Converts the updated cart array into a text string and saves it permanently into the browser storage so it doesn't vanish on page refresh.
 localStorage.setItem("cart", JSON.stringify(cart));

 // Refresh the cart display
 //Calls your UI function to instantly refresh the numbers and items shown in the shopping cart on the user's screen.
 updateCartDisplay();

 // Tell the customer the product was added 
 //Changes the text on the clicked button right away to give the user immediate visual confirmation.
 button.textContent = "✓ Added to Cart";
 //• Waits for exactly 2 seconds (2000 milliseconds) and then reverts the button text back to its original "Add to Cart" state.
 setTimeout(function() {
 button.textContent = "Add to Cart";
 }, 2000);
 });
 });

 /* ==================================================
 SECTION 6: CHECKOUT BUTTON
 ================================================== */
 //Checks if the checkout button exists on the current page so the code doesn't crash on pages without it.
 if (checkoutButton) 
 //Tells the browser to listen for a click on the checkout button and runs the code inside when clicked.
 checkoutButton.addEventListener("click", function() {
 //Checks if the shopping cart array is completely empty.
 if (cart.length === 0) {
 //Checks if the cart modal popup element exists on the page.
 if (cartModal) {
 //Opens and displays the cart modal popup on the screen (likely to show the user that their cart is empty).
 cartModal.style.display = "flex";
 }
 //Stops the execution of the function immediately right here, blocking the user from proceeding to the checkout page since the cart is empty.
 return;
 }
 //Redirects the user's browser to the checkout.html page (this only runs if the cart has items in it).
 window.location.href = "checkout.html";
 });
 // Close the empty cart modal
 //Checks if the modal's close button (like an "X" or "Close" button) exists on the current page to prevent errors.
 if (closeModal) { closeModal.addEventListener("click", function() {
 //Changes the CSS of the cart modal to hidden, making the popup window instantly disappear from the user's screen.
 cartModal.style.display = "none";
 });
 }

 /* ==================================================
 SECTION 7: DELIVERY LOCATION CHANGE
 ================================================== */
 // Update the checkout summary when delivery changes
 //Checks if the delivery location dropdown or selection element exists on the page to prevent errors.
 if (deliveryLocation) {
 //Tells the browser to listen for when the user chooses or switches to a different location in the dropdown menu.
 deliveryLocation.addEventListener("change", function() {
 //• Immediately calls your summary function to recalculate the delivery fee and update the grand total on screen the moment the user selects a new location.
 updateCheckoutSummary();
 });
 }

 /* ==================================================
 SECTION 8: CHECKOUT SUMMARY AND TOTAL CALCULATION
 ================================================== */
 //Declares (creates) the reusable JavaScript function named updateCheckoutSummary.
 function updateCheckoutSummary() {
 // Find checkout page elements
 //Finds the HTML element (usually a <div> or <ul>) where the list of products in the checkout will be displayed.
 const checkoutItems = document.querySelector("#checkout-items");
 //Finds the HTML text element designated for displaying the cost of the items before delivery fees and taxes.
 const checkoutSubtotal = document.querySelector("#checkout-subtotal");
 //Finds the HTML text element designated for displaying the shipping or delivery cost.
 const checkoutDelivery = document.querySelector("#checkout-delivery");
 //Finds the HTML text element designated for displaying the final total amount the user has to pay.
 const orderTotal = document.querySelector("#order-total");
 // Stop if this is not the checkout page
 //Checks if the main container for the checkout items (#checkout-items) is missing from the current webpage.
 if (!checkoutItems) {
 //Stops the function immediately and exits if that item container wasn't found, preventing errors on pages that don't display a checkout summary.
 return;
 }
 // Clear the previous order summary
 //• Clears out any old text or HTML inside the checkout container so you don't accidentally double-count or stack items on screen when the cart updates.
 checkoutItems.innerHTML = "";
 // Start the subtotal at zero
 //• Creates a flexible math variable named subtotal and starts it at zero to prepare for calculating the combined price of all products.
 let subtotal = 0;
 // Display each product in the order
 //• Starts a loop that goes through your cart array one item at a time, beginning at index 0 and running until it hits the end of the array.
 for (let i = 0; i < cart.length; i++) {
 //Creates a brand-new, empty HTML paragraph element (<p>) in the browser memory for the current product.
 const item = document.createElement("p");
 //• Sets the text inside that new paragraph to show the item's name followed by its price, formatting the currency with commas (e.g., ₦1,500) specifically for Nigerian Naira presentation styles.
 item.textContent = cart[i].name + " - ₦" + cart[i].price.toLocaleString("en-NG");
 //• Injects the newly created paragraph element directly onto your webpage inside the main checkout container so the customer can see it.
 checkoutItems.appendChild(item);
 // Add the product price to the subtotal
 //• Takes the current item's price and adds it to your running total variable, updating the math score for the whole order.
 subtotal = subtotal + cart[i].price;
 }
 // Get the selected delivery charge
 //Checks if a delivery location selection element exists. If it does, it converts its value into a number (the shipping fee); if it doesn't exist, it sets the delivery fee to 0.
 const delivery = deliveryLocation ? Number(deliveryLocation.value) : 0;
 // Calculate the final amount
 //Calculates the grand total. If the cart is empty, the total is set to 0; otherwise, it adds the subtotal and the delivery fee together.
 const finalTotal = cart.length === 0 ? 0 : subtotal + delivery;
 // Display the subtotal
 //Checks if the subtotal text element exists on your webpage to avoid JavaScript errors.
 if (checkoutSubtotal) {checkoutSubtotal.textContent = "₦" + subtotal.toLocaleString("en-NG");}
 // Display the delivery charge
 if (checkoutDelivery) {checkoutDelivery.textContent = "₦" + delivery.toLocaleString("en-NG");
 }
 // Display the final order total
 if (orderTotal) {orderTotal.textContent = "₦" + finalTotal.toLocaleString("en-NG");}
 }

 /* ==================================================
 SECTION 9: INITIAL PAGE DISPLAY
 ================================================== */
 // Display saved cart products when the page opens
 updateCartDisplay();
 // Display the saved order summary when checkout opens
 updateCheckoutSummary();

 /* ==================================================
 SECTION 10: PLACE ORDER 
 ================================================== */
 //Looks through the webpage's HTML to find the checkout form element with the ID checkout-form and saves it to a constant variable.
 const checkoutForm = document.querySelector("#checkout-form");
 //Checks if the form was actually found on the page to prevent JavaScript errors if you are on a page without a checkout form.
 if (checkoutForm) {
 //Tells the browser to listen for when the user tries to submit the form (by clicking a "Submit" or "Place Order" button) and passes the submit event data into the function.
 checkoutForm.addEventListener("submit", function(event) {
 //Stops the default browser behavior, which prevents the page from automatically refreshing or reloading when the form is submitted.
 event.preventDefault();
 //• Searches the form for whichever radio button in the "payment" group is currently selected/ticked by the user and saves it.
 const paymentMethod = document.querySelector('input[name="payment"]:checked');
 // Check whether the cart is empty
 //Checks if the number of items inside your cart array is exactly zero, meaning the shopping cart is completely empty.
 if (cart.length === 0) {
 //Pops up a native browser alert window with this text message to warn the user that they cannot check out without items.
 alert("Your cart is empty. Please add a product first.");
 //• Stops the execution of the entire function immediately right here, blocking the user from proceeding to payment or order placement.
 return;
 }
 // Check whether a payment method was selected
 //Checks if the paymentMethod element or value is missing, empty, or false (the exclamation mark ! means "not" or "is empty").
 if (!paymentMethod) {
 //Pops up a native browser alert window with this text message to warn the user they forgot to choose a payment option.
 alert("Please select a payment method.");
 //• Stops the entire function immediately right here, preventing the code below it (like placing the order or showing the success modal) from running until the user selects a method.
 return;
 }
 // Show the selected payment method in the modal
 //Checks if both the text element inside the modal (modalPaymentMethod) and the modal container (successModal) exist on the page to prevent errors.
 if (modalPaymentMethod && successModal) {
 //Grabs the value the user selected (like "Credit Card" or "PayPal") from a form input and inserts it as plain text into the modal.
 modalPaymentMethod.textContent = paymentMethod.value;
 //• Changes the CSS of the modal container to display: "flex", which makes the popup appear on the screen and uses Flexbox to align its contents beautifully (usually centering it).
 successModal.style.display = "flex";
 }
 // Clear the cart after placing the order
 //Resets your local JavaScript variable back to a brand-new, empty array.
 cart = [];
 //Deletes the saved cart string completely from the browser's persistent web Storage object.
 localStorage.removeItem("cart");
 //Triggers your UI function to visually empty the cart items on the screen.
 updateCartDisplay();
 //• Triggers your UI function to recalculate the totals, taxes, and shipping back to zero.
 updateCheckoutSummary();
 });
 }
 // Close the success modal when OK is clicked
 //Checks if the "OK" button and the modal element exist on the page before doing anything else.
 if (closeSuccessModal && successModal) {
 //Tells the browser to listen for a click on the "OK" button and defines a function to run when it happens.
 closeSuccessModal.addEventListener("click", function() {
 //Changes the CSS of the modal to hidden so it instantly disappears from the user's screen.
 successModal.style.display = "none";
 });
 }