export interface Theme<ThemeType> {
  theme: ThemeType;
}

export interface AppTheme {
  name: string;
  bgColor: string;
  secondaryBgColor: string;
  modalSecondaryBgColor: string;
  borderColor: string;
  secondBorderColor: string;
  textColor: string;
  brandColor: string;
  warningColor: string;
}

export const DarkAppTheme = {
  name: "Dark theme",
  bgColor: "#1A1D23",
  secondaryBgColor: "#161A1F",
  modalSecondaryBgColor: "#25282E",
  borderColor: "#444A57",
  secondBorderColor: "#949494",
  textColor: "#FFFFFF",
  brandColor: "#1FFFAB",
  warningColor: "#EB5353",
};
