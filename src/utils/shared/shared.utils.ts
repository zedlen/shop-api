// Utilities for all project

export const boolean = (value: any): value is string => {
  if (typeof value === 'string') {
    return /^(true|yes|y|1)$/iu.test(value.trim());
  }

  return false;
};
