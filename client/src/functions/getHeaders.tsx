const token = localStorage.getItem("token");
if (!token) {
  console.error("Token non trouvé dans le stockage local.");
}
export const headers = {
  Accept: "application/json",
  Authorization: `Bearer ${token}`,
};
