/**
 * Created by chaika on 09.02.16.
 */
var Pizza_List = require('./data/Pizza_List');

exports.getPizzaList = function(req, res) {
    res.send(Pizza_List);
};

function sha1(string) {
    var sha1 = crypto.createHash('sha1');
    sha1.update(string);
    return sha1.digest('base64');
}
function base64(str)     {
    return new Buffer(str).toString('base64');
}

exports.createOrder = function(req, res) {
    var order_info = req.body;
    var order    =    {
        version:    3,
        public_key:    'sandbox_i45750811690',
        action:    "pay",
        amount:    sum,
        currency:    "UAH",
        description:parse_order,
        order_id:    Math.random(),
        sandbox:    1
    };
    var data    =    base64(JSON.stringify(order));
    var signature    =    sha1('sandbox_E7AMAeTrG2YmUv7XP2ArVOZU45ohkb8EZ05QIzZr' +    data +    'sandbox_E7AMAeTrG2YmUv7XP2ArVOZU45ohkb8EZ05QIzZr');
    var receipt = {
        data: data,
        signature: signature
    }
    res.send(receipt);
};

