String.prototype.capitalize = function() {
  return this.replace(/(?:^|\s)\S/g, function(a) {
    return a.toUpperCase();
  });
};

export function IsStrBlank(str) {
  return str != null && /\S/.test(str) ? false : true;
}
