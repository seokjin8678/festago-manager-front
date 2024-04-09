export const OwnerType = {
  ARTIST: 'ARTIST',
  SCHOOL: 'SCHOOL',
} as const;
export type OwnerType = typeof OwnerType[keyof typeof OwnerType]
