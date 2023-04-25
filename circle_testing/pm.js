function promptMessage(message, defaultValue) {
  const value = window.prompt(message, defaultValue);

  if (value === null) {
    return null;
  }

  return value.trim();
}

module.exports = promptMessage;

