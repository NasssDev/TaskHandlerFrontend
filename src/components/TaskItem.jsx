function TaskItem({ task, editingTask, setEditingTask, handleUpdateTask, handleDeleteTask, setTasks, tasks }) {
    return (
      <div
        key={task.id}
        className="flex items-center justify-between bg-white p-4 rounded-lg shadow"
      >
        {editingTask === task.id ? (
          <input
            type="text"
            value={task.title}
            onChange={(e) => {
              const updatedTasks = tasks.map(t =>
                t.id === task.id ? { ...t, title: e.target.value } : t
              );
              setTasks(updatedTasks);
            }}
            className="flex-1 p-2 border rounded mr-2"
            autoFocus
          />
        ) : (
          <div className="flex items-center gap-3 flex-1">
            <input
              type="checkbox"
              checked={task.completed}
              onChange={() => handleUpdateTask(task.id, { completed: !task.completed })}
              className="h-5 w-5"
            />
            <span className={task.completed ? 'line-through text-gray-500' : ''}>
              {task.title}
            </span>
          </div>
        )}
  
        <div className="flex gap-2">
          {editingTask === task.id ? (
            <button
              onClick={() => handleUpdateTask(task.id, { title: task.title })}
              className="text-green-600 hover:text-green-700"
            >
              Save
            </button>
          ) : (
            <button
              onClick={() => setEditingTask(task.id)}
              className="text-blue-600 hover:text-blue-700"
            >
              Edit
            </button>
          )}
          <button
            onClick={() => handleDeleteTask(task.id)}
            className="text-red-600 hover:text-red-700"
          >
            Delete
          </button>
        </div>
      </div>
    );
  }
  
  export default TaskItem;