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

export function formatDueDate(date?: string | Date | null) {
  if (!date) {
    return '';
  }

  const d = typeof date === 'string' ? new Date(date) : date;

  const yyyy = d.getFullYear();
  const mm = String(d.getMonth() + 1).padStart(2, '0');
  const dd = String(d.getDate()).padStart(2, '0');
  const hh = String(d.getHours()).padStart(2, '0');
  const min = String(d.getMinutes()).padStart(2, '0');

  return `${yyyy}-${mm}-${dd} ${hh}:${min}`;
}
