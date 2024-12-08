export const translateDonationType = (type) => {
  const translations = {
    financial: 'Financier',
    goods: 'Biens',
    services: 'Services'
  };
  return translations[type] || type;
};

export const translateStatus = (status, type = 'default') => {
  if (type === 'donor') {
    const translations = {
      active: 'Actif',
      inactive: 'Inactif'
    };
    return translations[status] || status;
  }

  if (type === 'beneficiary') {
    const translations = {
      active: 'Actif',
      inactive: 'Inactif',
      urgent: 'Urgent'
    };
    return translations[status] || status;
  }

  // Default status translations (for donations, etc.)
  const translations = {
    completed: 'Terminé',
    active: 'En cours',
    pending: 'En attente'
  };
  return translations[status] || status;
};

export const translateFrequency = (frequency) => {
  const translations = {
    'one-time': 'Unique',
    monthly: 'Mensuel',
    quarterly: 'Trimestriel',
    yearly: 'Annuel'
  };
  return translations[frequency] || frequency;
}; 