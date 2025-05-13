export const validateRegisterInput = ({ username, fullname, email, password }) => {
  if (!username || !fullname || !email || !password) {
    return "All the fields are required.";
  }

  if (!email || !password) {
    return "All the fields are required.";
  }

  const usernameRegex = /^[a-z]+[a-z0-9]*$/;
  if (!usernameRegex.test(username)) {
    return "Username must start with lowercase letters and may contain numbers only after letters. No symbols allowed.";
  }

  const emailRegex = /^[\w.-]+@gmail\.com$/;
  if (!emailRegex.test(email)) {
    return "Only Gmail addresses (ending with @gmail.com) are allowed.";
  }

  if (password.length < 8) {
    return "Password must be at least 8 characters long.";
  }

  if (!/[a-z]/.test(password)) {
    return "Password must contain at least one lowercase letter.";
  }

  if (!/[A-Z]/.test(password)) {
    return "Password must contain at least one uppercase letter.";
  }

  if (!/\d/.test(password)) {
    return "Password must contain at least one number.";
  }

  if (!/[@$!%*?&]/.test(password)) {
    return "Password must contain at least one special character (@, $, !, %, *, ?, &).";
  }

  return null; 
};


export const validateLoginInput = ({ email, password }) => {
  if (!email || !password) {
    return "Email and password are required.";
  }

  return null;
};
