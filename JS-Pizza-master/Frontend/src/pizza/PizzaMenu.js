/**
 * Created by chaika on 02.02.16.
 */
var Templates = require('../Templates');
var PizzaCart = require('./PizzaCart');
var Pizza_List = require('../Pizza_List');

//HTML елемент куди будуть додаватися піци
var $pizza_list = $("#pizza_list");
var $number_field = $("#number-pizza")[0];

function showPizzaList(list) {
    //Очищаємо старі піци в кошику
    $pizza_list.html("");
    $number_field.innerText = list.length;
    //Онволення однієї піци
    function showOnePizza(pizza) {
        var html_code = Templates.PizzaMenu_OneItem({pizza: pizza});

        var $node = $(html_code);

        $node.find(".buy-big").click(function(){
            PizzaCart.addToCart(pizza, PizzaCart.PizzaSize.Big);
        });
        $node.find(".buy-small").click(function(){
            PizzaCart.addToCart(pizza, PizzaCart.PizzaSize.Small);
        });

        $pizza_list.append($node);
    }

    list.forEach(showOnePizza);
}

function filterPizza(filter) {
    //Масив куди потраплять піци які треба показати
    var pizza_shown = [];
    console.log(filter);
    if (filter === 'all') {
        Pizza_List.forEach(function (pizza) {
            //Якщо піка відповідає фільтру

            pizza_shown.push(pizza);
        });
    }
    else if (filter === 'vega'){
        Pizza_List.forEach(function (pizza) {
            //Якщо піка відповідає фільтру
            if (!pizza.content.meat && !pizza.content.ocean){
                pizza_shown.push(pizza);}
        });
    }
    else {
        Pizza_List.forEach(function (pizza) {
            //Якщо піка відповідає фільтру

            for (const [key] of Object.entries(pizza.content)) {
                if (key === filter) {
                    pizza_shown.push(pizza);
                }
            }
        });
    }

    //Показати відфільтровані піци
    showPizzaList(pizza_shown);
}

function initialiseMenu() {
    //Показуємо усі піци
    $("#sort-all").click(function() {
       filterPizza("all");
    });
    $("#sort-meat").click(function() {
        filterPizza("meat")
    });
    $("#sort-chicken").click(function () {
        filterPizza("chicken");
    });
    $("#sort-seafood").click(function () {
        filterPizza("ocean");
    });
    $("#sort-pineapple").click(function () {
        filterPizza("pineapple");
    });
    $("#sort-mushroom").click(function () {
        filterPizza("mushroom");
    });

    $("#sort-vega").click(function () {
        filterPizza("vega");
    });
    showPizzaList(Pizza_List)
}

exports.filterPizza = filterPizza;
exports.initialiseMenu = initialiseMenu;