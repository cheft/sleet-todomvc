var STORAGE_KEY, todoStorage;

STORAGE_KEY = 'todo-sleet';

todoStorage = {
  fetch: function() {
    return JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
  },
  save: function(todos) {
    return localStorage.setItem(STORAGE_KEY, JSON.stringify(todos));
  }
};
