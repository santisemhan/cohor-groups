import { API_URL } from "./Environment"

export const endpoint = {
  auth: {
    login: `${API_URL}/auth/login`,
    register: `${API_URL}/auth/register`,
    validate: `${API_URL}/auth/validate`
  }
}
