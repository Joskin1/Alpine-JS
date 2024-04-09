window.todoStore = {
	 	todos: JSON.parse(localStorage.getItem('todo-store') || '[]'),

		save(){
			localStorage.setItem('todo-store', JSON.stringify(this.todos));
		}
};

window.todos = function ()
{
	return{
			...todoStore,
			filter : 'all',
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

			get allCompleted(){
				return this.todos.length === this.completed.length;
			},

			addTodo () {
				if(! this.newTodo){
					return;
				}
				this.todos.push({
					id: Date.now(),
					body: this.newTodo,
					completed: false
				});
				this.save;
				this.newTodo = '';
			},
			editTodo(todo){
				this.editedTodo = todo;
			},
			editComplete(todo){
				if(todo.body.trim() === ''){
					return this.deleteTodo(todo);
				}
				todo.cachedBody = todo.body;
				this.editedTodo = null;
			},
			cancelEdit(todo){
				todo.body = todo.cachedBody;
				this.editedTodo = null;

				delete todo.cachedBody;
			},
			deleteTodo(todo){
				let position = this.todos.indexOf(todo);

				this.todos.splice(position, 1);
			},
			toggleTodoCompletion(todo){
				 todo.completed = ! todo.completed;
			},
			toggleAllComplete() {
				let allCompleted = this.allCompleted;
				this.todos.forEach(todo => todo.completed = ! allCompleted);
			},
			clearCompletedTodos(){
				this.todo = this.active;
				this.save();
			}

	};
}
