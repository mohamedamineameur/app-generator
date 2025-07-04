import api from "./main.service";
  
  export interface User {
      id: string;
    username: string;
    email: string;
    password: string;
    role: string;
  }
  
  export function userService() {
      const createUser = async (user: Omit<User, "id">) => {
          return await api.post("/users", user);
      };

      const getAllUsers = async () => {
          return await api.get("/users");
      };

      const getUserById = async (id: string) => {
          return await api.get("/users/" + id);
      };

      const updateUser = async (id: string, user: Omit<User, "id">) => {
          return await api.patch("/users/" + id, user);
      };

      const deleteUser = async (id: string) => {
          return await api.delete("/users/" + id);
      };

      const loginUser = async (credentials: { username: string; password: string }) => {
          return await api.post("/users/login", credentials);
      };
  
      const me = async () => {
          return await api.get("/users/me");
      };
      const logoutUser = async () => {
          return await api.post("/users/logout");
        };
      return {
          createUser,
        getAllUsers,
        getUserById,
        updateUser,
        deleteUser,
        loginUser,
        me,
        logoutUser
      };
  }
  