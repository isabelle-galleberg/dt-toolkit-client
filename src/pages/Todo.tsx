import { useEffect, useState } from 'react';
import { getTodos, addTodo } from '../services/todoService';

function Todo() {
  const [task, setTask] = useState('');
  const [todos, setTodos] = useState<{ _id: string; task: string }[]>([]);

  const fetchTodos = async () => {
    try {
      const response = await getTodos();
      console.log('response:', response);
      setTodos(response);
    } catch (error) {
      console.error('Error fetching todos', error);
    }
  };

  useEffect(() => {
    fetchTodos();
  }, []);

  const handleAddTodo = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!task.trim()) return; // Prevent empty tasks

    try {
      await addTodo(task);
      setTask(''); // Clear input after adding
      fetchTodos(); // ✅ Refresh the list after adding
    } catch (error) {
      console.error('Error adding todo', error);
    }
  };

  return (
    <div>
      <form onSubmit={handleAddTodo}>
        <label>
          <input
            type="text"
            name="task"
            value={task}
            onChange={(e) => setTask(e.target.value)}
          />
        </label>
        <button type="submit">Add Todo</button>
      </form>

      {/* ✅ Display Todo List */}
      <ul>
        {todos.map((todo) => (
          <li key={todo._id}>{todo.task}</li>
        ))}
      </ul>
    </div>
  );
}

export default Todo;
