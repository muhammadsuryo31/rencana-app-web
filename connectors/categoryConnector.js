import { api } from "../src/utils"

const getAllCategory = async() => {
  return await api.get('categories')
}

const deleteCategory = async(categoryId) => {
  await api.delete(`categories/${categoryId}`)
}

const putCategory = async(categoryId, updatedData) => {
  await api.put(`categories/${categoryId}`, updatedData);
}

export { getAllCategory, deleteCategory, putCategory }