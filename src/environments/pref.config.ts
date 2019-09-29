import { IPreferenceOptions } from '../app/services/preference.model';
export const prefOptions: IPreferenceOptions = {
  themes: [{
    color: {
      primary: '#2196f3',
    },
    isDefault: true,
    themeClass: 'theme-blue',
    themeName: 'Blue theme'
  }, {
    color: {
      primary: '#3f51b5',
    },
    isDefault: false,
    themeClass: 'theme-indigo',
    themeName: 'Indigo theme'
  }, {
    color: {
      primary: '#9c27b0',
    },
    isDefault: false,
    themeClass: 'theme-purple',
    themeName: 'Purple theme'
  }],
  fonts: [{
    fontClass: 'font-xs',
    fontSize: 10,
    fontText: 'Extra Small Font',
    isDefault: false
  }, {
    fontClass: 'font-s',
    fontSize: 12,
    fontText: 'Small Font',
    isDefault: false
  }, {
    fontClass: 'font-n',
    fontSize: 14,
    fontText: 'Normal Font',
    isDefault: true
  }, {
    fontClass: 'font-l',
    fontSize: 16,
    fontText: 'Large Font',
    isDefault: false
  }, {
    fontClass: 'font-xl',
    fontSize: 18,
    fontText: 'Extra Large Font',
    isDefault: false
  }],
  darkMode: {
    default: false,
    active: 'night-mode',
    inactive: 'day-mode'
  },
  direction: 'ltr'
};
