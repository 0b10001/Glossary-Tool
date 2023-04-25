function getFullName(firstName, lastName) {
  if (!firstName || !lastName) {
    throw new Error('Both first name and last name are required');
  }

  return `${firstName} ${lastName}`;
}

module.exports = getFullName;

