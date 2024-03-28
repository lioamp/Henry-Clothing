// Function to remove a cart item
function removeCartItem(event) {
    // Get the parent container of the clicked button
    var cartItem = event.target.closest('.cart-item');
    
    // Extract the item price and quantity from the removed item
    var itemPrice = parseFloat(cartItem.querySelector('.card-text').textContent.split("$")[1].split(" ")[0]);
    var itemQuantity = parseInt(cartItem.querySelector('.card-text').textContent.split(" ")[1]);

    // Remove the cart item from the DOM
    cartItem.remove();
    
    // Update the cart items in localStorage after removal
    updateCartItemsInStorage();

    // Recalculate the total price after removing the item
    updateGrandTotal(-itemPrice * itemQuantity);
}

// Function to update the grand total
function updateGrandTotal(amount) {
    var grandTotalElement = document.getElementById("grandTotal");
    var currentTotal = parseFloat(grandTotalElement.textContent.split("$")[1]);
    var newTotal = currentTotal + amount;
    grandTotalElement.textContent = "Grand Total: $" + newTotal.toFixed(2);
}

function showToast() {
    var addToCartToast = new bootstrap.Toast(document.getElementById('addToCartToast'));
    addToCartToast.show();
}

// Function to handle adding items to the cart
function addToCart(event) {
    // Get the parent container of the clicked button
    var shopItem = event.target.closest('.shop-item');

    // Extract item details from the shopItem container
    var itemName = shopItem.querySelector('.item-name').textContent;
    var itemPrice = parseFloat(shopItem.querySelector('.item-price').textContent.replace('$', ''));
    var selectedSize = shopItem.querySelector('#size-select').value;
    var selectedQuantity = parseInt(shopItem.querySelector('.quantity-input').value);

    // Check if a size is selected
    if (selectedSize === "Select Size") {
        alert("Please select a size");
        return;
    }

    // Show the toast
    showToast();

    // Construct the item object
    var item = {
        name: itemName,
        price: itemPrice,
        size: selectedSize,
        quantity: selectedQuantity
    };

    // Add item to cart
    addItemToCart(item);

    // Update the cart items in localStorage after addition
    updateCartItemsInStorage();
}

// Function to add item to cart
function addItemToCart(item) {
    var cart = getCartItemsFromStorage();
    cart.push(item);
    saveCartItemsToStorage(cart);
    renderCart();
}

// Function to update cart items in localStorage
function updateCartItemsInStorage() {
    var cart = Array.from(document.querySelectorAll('.cart-item')).map(function(cartItem) {
        return {
            name: cartItem.querySelector('.card-title').textContent.split(" - ")[0],
            size: cartItem.querySelector('.card-title').textContent.split(" - ")[1].split(": ")[1],
            price: parseFloat(cartItem.querySelector('.card-text').textContent.split("$")[1].split(" ")[0]),
            quantity: parseInt(cartItem.querySelector('.card-text').textContent.split(" ")[1])
        };
    });
    saveCartItemsToStorage(cart);
}

// Function to save cart items to localStorage
function saveCartItemsToStorage(cart) {
    localStorage.setItem("cartItems", JSON.stringify(cart));
}

// Function to retrieve cart items from localStorage
function getCartItemsFromStorage() {
    var cart = localStorage.getItem("cartItems");
    return cart ? JSON.parse(cart) : [];
}

// Function to render cart items
function renderCart() {
    var cartContainer = document.getElementById("cartItems");
    cartContainer.innerHTML = "";
    var cart = getCartItemsFromStorage();
    var totalPrice = 0; // Variable to store the total price of all items in the cart
    cart.forEach(function(item) {
        var card = document.createElement("div");
        card.classList.add("card", "mb-2", "cart-item");

        var cardHeader = document.createElement("div");
        cardHeader.classList.add("card-header", "d-flex", "justify-content-between", "align-items-center");

        var cardTitle = document.createElement("h5");
        cardTitle.classList.add("card-title", "mb-0");
        cardTitle.textContent = item.name + " - Size: " + item.size;

        var removeButton = document.createElement("button");
        removeButton.classList.add("btn", "btn-close");
        removeButton.addEventListener('click', removeCartItem);

        cardHeader.appendChild(cardTitle);
        cardHeader.appendChild(removeButton);
        card.appendChild(cardHeader);

        var cardBody = document.createElement("div");
        cardBody.classList.add("card-body");

        var cardText = document.createElement("p");
        cardText.classList.add("card-text", "mb-0");
        cardText.textContent = "Quantity: " + item.quantity + " - Price: $" + (item.price).toFixed(2);

        cardBody.appendChild(cardText);
        card.appendChild(cardBody);

        cartContainer.appendChild(card);

        // Calculate the total price by adding the price of each item multiplied by its quantity
        totalPrice += item.price * item.quantity;
    });

    // Render grand total
    var grandTotalElement = document.getElementById("grandTotal");
    grandTotalElement.textContent = "Grand Total: $" + totalPrice.toFixed(2);
}

// Load cart items from localStorage when the page loads
document.addEventListener("DOMContentLoaded", function() {
    renderCart();
});

document.addEventListener('DOMContentLoaded', function() {
    var addToCartButton = document.getElementById('addToCartButton');
    addToCartButton.addEventListener('click', addToCart);
});