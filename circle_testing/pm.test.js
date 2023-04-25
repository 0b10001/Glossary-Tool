const promptMessage = require('./promptMessage');

test('displays a prompt window with the correct message and default value', () => {
  const message = 'What is your name?';
  const defaultValue = 'John';

  // Mock the prompt method
  const originalPrompt = window.prompt;
  window.prompt = jest.fn().mockReturnValue(defaultValue);

  const value = promptMessage(message, defaultValue);

  expect(window.prompt).toHaveBeenCalledTimes(1);
  expect(window.prompt).toHaveBeenCalledWith(message, defaultValue);
  expect(value).toBe(defaultValue);

  // Restore window.prompt
  window.prompt = originalPrompt;
});

test('returns null if user cancels the prompt window', () => {
  const message = 'What is your age?';
  const defaultValue = '';

  // Mock the prompt method
  const originalPrompt = window.prompt;
  window.prompt = jest.fn().mockReturnValue(null);

  const value = promptMessage(message, defaultValue);

  expect(window.prompt).toHaveBeenCalledTimes(1);
  expect(window.prompt).toHaveBeenCalledWith(message, defaultValue);
  expect(value).toBeNull();

  // Restore window.prompt
  window.prompt = originalPrompt;
});

test('trims the value entered in the prompt window', () => {
  const message = 'What is your email address?';
  const defaultValue = '';

  // Mock the prompt method
  const originalPrompt = window.prompt;
  window.prompt = jest.fn().mockReturnValue('  john@example.com  ');

  const value = promptMessage(message, defaultValue);

  expect(window.prompt).toHaveBeenCalledTimes(1);
  expect(window.prompt).toHaveBeenCalledWith(message, defaultValue);
  expect(value).toBe('john@example.com');

  // Restore window.prompt
  window.prompt = originalPrompt;
});

