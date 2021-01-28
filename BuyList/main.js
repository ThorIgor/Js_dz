
var mainContainer = $(".left-container");
var dopContainer = $(".remained-container");

function addGoods(name) {
    $(".goods-container").attr("class", "goods-container border");

    const node = $('<div class="goods-container">\n' +
        '                <span class = "goods-label">' + name + '</span>\n' +
        '                <span class = "add-container">\n' +
        '                        <button class="minus-button min" data-tooltip="Зменшити">-</button>\n' +
        '                        <span class="number-container">1</span>\n' +
        '                        <button class="plus-button" data-tooltip="Збільшити">+</button>\n' +
        '                    </span>\n' +
        '                <span class = "delete-container">\n' +
        '                         <button class = "sell-button" data-tooltip="Купити товар">Куплено</button>\n' +
        '                        <button class = "delete-button" data-tooltip="Вилучити">X</button>\n' +
        '                    </span>\n' +
        '            </div>');

    const dopNode = $(' <div class = "right-goods">\n' +
        '                    <span class = "right-goods-name">' + name + '</span>\n' +
        '                    <span class = "right-number">1</span>\n' +
        '                </div>');

    node.find(".plus-button").click(function() {
        const numberContainer = node.find(".number-container")[0];
        const num = parseInt(numberContainer.innerText) + 1;
        $(numberContainer).text(num);
        $(dopNode.find(".right-number")).text(num);
        $(node.find(".min")).removeClass("min");
    });

    node.find(".minus-button").click(function() {
        const numberContainer = node.find(".number-container")[0];
        const num = parseInt(numberContainer.innerText) - 1;
        if(num !== 0) {
            $(numberContainer).text(num);
            $(dopNode.find(".right-number")).text(num);
        }
        if(num === 1)
            $(node.find(".minus-button")).addClass("min");
    });


    mainContainer.append(node);
    dopContainer.append(dopNode);
}

addGoods("Помідори");
addGoods("Огірки");
addGoods("Риба");

$(".input-button").click(function() {
    const input = $("input")[0];

    if(!input.value) {
        console.log("Nothing");
        return;
    }

    addGoods(input.value);

    input.value = "";
});