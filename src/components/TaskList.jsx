import TaskItem from './TaskItem';

function TaskList({ filteredTasks, editingTask, setEditingTask, handleUpdateTask, handleDeleteTask, setTasks, tasks }) {
  return (
    <div className="space-y-4">
      {filteredTasks.map(task => (
        <TaskItem
          key={task.id}
          task={task}
          editingTask={editingTask}
          setEditingTask={setEditingTask}
          handleUpdateTask={handleUpdateTask}
          handleDeleteTask={handleDeleteTask}
          setTasks={setTasks}
          tasks={tasks}
        />
      ))}
    </div>
  );
}

export default TaskList; 