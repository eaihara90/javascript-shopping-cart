const cartItemContainer = document.querySelector('.cart-items');
const cartTotalPrice = document.querySelector('.cart-total-price');

function setupEventListeners()
{
    const removeCartItemButtons = Array.from(document.querySelectorAll('.btn-danger'));
    const addItemToCartButtons = Array.from(document.querySelectorAll('.shop-item-button'));
    const itemQuantitySelected = Array.from(document.querySelectorAll('.cart-quantity-input'));
    
    removeCartItemButtons.forEach(function(_button)
    {
        _button.addEventListener('click', removeCartItem);
    });

    itemQuantitySelected.forEach(function(_item)
    {
        _item.addEventListener('change', updateCartTotal);
    });

    itemQuantitySelected.forEach(_item => _item.setAttribute('min', '1'));

    addItemToCartButtons.forEach(function(_button)
    {
        _button.addEventListener('click', addItemHandler);
    });
}

function removeCartItem(event)
{
    const item = event.target;

    item.parentElement.parentElement.remove();

    updateCartTotal();
};

function addItemToCart(_item)
{
    const cartRow = document.createElement('div');
    cartRow.classList.add('cart-row');

    const markup = 
    `
        <div class="cart-item cart-column">
            <img class="cart-item-image" src="${_item.image}" width="100" height="100">
            <span class="cart-item-title">${_item.title}</span>
        </div>
        <span class="cart-price cart-column">$${_item.price}</span>
        <div class="cart-quantity cart-column">
            <input class="cart-quantity-input" type="number" value="1">
            <button class="btn btn-danger" type="button">REMOVE</button>
        </div>
    `
    cartRow.innerHTML = markup;

    cartItemContainer.appendChild(cartRow);

    updateCartTotal();
}

function addItemHandler(event)
{
    const shopItem = event.target.parentElement.parentElement;

    const itemTitle = shopItem.querySelector('.shop-item-title').innerText;

    const itemImage = shopItem.querySelector('.shop-item-image').getAttribute('src');

    const itemPrice = parseFloat(shopItem.querySelector('.shop-item-price').innerText.replace('$', ''));
    
    const item = { title: itemTitle, image: itemImage, price: itemPrice };
    
    addItemToCart(item);
}

function updateCartTotal()
{
    const cartItemRows = Array.from(cartItemContainer.querySelectorAll('.cart-row'));

    const totalPrice = cartItemRows.reduce((acc, curr) =>
    {
        const itemPrice = parseFloat(curr.querySelector('.cart-price').innerText.replace('$', ''));

        const itemQuantity = parseInt(curr.querySelector('.cart-quantity-input').value);
        
        return acc + (itemPrice * itemQuantity);
    }, 0);

    cartTotalPrice.innerText = `$${ totalPrice.toFixed(2) }`

    setupEventListeners();
};

function initStore()
{
    setupEventListeners();
}

initStore();