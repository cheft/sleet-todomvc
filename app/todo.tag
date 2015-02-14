item
    li(class='{completed: todo.completed, editing: editing} todo')
        .view
            input.toggle(type='checkbox' checked='{todo.completed}' onclick='{toggleTodo}')
            label(ondblclick='{toEdit}') {todo.title}
            button.destroy(onclick='{toRemove}')
        input.edit(name='editor' onblur='{didEdit}' onkeyup='{didEdit}')
    |.
        todoTag = @parent.parent
        @todo = @parent.t
        
        @toEdit = (e) =>
            @editing = true
            @editor.value = @todo.title
            
        @didEdit = (e) =>
            if e.which is 13 or e.which is 0 
                @editing = false
                @todo.title = value.trim() if (value = e.target.value)
                todoTag.didSave()
        
        @toRemove = => todoTag.didRemove @todo
        
        @toggleTodo = =>
            @todo.completed = !@todo.completed
            todoTag.didSave()
            true
            
        @on 'updated', => @editor.focus() if @editing

todo
    #todoapp
        #header
            h1 todos
            input#new-todo(autofocus autocomplete='off' placeholder='What needs to be done?' onkeyup='{didAdd}')

        #main(show='{todos.length}')
            input#toggle-all(type='checkbox' checked='{allDone}' onclick='{toggleAll}')
            ul#todo-list
                item(each='{t, i in todos}')

        #footer(show='{todos.length}')
            span#todo-count
                strong {remaining}
                |.
                    {remaining > 1 ? 'items' : 'item'} left
            ul#filters
                li: a(class='{selected: activeFilter ==="all"}' href='#/all') All
                li: a(class='{selected: activeFilter ==="active"}' href='#/active') Active
                li: a(class='{selected: activeFilter ==="completed"}' href='#/completed') Completed
            button#clear-completed(onclick='{removeCompleted}' show='{todos.length > remaining}') Clear completed ({todos.length - remaining})

    #info
        p Double-click to edit a todo
        p Written by
            a(href='http://github.com/cheft') Haifeng Chen
        p Part of
            a(href='http://todomvc.com') TodoMVC
    |.
        @todos = []
        
        @didAdd = (e) =>
            if e.which is 13 and (value = e.target.value)
                @todos.push title: value.trim(), completed: false
                e.target.value = ''

        @didSave = => todoStorage.save @todos
    
        @didRemove = (todo) => @todos.some (t) =>
            @todos.splice(@todos.indexOf(t), 1) if todo is t
            @update()
