import { group } from "console"
import { API_URL } from "./Environment"

export const endpoint = {
  example: `${API_URL}/protected`,
  auth: {
    loggedUser: `${API_URL}/auth/logged-user`,
    login: `${API_URL}/auth/login`,
    register: `${API_URL}/auth/register`,
    validate: `${API_URL}/auth/validate`,
    resend: `${API_URL}/auth/resend`
  },
  user: {
    onboarding: `${API_URL}/users`,
    imagePresignedParams: `${API_URL}/users/image-presigned-params`
  },
  group: {
    join: `${API_URL}/groups/join`,
    create: `${API_URL}/groups`
  }
}
