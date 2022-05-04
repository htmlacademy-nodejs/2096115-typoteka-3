const getRandomInt = (min, max) => {
  min = Math.ceil(min);
  max = Math.floor(max);

  return Math.floor(Math.random() * (max - min + 1)) + min;
};

const shuffle = (someArray) => {
  for (let i = someArray.length - 1; i > 0; i--) {
    const randomPosition = Math.floor(Math.random() * i);
    [someArray[i], someArray[randomPosition]] = [someArray[randomPosition], someArray[i]];
  }

  return someArray;
};

const subtractMonths = (date, numOfMonths) => {
  date.setMonth(date.getMonth() - numOfMonths);
  return date;
};

const getFormattedDateString = (date) => {
  const dateString = date.toISOString().split("T");
  const datePart = dateString[0]
  const timeParts = dateString[1].split(":")
  const hours = timeParts[0]
  const minutes = timeParts[1]
  const seconds = timeParts[2].split(".")[0]

  return `${datePart} ${hours}:${minutes}:${seconds}`
};

module.exports = {
  getRandomInt,
  shuffle,
  subtractMonths,
  getFormattedDateString,
}
