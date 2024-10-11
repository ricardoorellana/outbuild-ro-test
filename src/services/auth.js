export const login = (email, password) => {
  return new Promise((resolve, reject) => {
    const hardcodedEmail = 'prologin@prologin.com';
    const hardcodedPassword = 'ProLogin123456';

    setTimeout(() => {
      if (email === hardcodedEmail && password === hardcodedPassword) {
        resolve({ success: true, message: 'Login successful' });
      } else {
        reject({ success: false, message: 'Invalid email or password' });
      }
    }, 1000);
  });
};