

export const UserToken = () => {
    const token = localStorage.getItem("userToken");
    return token
}

export const config = {
    headers: {
      Authorization: `Bearer ${UserToken()}`,
    },
  }