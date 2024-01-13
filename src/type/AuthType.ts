export const AuthType = {
  ROOT: 'ROOT',
  ADMIN: 'ADMIN',
  SCHOOL: 'SCHOOL',
  UNASSIGNED: 'UNASSIGNED',
} as const;
export type AuthType = typeof AuthType[keyof typeof AuthType]
