export const fetchUsers = async () => {
  const response = await fetch('/api/users');
  const data = await response.json();
  return data;
};

export const fetchActivityFeed = async () => {
  const response = await fetch('/api/activity-feed');
  const data = await response.json();
  return data;
};

export const fetchVerticals = async () => {
  const response = await fetch('/api/verticals');
  const data = await response.json();
  return data;
};
