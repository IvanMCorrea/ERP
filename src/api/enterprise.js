import backendApi from "./config";

const inviteEmployee = async (payload) => {
  try {
    const { data } = await backendApi.post(
      "/enterprise/inviteEmployee",
      payload
    );
    return data;
  } catch (error) {
    const res = error.response.data;
    return res;
  }
};

const getEmployeesByPage = async (page, payload) => {
  try {
    const { data } = await backendApi.post(
      `/enterprise/getEmployeesPage/${page}`,
      {
        params: { ...payload },
      }
    );
    return data;
  } catch (error) {
    const res = error.response.data;
    return res;
  }
};

export { inviteEmployee, getEmployeesByPage };
