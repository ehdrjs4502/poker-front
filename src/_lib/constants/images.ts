export const IMAGES = {
  ICONS: {
    LOGO: "/images/icons/logo.svg",
  },
};

export type ImagePath = (typeof IMAGES)[keyof typeof IMAGES];
