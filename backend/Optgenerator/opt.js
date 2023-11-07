const otpGenerator = require("otp-generator");
const OtpFunction = () => {
  // this function will generate the random otp everytime
  let opt = otpGenerator.generate(6, {
    upperCaseAlphabets: false,
    specialChars: false,
  });
  return opt;
};

module.exports = OtpFunction;
