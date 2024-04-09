export const SocialMediaType = {
  YOUTUBE: 'YOUTUBE',
  X: 'X',
  INSTAGRAM: 'INSTAGRAM',
  FACEBOOK: 'FACEBOOK',
} as const;
export type SocialMediaType = typeof SocialMediaType[keyof typeof SocialMediaType]
