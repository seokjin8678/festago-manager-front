export const FileOwnerType = {
  ARTIST: 'ARTIST',
  SCHOOL: 'SCHOOL',
  SOCIAL_MEDIA: 'SOCIAL_MEDIA',
  FESTIVAL: 'FESTIVAL',
  MEMBER: 'MEMBER',
} as const;
export type FileOwnerType = typeof FileOwnerType[keyof typeof FileOwnerType]
