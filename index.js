const paypalSecrets = require('./paypal_secrets.json'),
  Promise = require('bluebird'),
  paypal = Promise.promisifyAll(require('paypal-rest-sdk'));

console.log(paypalSecrets.client_secret);

paypal.configure({
  'mode': 'sandbox',
  'client_id': paypalSecrets.client_id,
  'client_secret': paypalSecrets.client_secret,
  'headers': {
    'custom': 'header'
  }
});

var paymentData = {
    "intent": "order",
    "payer": {
        "payment_method": "paypal"
    },
    "redirect_urls": {
        "return_url": "http://return.url",
        "cancel_url": "http://cancel.url"
    },
    "transactions": [{
        "item_list": {
            "items": [{
                "name": "Silver shield",
                "sku": "item",
                "price": "10.00",
                "currency": "BRL",
                "quantity": 1
            }]
        },
        "amount": {
            "currency": "BRL",
            "total": "10.00"
        },
        "description": "A really really beautiful shiny shield."
    }]
};

paypal.payment.create(paymentData).then(error, payment) => {
  if (error)
    console.log(error);
  else {
    console.log('Payment created!');
    console.log(payment);
  }
})
.then()
