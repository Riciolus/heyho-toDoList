import axios from "axios";
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

// GROUP API

export const getGroupById = async () => {
  const response = await axios.get(`${BASE_URL}/tasks/group/method/${userId}`);

  return response.data.data;
};

export const getTasksByGroup = (groupId: string) => {
  const response = axios.get(`${BASE_URL}/tasks/group/${groupId}/${userId}`);

  return response;
};

export const createNewGroup = async (newGroupName: string) => {
  const response = await axios.post(
    `${BASE_URL}/tasks/group/method/${userId}`,
    {
      name: newGroupName,
    }
  );

  return response.data.data;
};

export const deleteGroup = async (groupId: string) => {
  const response = await axios.delete(
    `${BASE_URL}/tasks/group/method/${groupId}`
  );
  console.log(response.data);
  return response.data;
};
