STORAGE_KEY = 'todo-sleet'

todoStorage =
    fetch: -> JSON.parse localStorage.getItem(STORAGE_KEY) || '[]'
    save: (todos) -> localStorage.setItem STORAGE_KEY, JSON.stringify(todos)
