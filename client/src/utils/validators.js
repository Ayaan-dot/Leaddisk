export const validateEmail = (email) => {
  if (!email || email.trim().length === 0) {
    return 'Email is required';
  }
  const emailRegex = /^\S+@\S+\.\S+$/;
  if (!emailRegex.test(email.trim())) {
    return 'Please enter a valid email address';
  }
  return '';
};

export const validateName = (name) => {
  if (!name || name.trim().length === 0) {
    return 'Name is required';
  }
  if (name.trim().length < 2) {
    return 'Name must be at least 2 characters';
  }
  if (name.trim().length > 200) {
    return 'Name is too long';
  }
  return '';
};

export const validateMessage = (message) => {
  if (!message || message.trim().length === 0) {
    return 'Message is required';
  }
  if (message.trim().length < 10) {
    return 'Message must be at least 10 characters';
  }
  if (message.trim().length > 2000) {
    return 'Message is too long';
  }
  return '';
};

export const validateBudget = (budget) => {
  if (!budget || budget.trim().length === 0) {
    return 'Budget range is required';
  }
  return '';
};

export const validateLoginForm = (email, password) => {
  const errors = {};
  const emailError = validateEmail(email);
  if (emailError) errors.email = emailError;
  if (!password || password.length === 0) {
    errors.password = 'Password is required';
  }
  return errors;
};

export const validateLeadForm = (name, email, budget, message) => {
  const errors = {};
  const nameError = validateName(name);
  if (nameError) errors.name = nameError;
  const emailError = validateEmail(email);
  if (emailError) errors.email = emailError;
  const budgetError = validateBudget(budget);
  if (budgetError) errors.budget = budgetError;
  const messageError = validateMessage(message);
  if (messageError) errors.message = messageError;
  return errors;
};

