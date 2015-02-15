var Store;

Store = (function() {
  function Store(_at_key) {
    this.key = _at_key;
  }

  Store.prototype.fetch = function() {
    return JSON.parse(localStorage.getItem(this.key) || '[]');
  };

  Store.prototype.save = function(data) {
    return localStorage.setItem(this.key, JSON.stringify(data));
  };

  return Store;

})();
