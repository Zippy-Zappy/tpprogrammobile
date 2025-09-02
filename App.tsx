// App.tsx
import React, { useState } from 'react';
import {
  SafeAreaView,
  View,
  Text,
  useWindowDimensions,
  Pressable
} from 'react-native';
import { baseStyles } from './styles';
import { useThemeStyles } from './useThemeStyles';

export default function App() {
  const [count, setCount] = useState(0);
  const [isLightTheme, setIsLightTheme] = useState(true);

  const { width } = useWindowDimensions();
  const themeStyles = useThemeStyles(isLightTheme);

  const increment = () => {
    if (count < 10) {
      setCount(prev => prev + 1);
    }
  };

  const reset = () => setCount(0);
  const toggleTheme = () => setIsLightTheme(prev => !prev);

  const isMaxReached = count >= 10;

  return (
    <SafeAreaView style={[baseStyles.container, { backgroundColor: themeStyles.backgroundColor }]}>
      <View style={[baseStyles.card, { backgroundColor: themeStyles.cardBackground, width: width * 0.9 }]}>
        <Text style={[baseStyles.counterText, { color: themeStyles.textColor, fontSize: width * 0.2 }]}>
          {count}
        </Text>

        <View style={baseStyles.buttonContainer}>
          {/* +1 Button */}
          <Pressable
            onPress={increment}
            disabled={isMaxReached}
            style={({ pressed }) => [
              baseStyles.button,
              {
                backgroundColor: isMaxReached ? '#888' : themeStyles.buttonBackground,
                opacity: pressed ? 0.7 : 1
              }
            ]}
          >
            <Text style={[baseStyles.buttonText, { color: themeStyles.buttonTextColor }]}>+1</Text>
          </Pressable>

          {/* Reset Button */}
          <Pressable
            onPress={reset}
            style={({ pressed }) => [
              baseStyles.button,
              {
                backgroundColor: themeStyles.buttonBackground,
                opacity: pressed ? 0.7 : 1
              }
            ]}
          >
            <Text style={[baseStyles.buttonText, { color: themeStyles.buttonTextColor }]}>Reset</Text>
          </Pressable>

          {/* Toggle Theme Button */}
          <Pressable
            onPress={toggleTheme}
            style={({ pressed }) => [
              baseStyles.button,
              {
                backgroundColor: themeStyles.buttonBackground,
                opacity: pressed ? 0.7 : 1
              }
            ]}
          >
            <Text style={[baseStyles.buttonText, { color: themeStyles.buttonTextColor }]}>Toggle</Text>
          </Pressable>
        </View>

        {/* Aviso de límite */}
        {isMaxReached && (
          <Text style={baseStyles.warningText}>Máximo alcanzado</Text>
        )}
      </View>
    </SafeAreaView>
  );
}
