import axios from "axios";
const userId = "ella";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

export const getTodayTasks = () => {
  const response = axios.get(`${BASE_URL}/tasks/today/${userId}`);

  return response;
};

export const getTasks = () => {
  const response = axios.get(`${BASE_URL}/tasks/group/tasks/${userId}`);

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
  const response = await axios.patch(`${BASE_URL}/tasks/important/${taskId}`, {
    toImportantStatus,
  });

  return response.data.data.important;
};

export const updateCompleted = async ({
  taskId,
  toCompletedStatus,
}: {
  taskId: string;
  toCompletedStatus: boolean;
}) => {
  const response = await axios.patch(`${BASE_URL}/tasks/complete/${taskId}`, {
    toCompletedStatus,
  });

  return response.data.data.completed;
};

export const addNewTask = async (data: object) => {
  const response = await axios.post(`${BASE_URL}/tasks/create/${userId}`, data);

  return response.data.data;
};

export const deleteTask = async (taskId: string) => {
  const response = await axios.delete(`${BASE_URL}/tasks/delete/${taskId}`);

  return response.data.status;
};
