const rate = require('./usd_brl_rate');

const boulosFactor = 5;

module.exports = {
	vaiBoulos: function () {
		rate.get_rate(function(value){
			session.send(value);
		}, boulosFactor);
	}
}