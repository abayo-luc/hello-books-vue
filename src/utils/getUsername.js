export default (user) => {
  if (!user) {
    return {};
  }
  const name = user.first_name || user.last_name || user.email.split('@')[0];
  return {
    ...user,
    name
  };
};
