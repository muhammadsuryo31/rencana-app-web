import { getAllCategory, putCategory, deleteCategory } from './categoryConnector';
import { register, login, logout } from './usersConnector';
import { putTask, getOneTask, getAllTasks, deleteTask } from './taskConnector';

export {
  register,
  login,
  logout,
  putTask,
  getOneTask,
  getAllTasks,
  deleteTask,
  getAllCategory,
  putCategory,
  deleteCategory
}