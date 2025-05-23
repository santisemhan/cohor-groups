import { API_URL } from "./Environment"

export const endpoint = {
  auth: {
    loggedUser: `${API_URL}/auth/logged-user`,
    login: `${API_URL}/auth/login`,
    register: `${API_URL}/auth/register`,
    validate: `${API_URL}/auth/validate`,
    resend: `${API_URL}/auth/resend`
  },
  user: {
    root: `${API_URL}/users`,
    imagePresignedParams: `${API_URL}/users/image-presigned-params`
  },
  group: {
    root: `${API_URL}/group`,
    groups: `${API_URL}/groups`,
    join: `${API_URL}/groups/join`,
    imagePresignedParams: `${API_URL}/groups/image-presigned-params`
  },
  category: {
    root: `${API_URL}/categories`
  }
}
