function CreateTaskForm({ newTask, setNewTask, handleCreateTask }) {
  return (
    <form onSubmit={handleCreateTask} className="mb-8">
      <div className="flex gap-2">
        <input
          type="text"
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
          placeholder="Add a new task..."
          className="flex-1 p-2 border rounded"
        />
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Add Task
        </button>
      </div>
    </form>
  );
}

export default CreateTaskForm; 