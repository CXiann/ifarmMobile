export const validateRange = v => {
  // TODO: tokenize by comma
  const arr = v.split(',');
  const result = [];
  arr.forEach(a => {
    const tmp = a.trim();
    let range = tmp.split('-');
    if (!range || range.length === 0 || range.length > 2) return null; // invalid
    let start = parseInt(range[0]);
    let end = parseInt(range[range.length - 1]);
    if (start === 0 && end === 0) result.push(0); // row 0 is valid
    if (!start || !end) return null;
    for (let i = start; i <= end; i++) {
      result.push(i);
    }
  });
  // result.delete(0); // row 0 is invalid
  if (result.size === 0) return null;
  return result;
};
