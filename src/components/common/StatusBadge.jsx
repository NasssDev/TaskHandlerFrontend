function StatusBadge({ status, type = 'default' }) {
  const getStatusColor = () => {
    if (type === 'donor') {
      return {
        active: 'bg-green-100 text-green-800',
        inactive: 'bg-gray-100 text-gray-800'
      }[status] || 'bg-gray-100 text-gray-800';
    }

    if (type === 'beneficiary') {
      return {
        active: 'bg-green-100 text-green-800',
        inactive: 'bg-gray-100 text-gray-800',
        urgent: 'bg-red-100 text-red-800'
      }[status] || 'bg-gray-100 text-gray-800';
    }

    return {
      completed: 'bg-green-100 text-green-800',
      pending: 'bg-yellow-100 text-yellow-800',
      failed: 'bg-red-100 text-red-800'
    }[status] || 'bg-gray-100 text-gray-800';
  };

  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor()}`}>
      {status}
    </span>
  );
}

export default StatusBadge; 