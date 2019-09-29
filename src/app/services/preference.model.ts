export interface IActivePreference {
  theme: ITheme;
  font: IFont;
  isDarkMode: boolean;
  direction: 'ltr' | 'rtl';
}
export interface IPreferenceOptions {
  themes: ITheme[];
  fonts: IFont[];
  darkMode: {
    default: false,
    active: string,
    inactive: string,
  };
  direction: 'ltr' | 'rtl';
}

export interface ITheme {
  themeClass: string;
  themeName: string;
  color: {
    primary: string
  };
  isDefault?: boolean;
}
export interface IFont {
  fontClass: string;
  fontText: string;
  fontSize: number;
  isDefault: boolean;
}
