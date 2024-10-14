import axios from "axios";

// Dummies User Id / Temporary
const userId = "ella";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

// TASKS API
export const getTodayTasks = () => {
  const response = axios.get(`${BASE_URL}/tasks/today/${userId}`);

  return response;
};

export const getImportantTasks = () => {
  const response = axios.get(`${BASE_URL}/tasks/important/${userId}`);

  return response;
};

export const updateTaskImportance = async ({
  taskId,
  toImportantStatus,
}: {
  taskId: string;
  toImportantStatus: boolean;
}) => {
  await axios.patch(`${BASE_URL}/tasks/important/${taskId}`, {
    toImportantStatus,
  });
};

export const updateCompleted = async ({
  taskId,
  toCompletedStatus,
}: {
  taskId: string;
  toCompletedStatus: boolean;
}) => {
  await axios.patch(`${BASE_URL}/tasks/complete/${taskId}`, {
    toCompletedStatus,
  });
};

export const addNewTask = async (data: object) => {
  const response = await axios.post(`${BASE_URL}/tasks/create/${userId}`, data);

  return response.data.data;
};

export const deleteTask = async (taskId: string) => {
  const response = await axios.delete(`${BASE_URL}/tasks/delete/${taskId}`);

  return response.data.status;
};

export const searchTasks = async (searchQuery: string) => {
  const response = await axios.get(
    `${BASE_URL}/tasks/search/${userId}/${searchQuery}`
  );

  return response.data;
};

// GROUP API

export const getGroupByLabel = async () => {
  const response = await axios.get(`${BASE_URL}/tasks/group/method/${userId}`);

  return response.data.data;
};

export const getTasksByGroup = (groupId: string) => {
  try {
    const response = axios.get(`${BASE_URL}/tasks/group/${groupId}/${userId}`);
    return response;
  } catch (error) {
    throw error;
  }
};

export const createNewGroup = async (newGroupName: string) => {
  const response = await axios.post(
    `${BASE_URL}/tasks/group/method/${userId}`,
    {
      title: newGroupName,
    }
  );

  return response.data.data;
};

// disini userId itu task id, belom diganti
export const editGroup = async (newGroupName: string, userId: string) => {
  await axios.patch(`${BASE_URL}/tasks/group/method/${userId}`, {
    title: newGroupName,
  });
};

export const deleteGroup = async (groupId: string) => {
  const response = await axios.delete(
    `${BASE_URL}/tasks/group/method/${groupId}`
  );

  return response.data;
};

// USER API
// REGISTER
export const signUp = async (data: {
  email: string;
  name: string;
  password: string;
}) => {
  try {
    const user = await axios.post(`${BASE_URL}/auth/register`, data);
    return user;
  } catch (error) {
    console.log("An Error occured.");
  }
};

export const signIn = async (data: { email: string; password: string }) => {
  try {
    const user = await axios.post(`${BASE_URL}/auth/login`, data);

    return user;
  } catch (error) {
    console.log("An Error occured.");
  }
};
