//adds capitalize function to string type
String.prototype.capitalize = function() {
  return this.replace(/(?:^|\s)\S/g, function(a) {
    return a.toUpperCase();
  });
};

//check if input string is blank or white spaces
export function IsStrBlank(str) {
  return str != null && /\S/.test(str) ? false : true;
}
