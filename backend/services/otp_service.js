function generateOTP() {
	var minm = 100000;
	var maxm = 999999;
	return Math.floor(Math.random() * (maxm - minm + 1)) + minm;
}

function matchOTP(input_otp ,user_otp) {
	return parseInt(input_otp) === parseInt(user_otp);
}

module.exports = {
	generateOTP : generateOTP,
	matchOTP : matchOTP
};
