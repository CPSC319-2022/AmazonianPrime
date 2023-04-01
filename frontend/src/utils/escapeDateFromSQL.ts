const escapeDate = (date: string) => escape(date).replace('%u2068', '').replace('%u2069', '').replace('%u2066', '');

// date in format of MM/YY
export const isExpiredDate = (date: string) => {
  const [month, year] = date.split('/');
  const dateObj = new Date(Number(`20${escapeDate(year)}`), Number(escapeDate(month)) - 1);
  const todayDate = new Date();
  return todayDate > dateObj;
};
