const to2Digit = (n: number) => String(n).padStart(2, '0');

export const formatDateTime = (datetime: string) => {
  const date = new Date(datetime);

  if (isNaN(date.getTime())) {
    return '';
  }

  const year = date.getFullYear();
  const month = to2Digit(date.getMonth() + 1);
  const day = to2Digit(date.getDate());
  const hours = to2Digit(date.getHours());
  const minutes = to2Digit(date.getMinutes());

  return `${year}. ${month}. ${day} ${hours}:${minutes}`;
};

export default formatDateTime;
