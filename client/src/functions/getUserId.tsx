const userItem = localStorage.getItem("user");
export const id = userItem ? JSON.parse(userItem).id : null;
