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
      return todoTag.didSave();
    }
  };
})(this);

this.toRemove = (function(_this) {
  return function() {
    return todoTag.didRemove(_this.todo);
  };
})(this);

this.toggleTodo = (function(_this) {
  return function() {
    _this.todo.completed = !_this.todo.completed;
    todoTag.didSave();
    return true;
  };
})(this);

this.on('updated', (function(_this) {
  return function() {
    if (_this.editing) {
      return _this.editor.focus();
    }
  };
})(this));

});
riot.tag('todo', '<div id="todoapp"> <div id="header"> <h1>todos</h1> <input id="new-todo" autofocus="" autocomplete="off" placeholder="What needs to be done?" onkeyup="{didAdd}"> </div> <div id="main" show="{todos.length}"> <input id="toggle-all" type="checkbox" __checked="{allDone}" onclick="{toggleAll}"> <ul id="todo-list"> <item each="{t, i in todos}"></item> </ul> </div> <div id="footer" show="{todos.length}"> <span id="todo-count"> <strong>{remaining}</strong> {remaining > 1 ? \'items\' : \'item\'} left </span> <ul id="filters"> <li><a class="{selected: activeFilter ==="all"}" href="#/all">All</a></li> <li><a class="{selected: activeFilter ==="active"}" href="#/active">Active</a></li> <li><a class="{selected: activeFilter ==="completed"}" href="#/completed">Completed</a></li> </ul> <button id="clear-completed" onclick="{removeCompleted}" show="{todos.length > remaining}">Clear completed ({todos.length - remaining})</button> </div> </div> <div id="info"> <p>Double-click to edit a todo</p> <p> Written by <a href="http://github.com/cheft">Haifeng Chen</a> </p> <p> Part of <a href="http://todomvc.com">TodoMVC</a> </p> </div>', function(opts) {this.todos = [];

this.didAdd = (function(_this) {
  return function(e) {
    var value;
    if (e.which === 13 && (value = e.target.value)) {
      _this.todos.push({
        title: value.trim(),
        completed: false
      });
      return e.target.value = '';
    }
  };
})(this);

this.didSave = (function(_this) {
  return function() {
    return todoStorage.save(_this.todos);
  };
})(this);

this.didRemove = (function(_this) {
  return function(todo) {
    return _this.todos.some(function(t) {
      if (todo === t) {
        _this.todos.splice(_this.todos.indexOf(t), 1);
      }
      return _this.update();
    });
  };
})(this);

});
