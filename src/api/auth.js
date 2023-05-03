import backendApi from "./config";

const login = async ({ user, password }) => {
  try {
    const { data } = await backendApi.post("/auth/login", {
      name: user,
      password,
    });
    if (data) {
      localStorage.setItem("token", data.token);
      localStorage.setItem("USER_INFO", data);
    }
    return data;
  } catch (err) {
    const res = err.response.data;
    return res;
  }
};

const register = async (payload) => {
  try {
    const { data } = await backendApi.post("/auth/register", payload);
    return data;
  } catch (error) {
    const res = error.response.data;
    return res;
  }
};

const getUserInfo = async () => {
  try {
    const { data } = await backendApi.get("/auth/info");
    return data;
  } catch (error) {
    const res = error.response.data;
    return res;
  }
};

export { login, register, getUserInfo };
