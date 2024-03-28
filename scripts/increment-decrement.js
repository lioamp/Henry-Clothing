document.addEventListener("DOMContentLoaded", function () {
    const decrementBtn = document.querySelector(".decrement-btn");
    const incrementBtn = document.querySelector(".increment-btn");
    const quantityInput = document.querySelector(".quantity-input");

    decrementBtn.addEventListener("click", function () {
        let currentValue = parseInt(quantityInput.value);
        if (currentValue > 1) {
            quantityInput.value = currentValue - 1;
        }
    });

    incrementBtn.addEventListener("click", function () {
        let currentValue = parseInt(quantityInput.value);
        let maxValue = parseInt(quantityInput.getAttribute("max"));
        if (currentValue < maxValue) {
            quantityInput.value = currentValue + 1;
        }
    });
});