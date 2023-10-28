// the date coming from or new data is n the miliseconds so we need to convert a day into milliseconds
const DateFunctions = (from, to) => {
  const day = 24 * 60 * 60 * 1000; // convert this in the milliseconds
  const froms = new Date(from);
  const toos = new Date(to);
  const results = Math.round(Math.abs(froms - toos) / day);
  return results;
};
export default DateFunctions;

// this function will the diffrence between to and fromn date total number of days
