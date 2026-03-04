import axios from "axios";

export const loginUser = async (data) => {

  const res = await axios.post(
    "http://localhost:5000/api/auth/login",
    data,
    {
      headers:{ "Content-Type":"application/json" }
    }
  );

  // ⭐ Save properly structured data
  localStorage.setItem(
    "userInfo",
    JSON.stringify({
      token: res.data.token,
      user: res.data.user
    })
  );

  return res.data;
};

export const registerUser = async (data) => {
  try {

    const res = await axios.post(
      "http://localhost:5000/api/auth/register",
      data,
      {
        headers:{ "Content-Type":"application/json" }
      }
    );

    return res.data;

  } catch (error) {

    alert(error.response?.data?.message || "Registration failed");
    throw error;
  }
};