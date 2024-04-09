window.todos = function (){
	return{
		filter : 'all',
			todos : [],
			newTodo : '',
			editedTodo : null,
			get active(){
				return this.todos.filter(todo => !todo.completed);
			},
			get completed(){
				return this.todos.filter(todo => todo.completed);
			},
			filteredTodos(){
				return{
					all: this.todos,
					active: this.active,
					completed: this.completed
				}[this.filter];
			},

			addTodo () {
				this.todos.push({
					id: this.todos.length + 1,
					body: this.newTodo,
					completed: false
				});
				this.newTodo = ''
			},
			editTodo(todo){
				this.editedTodo = todo;
			},
			editComplete(todo){
				if(todo.body.trim() === ''){
					return this.deleteTodo(todo);
				}
				todo.caschedBody = todo.body;
				this.editedTodo = null;
			},
			cancelEdit(todo){
				todo.body = todo.caschedBody;
				this.editedTodo = null;

				delete todo.cashedBody;
			},
			deleteTodo(todo){
				let position = this.todos.indexOf(todo);

				this.todos.splice(position, 1);
			}

	}
}
