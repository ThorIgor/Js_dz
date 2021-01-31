
var mainContainer = $(".left-container");
var dopContainer = $(".remained-container");

function addGoods(name) {
    $(".goods-container").attr("class", "goods-container border");

    const node = $('<div class="goods-container">\n' +
        '                <span class = "goods-label-container">' +
        '                   <label>' + name + '</label>' +
        '                </span>\n' +
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

    let dopNode = $(' <div class = "right-goods">\n' +
        '                    <span class = "right-goods-name">' + name + '</span>\n' +
        '                    <span class = "right-number">1</span>\n' +
        '                </div>');
    node.find("label").click(function() {
        if(this !== node.find(".strikeout")[0]) {
            $(this).addClass("hidden");
            let input = $('<input focus class = "goods-input-field" type="text" value ="' + this.innerText + '"></input>')[0];

            input.oninput = function () {
                node.find("label")[0].innerText = this.value;
                dopNode.find(".right-goods-name")[0].innerText = this.value;
            };

            input.onblur = function () {
                input.remove();
                node.find("label").removeClass("hidden");
            }

            node.find(".goods-label-container").append(input);
            input.focus();
        }
    });

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

    node.find(".sell-button").click(function() {
        let plusB = node.find(".plus-button");
        let minusB = node.find(".minus-button");
        let sellB = node.find(".sell-button");
        let delB = node.find(".delete-button");

        plusB.addClass("hidden");
        minusB.addClass("hidden");
        sellB.addClass("hidden");
        delB.addClass("hidden");

        $(".number-container").addClass("center");

        dopNode.remove();
        dopNode.find(".right-goods-name").addClass("strikeout");
        dopNode.find(".right-number").addClass("strikeout");
        $(".sold-container").append(dopNode);

        const button = $('<button class = "nosell-button" data-tooltip="Не купувати">Не куплено</button>');
        node.find(".delete-container").append(button);

        node.find("label").addClass("strikeout");
        button.click(function() {
            button.remove();

            dopNode.remove();
            dopNode.find(".right-goods-name").removeClass("strikeout");
            dopNode.find(".right-number").removeClass("strikeout");
            $(".remained-container").append(dopNode);

            plusB.removeClass("hidden");
            minusB.removeClass("hidden");
            sellB.removeClass("hidden");
            delB.removeClass("hidden");

            node.find("label").removeClass("strikeout");
        });
    });

    node.find(".delete-button").click(function() {
        node.remove(); dopNode.remove();
    })

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

$(".input-field").keydown(function(e) {
    if(e.keyCode === 13) {
        const input = $("input")[0];

        if (!input.value) {
            console.log("Nothing");
            return;
        }

        addGoods(input.value);

        input.value = "";
    }
});

