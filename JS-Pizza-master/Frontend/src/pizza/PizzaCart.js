/**
 * Created by chaika on 02.02.16.
 */
var Templates = require('../Templates');

//Перелік розмірів піци
var PizzaSize = {
    Big: "big_size",
    Small: "small_size"
};

//Змінна в якій зберігаються перелік піц в кошику
var Cart = [];

//HTML едемент куди будуть додаватися піци
var $cart = $("#main-container");
var $number_order = $("#number-order")[0];
var $price_field = $("#price-field")[0];

function addToCart(pizza, size) {
    //Ддавання однієї піци в кошик покупок
    let cart_item = {
        pizza: pizza,
        size: size,
        quantity: 1
    }
    let found = Cart.find(item=>(item.pizza === pizza && item.size === size));
    if(found)
        found.quantity += 1;
    else
        Cart.push(cart_item);
    //Оновити вміст кошика на сторінці
    updateCart();
}

function removeFromCart(cart_item) {
    //Видалити піцу з кошика
    Cart.splice(cart_item, 1);

    //Після видалення оновити відображення
    updateCart();
}

function initialiseCart() {
    //Фукнція віпрацьвуватиме при завантаженні сторінки
    //Тут можна наприклад, зчитати вміст корзини який збережено в Local Storage то показати його
    $("#delete_all_orders").click(function() {
        Cart = [];
        updateCart();
    });

    updateCart();
}

function getPizzaInCart() {
    //Повертає піци які зберігаються в кошику
    return Cart;
}

function updateCart() {
    //Функція викликається при зміні вмісту кошика
    //Тут можна наприклад показати оновлений кошик на екрані та зберегти вміт кошика в Local Storage

    //Очищаємо старі піци в кошику
    $cart.html("");

    $number_order.innerText = Cart.length;

    function sumPrice() {
        let price = 0;
        Cart.forEach(function(item) {
           if(item.size == "big_size")
               price+=item.pizza.big_size.price*item.quantity;
           else
               price+=item.pizza.small_size.price*item.quantity;
        })
        return price;
    }
    $price_field.innerText = sumPrice() + " грн.";

    //Онволення однієї піци
    function showOnePizzaInCart(cart_item) {
        var html_code = Templates.PizzaCart_OneItem(cart_item);

        var $node = $(html_code);

        $node.find(".plus").click(function () {
            //Збільшуємо кількість замовлених піц
            cart_item.quantity += 1;

            //Оновлюємо відображення
            updateCart();
        });

        $node.find(".minus").click(function () {
            cart_item.quantity -= 1;
            if (cart_item.quantity === 0)
                removeFromCart(cart_item);
            else
                updateCart()
        });

        $node.find(".delete").click(function () {
            removeFromCart(cart_item)
            updateCart();
        });

        $cart.append($node);
    }

    Cart.forEach(showOnePizzaInCart);
}

exports.removeFromCart = removeFromCart;
exports.addToCart = addToCart;

exports.getPizzaInCart = getPizzaInCart;
exports.initialiseCart = initialiseCart;

exports.PizzaSize = PizzaSize;