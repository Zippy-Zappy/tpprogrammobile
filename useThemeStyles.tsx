// useThemeStyles.ts
export interface ThemeStyles {
  backgroundColor: string;
  textColor: string;
  cardBackground: string;
  buttonBackground: string;
  buttonTextColor: string;
}

export const useThemeStyles = (isLightTheme: boolean): ThemeStyles => {
  return {
    backgroundColor: isLightTheme ? '#f0f0f0' : '#121212',
    textColor: isLightTheme ? '#000' : '#fff',
    cardBackground: isLightTheme ? '#fff' : '#1e1e1e',
    buttonBackground: isLightTheme ? '#e0e0e0' : '#333',
    buttonTextColor: isLightTheme ? '#000' : '#fff'
  };
};
