



export const config = () => {
  const token = localStorage.getItem("userToken");
  const config: object = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }
  return config
}
