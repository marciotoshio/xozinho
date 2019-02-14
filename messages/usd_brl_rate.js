const https = require('https');

module.exports = {
   get_rate: function(callback) {
      https.get('https://free.currencyconverterapi.com/api/v5/convert?q=USD_BRL&compact=y&apiKey=' + process.env['CurrencyConverterApiKey'], (resp) => {
        let data = '';

        // A chunk of data has been recieved.
        resp.on('data', (chunk) => {
          data += chunk;
        });

        // The whole response has been received. Print out the result.
        resp.on('end', () => {
          var value = JSON.parse(data).USD_BRL.val;
          callback('Current rate: R$ ' + value + '\n\nPayoneer: ~R$: ' + value*0.98);
        });

      }).on("error", (err) => {
        console.log("Error: " + err.message);
      });
   }
}
