export const generateId = () => `${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;

export const Storage = {
  get: (key, defaultValue = null) => {
    try {
      const item = localStorage.getItem(key);
      return item ? JSON.parse(item) : defaultValue;
    } catch (error) {
      console.error('Error reading from localStorage:', error);
      return defaultValue;
    }
  },
  set: (key, value) => {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      console.error('Error writing to localStorage:', error);
    }
  }
};

export const getTimeAgo = (timestamp) => {
  if (!timestamp) return 'Unknown';

  const now = new Date();
  const past = new Date(timestamp);

  if (isNaN(past.getTime())) {
    return 'Invalid date';
  }

  const diffInMilliseconds = now - past;
  const diffInSeconds = Math.floor(diffInMilliseconds / 1000);

  if (diffInSeconds < 60) {
    return `${diffInSeconds} second${diffInSeconds !== 1 ? 's' : ''} ago`;
  }

  const diffInMinutes = Math.floor(diffInSeconds / 60);

  if (diffInMinutes < 90) {
    return `${diffInMinutes} minute${diffInMinutes !== 1 ? 's' : ''} ago`;
  }

  const diffInHours = Math.floor(diffInMinutes / 60);
  const remainingMinutes = diffInMinutes % 60;

  if (diffInHours < 24) {
    if (remainingMinutes > 0) {
      return `${diffInHours} hour${diffInHours !== 1 ? 's' : ''} and ${remainingMinutes} minute${remainingMinutes !== 1 ? 's' : ''} ago`;
    }
    return `${diffInHours} hour${diffInHours !== 1 ? 's' : ''} ago`;
  }

  const diffInDays = Math.floor(diffInHours / 24);
  if (diffInDays < 7) {
    return `${diffInDays} day${diffInDays !== 1 ? 's' : ''} ago`;
  }

  const diffInWeeks = Math.floor(diffInDays / 7);
  if (diffInWeeks < 4) {
    return `${diffInWeeks} week${diffInWeeks !== 1 ? 's' : ''} ago`;
  }

  const diffInMonths = Math.floor(diffInDays / 30);
  if (diffInMonths < 12) {
    return `${diffInMonths} month${diffInMonths !== 1 ? 's' : ''} ago`;
  }

  const diffInYears = Math.floor(diffInDays / 365);
  return `${diffInYears} year${diffInYears !== 1 ? 's' : ''} ago`;
};