function TaskFilters({ searchQuery, setSearchQuery, statusFilter, setStatusFilter, sortBy, setSortBy }) {
  return (
    <div className="mb-6 space-y-4">
      <div className="flex gap-4">
        <input
          type="text"
          placeholder="Search tasks..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="flex-1 p-2 border rounded"
        />
      </div>

      <div className="flex gap-4">
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="p-2 border rounded"
        >
          <option value="all">All Tasks</option>
          <option value="completed">Completed</option>
          <option value="active">Active</option>
        </select>

        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
          className="p-2 border rounded"
        >
          <option value="newest">Newest First</option>
          <option value="oldest">Oldest First</option>
          <option value="alphabetical">Alphabetical</option>
        </select>
      </div>
    </div>
  );
}

export default TaskFilters; 