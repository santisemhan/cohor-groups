export interface GroupQueryResponse {
  id: string
  name: string
  GroupInterest: { Interest: { id: string; name: string; unicode: string } }[]
  users: { user: { id: string; name: string | null } }[]
}
