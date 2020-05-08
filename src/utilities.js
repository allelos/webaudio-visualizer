function max(arr) {
  if (!arr.length) return [];
  return arr.reduce(function (a, b) {
    return Math.max(a, b);
  });
}

function avg(arr) {
  if (!arr.length) return [];
  var total = arr.reduce(function (sum, b) {
    return sum + b;
  });
  return total / arr.length;
}

export { max, avg };
