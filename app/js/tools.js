Object.prototype.size = function () {
  var len = this.length ? this.length : 0;
    for (var k in this)
      len++;
  return len;
}