import axios from "axios";
const userId = "cm0w6tuj3000010i7z2ppri91";

export const getTodayTasks = () => {
  const response = axios.get(`http://192.168.1.7:4000/tasks/today/${userId}`);

  return response;
};

export const getTasks = () => {
  const response = axios.get(
    `http://192.168.1.7:4000/tasks/group/tasks/${userId}`
  );

  return response;
};
export const getImportantTasks = () => {
  const response = axios.get(
    `http://192.168.1.7:4000/tasks/important/${userId}`
  );

  return response;
};

export const updateTaskImportance = async (data: object) => {
  const response = await axios.patch(
    `http://192.168.1.7:4000/tasks/important/set`,
    data
  );

  return response.data.data.important;
};

export const updateCompleted = async ({
  taskId,
  toCompletedStatus,
}: {
  taskId: string;
  toCompletedStatus: boolean;
}) => {
  const response = await axios.patch(
    `http://192.168.1.7:4000/tasks/completed/set/${taskId}`,
    { toCompletedStatus }
  );

  return response.data.data.completed;
};

export const addNewTask = async (data: object) => {
  const response = await axios.post(
    `http://192.168.1.7:4000/tasks/create/${userId}`,
    data
  );

  return response.data.status;
};

export const deleteTask = async (taskId: string) => {
  const response = await axios.delete(
    `http://192.168.1.7:4000/tasks/delete/${taskId}`
  );

  return response.data.status;
};
