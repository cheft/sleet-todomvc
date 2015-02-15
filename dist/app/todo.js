riot.tag('item', '<li class="{completed: todo.completed, editing: editing} todo"> <div class="view"> <input class="toggle" type="checkbox" __checked="{todo.completed}" onclick="{toggleTodo}"> <label ondblclick="{toEdit}">{todo.title}</label> <button class="destroy" onclick="{toRemove}"></button> </div> <input class="edit" name="editor" onblur="{didEdit}" onkeyup="{didEdit}"> </li>', function(opts) {var todoTag;

todoTag = this.parent.parent;

this.todo = this.parent.t;

this.toEdit = (function(_this) {
  return function(e) {
    _this.editing = true;
    return _this.editor.value = _this.todo.title;
  };
})(this);

this.didEdit = (function(_this) {
  return function(e) {
    var value;
    if (e.which === 13 || e.which === 0) {
      _this.editing = false;
      if ((value = e.target.value)) {
        _this.todo.title = value.trim();
      }
      return todoTag.trigger('save');
    }
  };
})(this);

this.toRemove = (function(_this) {
  return function() {
    return todoTag.trigger('remove', _this.todo);
  };
})(this);

this.toggleTodo = (function(_this) {
  return function() {
    _this.todo.completed = !_this.todo.completed;
    todoTag.trigger('save');
    return true;
  };
})(this);

this.on('update', (function(_this) {
  return function() {
    if (_this.editing) {
      return _this.editor.focus();
    }
  };
})(this));

});
riot.tag('todo', '<section id="todoapp"> <header id="header"> <h1>todos</h1> <input id="new-todo" autofocus="" autocomplete="off" placeholder="What needs to be done?" onkeyup="{didAdd}"> </header> <section id="main" if="{todos.length}"> <input id="toggle-all" type="checkbox" __checked="{allDone}" onclick="{toggleAll}"> <ul id="todo-list"><item each="{t, i in filtered()}"></item></ul> </section> <footer id="footer" if="{todos.length}"> <span id="todo-count"> <strong>{remaining}</strong> {remaining > 1 ? \'items\' : \'item\'} left </span> <ul id="filters"><li each="{v in links}"><a class="{selected: parent.activeFilter == v.name}" href="#/{v.name}">{v.label}</a></li></ul> <button id="clear-completed" onclick="{removeCompleted}" if="{todos.length > remaining}">Clear completed</button> </footer> </section> <footer id="info"> <p>Double-click to edit a todo</p> <p> Written by <a href="http://github.com/cheft">Cheft</a> </p> <p> Part of <a href="http://todomvc.com">TodoMVC</a> </p> </footer>', function(opts) {var store;

store = new Store('sleet-todo');

this.todos = store.fetch();

this.links = [
  {
    label: 'All',
    name: 'all'
  }, {
    label: 'Active',
    name: 'active'
  }, {
    label: 'Completed',
    name: 'completed'
  }
];

this.didAdd = (function(_this) {
  return function(e) {
    var value;
    if (e.which === 13 && (value = e.target.value)) {
      _this.todos.push({
        title: value.trim(),
        completed: false
      });
      e.target.value = '';
      return _this.trigger('save');
    }
  };
})(this);

this.filtered = (function(_this) {
  return function() {
    if (_this.activeFilter === 'all') {
      return _this.todos;
    }
    return _this.todos.filter(function(t) {
      return t.completed === (_this.activeFilter === 'active' ? false : true);
    });
  };
})(this);

this.toggleAll = (function(_this) {
  return function(e) {
    _this.todos.forEach(function(t) {
      return t.completed = e.target.checked;
    });
    _this.trigger('save');
    return true;
  };
})(this);

this.removeCompleted = (function(_this) {
  return function(e) {
    _this.todos = _this.todos.filter(function(t) {
      return !t.completed;
    });
    return _this.trigger('save');
  };
})(this);

this.on('remove', (function(_this) {
  return function(todo) {
    return _this.todos.forEach(function(t) {
      if (todo === t) {
        _this.todos.splice(_this.todos.indexOf(t), 1);
      }
      return _this.trigger('save');
    });
  };
})(this));

this.on('save', (function(_this) {
  return function() {
    store.save(_this.todos);
    return _this.update();
  };
})(this));

this.on('update', (function(_this) {
  return function() {
    _this.remaining = (_this.todos.filter(function(t) {
      return !t.completed;
    })).length;
    return _this.allDone = _this.remaining === 0;
  };
})(this));

riot.route.exec((function(_this) {
  return function(base, filter) {
    return _this.activeFilter = filter || 'all';
  };
})(this));

riot.route((function(_this) {
  return function(base, filter) {
    _this.activeFilter = filter;
    return _this.update();
  };
})(this));

});
