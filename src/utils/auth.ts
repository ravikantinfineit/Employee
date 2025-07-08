// utils/auth.ts
import { loginUser } from "../modules/User/UsersApi";

export const login = async (email: string, password: string): Promise<string> => {
  const user = await loginUser(email,password)
  return new Promise((resolve, reject) => {
    if (email === user?.email && password === user.password) {
      const token = "fake-jwt-token";
      localStorage.setItem("token", token); // Save token
      localStorage.setItem("user_id", String(user.user_id ?? ""))
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
