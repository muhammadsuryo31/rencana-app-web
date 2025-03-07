import { api } from "../src/utils";

const putTask = async(taskId, editedData) => {
  return await api.put(`tasks/${taskId}`, editedData);  
}

const getOneTask = async(taskId) => {
  return await api.get(`tasks/${taskId}`)
}

const getAllTasks = async({filterTask, filterPriority, filterCategory}) => {
  const query = `tasks?task=${filterTask}&priority=${filterPriority}&category=${filterCategory}`;
  const tasksData = await api.get(query);
  return tasksData;
}

const deleteTask = async(taskId) => {
  await api.delete(`tasks/${taskId}`);
}

export { putTask, getOneTask, getAllTasks, deleteTask };
