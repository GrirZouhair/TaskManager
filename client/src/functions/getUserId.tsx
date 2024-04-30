const userItem = localStorage.getItem("user");
export const userId = userItem ? JSON.parse(userItem).id : null;
