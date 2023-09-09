export const separateCamelCase = (inputString) => {
  // Use regular expression to split camel case words
  const words = inputString.match(/[A-Z]?[a-z]+|[A-Z]+(?=[A-Z]|$)/g);
  // Join the words with spaces to create the final result
  const result = words.join(" ");
  return result;
};
