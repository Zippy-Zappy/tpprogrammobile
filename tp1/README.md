1. Deshabilitar +1 al llegar a 10

Al llegar a count === 10, el botón +1 se desactiva (disabled) y se muestra un mensaje ("Máximo alcanzado").

Implementado con disabled + aviso <Text>

2. useThemeStyles() (tipado en TypeScript)

Crea un hook personalizado que retorna los estilos de tema según isLightTheme.

Esto mantiene App.tsx más limpio y reutilizable.

Implementado con:
Estilos separados	useThemeStyles() hook
Tipado de estilos	ThemeStyles en TypeScript
Responsive useWindowDimensions() para ancho/texto

3. Pressable con feedback visual

Pressable permite añadir efectos táctiles y condiciones dinámicas, ideal para botones modernos en Android/iOS.

Implementado con Pressable con pressed ? 0.7 : 1