export const AuthType = {
  ROOT: 'root',
  ADMIN: 'admin',
  SCHOOL: 'school',
  UNASSIGNED: 'unassigned',
} as const;
export type AuthType = typeof AuthType[keyof typeof AuthType]
