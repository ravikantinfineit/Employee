// utils/auth.ts

export const login = (email: string, password: string): Promise<string> => {
  return new Promise((resolve, reject) => {
    if (email === "admin@example.com" && password === "password") {
      const token = "fake-jwt-token";
      localStorage.setItem("token", token); // Save token
      resolve(token);
    } else {
      reject("Invalid email or password");
    }
  });
};

export const isLoggedIn = (): boolean => {
  return !!localStorage.getItem("token");
};

export const logout = () => {
  localStorage.removeItem("token");
};
