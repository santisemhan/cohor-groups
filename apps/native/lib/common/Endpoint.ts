import { API_URL } from "./Environment"

export const endpoint = {
  example: `${API_URL}/protected`,
  auth: {
    login: `${API_URL}/auth/login`,
    register: `${API_URL}/auth/register`,
    validate: `${API_URL}/auth/validate`,
    resend: `${API_URL}/auth/resend`
  }
}
