"use client";

import axios from "axios";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

// PROFILE API
export const getUserProfileData = async () => {
  const response = await axios.get(`${BASE_URL}/user/profile`);
  return response.data;
};

export const logoutAccount = async () => {
  await axios.post(`${BASE_URL}/user/logout`);
};

export const editProfileData = async (data: {
  avatar?: string;
  name?: string;
}) => {
  const response = await axios.patch(`${BASE_URL}/user/profile`, data);

  return response;
};

// TASKS API
export const getTodayTasks = async () => {
  const response = axios.get(`${BASE_URL}/tasks/today`);

  return response;
};

export const getImportantTasks = () => {
  const response = axios.get(`${BASE_URL}/tasks/important`);

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
  const response = await axios.post(`${BASE_URL}/tasks/create`, data);

  return response.data;
};

export const deleteTask = async (taskId: string) => {
  const response = await axios.delete(`${BASE_URL}/tasks/delete/${taskId}`);

  return response.data.status;
};

export const searchTasks = async (searchQuery: string) => {
  const response = await axios.get(`${BASE_URL}/tasks/search/${searchQuery}`);

  return response.data;
};

// GROUP API

export const getGroupByLabel = async () => {
  const response = await axios.get(`${BASE_URL}/tasks/group/method`);

  return response.data.data;
};

export const getTasksByGroup = async (groupId: string) => {
  try {
    const response = await axios.get(`${BASE_URL}/tasks/group/${groupId}`);
    return response;
  } catch (error) {
    throw error;
  }
};

export const getAssignedTask = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/tasks/assignee`);
    return response;
  } catch (error) {
    throw error;
  }
};

export const createNewGroup = async (newGroupName: string) => {
  const response = await axios.post(`${BASE_URL}/tasks/group/method`, {
    title: newGroupName,
  });

  return response.data.data;
};

// disini userId itu task id, belom diganti
export const editGroup = async (newGroupName: string, label: string) => {
  await axios.patch(`${BASE_URL}/tasks/group/method/${label}`, {
    title: newGroupName,
  });
};

export const deleteGroup = async (label: string) => {
  const response = await axios.delete(
    `${BASE_URL}/tasks/group/method/${label}`
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
