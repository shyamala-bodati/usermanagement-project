import axios from "axios";

const API = "http://localhost:5000/api/users";

const token = () => {
  return JSON.parse(localStorage.getItem("userInfo"))?.token;
};

// GET ALL USERS
export const getAllUsers = async () => {
  const res = await axios.get(API, {
    headers: {
      Authorization: `Bearer ${token()}`
    }
  });
  return res.data;
};

// DELETE USER
export const deleteUser = async (id) => {
  await axios.delete(`${API}/${id}`, {
    headers: {
      Authorization: `Bearer ${token()}`
    }
  });
};

// UPDATE USER (for Edit modal later)
export const updateUser = async (id, updatedData) => {
  const res = await axios.put(`${API}/${id}`, updatedData, {
    headers: {
      Authorization: `Bearer ${token()}`
    }
  });
  return res.data;
};