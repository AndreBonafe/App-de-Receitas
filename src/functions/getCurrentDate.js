export default function getCurrentDate(separator = '/') {
  const MINIMUN = 10;

  const newDate = new Date();
  const date = newDate.getDate();
  const month = newDate.getMonth() + 1;
  const year = newDate.getFullYear();

  return `${date < MINIMUN ? `0${date}` : `${date}`}${separator}${month < MINIMUN
    ? `0${month}` : `${month}`}${separator}${year}`;
}
// a ideia para essa função foi pega do https://stackoverflow.com/questions/43744312/react-js-get-current-date
