const token = localStorage.getItem("token");
if (!token) {
  console.error("Token not found in localStorage.");
}
export const headers = {
  Accept: "application/json",
  Authorization: `Bearer ${token}`,
};
