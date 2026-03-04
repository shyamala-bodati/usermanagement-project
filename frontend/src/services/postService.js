import axios from "axios";

const API = "http://localhost:5000/api/posts";

const token = () => {
  return JSON.parse(localStorage.getItem("userInfo"))?.token;
};

// CREATE POST
export const createPost = async (content) => {
  const res = await axios.post(
    API,
    { content },
    {
      headers: {
        Authorization: `Bearer ${token()}`
      }
    }
  );
  return res.data;
};

// GET MY POSTS
export const getMyPosts = async () => {
  const res = await axios.get(`${API}/my`, {
    headers: {
      Authorization: `Bearer ${token()}`
    }
  });
  return res.data;
};
// UPDATE POST
export const updatePost = async (id, content) => {
  const res = await axios.put(
    `${API}/${id}`,
    { content },
    {
      headers: {
        Authorization: `Bearer ${token()}`
      }
    }
  );
  return res.data;
};

// DELETE POST
export const deletePost = async (id) => {
  await axios.delete(`${API}/${id}`, {
    headers: {
      Authorization: `Bearer ${token()}`
    }
  });
};
export const getAllPosts = async () => {
  const res = await axios.get(`${API}/all`, {
    headers: {
      Authorization: `Bearer ${token()}`
    }
  });
  return res.data;
};