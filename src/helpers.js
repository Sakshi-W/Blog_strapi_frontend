    
import { AUTH_TOKEN } from "./constant";

export const getToken = () => {
  return localStorage.getItem(AUTH_TOKEN);
};

export const setToken = (token) => {
  if (token) {
    localStorage.setItem(AUTH_TOKEN, token);
  }
};

export const removeToken = () => {
  localStorage.removeItem(AUTH_TOKEN);
};


export const getRandomImage = () => {
  const images = [
    "https://img.freepik.com/free-photo/wide-angle-shot-single-tree-growing-clouded-sky-during-sunset-surrounded-by-grass_181624-22807.jpg?w=2000",
    "https://images.pexels.com/photos/268533/pexels-photo-268533.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRokzSABLsh7ELIjifmRGa03s2bj1GW_aP8cQ&usqp=CAU",
    // Add more image paths as needed
  ];

  const randomIndex = Math.floor(Math.random() * images.length);
  return images[randomIndex];
};