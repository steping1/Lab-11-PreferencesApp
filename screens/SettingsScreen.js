import { View, Text, Pressable, StyleSheet } from 'react-native';
import { useTheme } from '../hooks/useTheme'; 
import { useAuth } from '../context/AuthContext';

export default function SettingsScreen({ navigation }) {
  const { theme, toggleTheme } = useTheme(); 
  const { logout } = useAuth(); 

  const handleLogout = () => {
    logout(); 
    navigation.replace('Login'); 
  };

  const isDark = theme === 'dark';
  const containerStyle = [styles.container, { backgroundColor: isDark ? '#121212' : '#FFFFFF' }];
  const textStyle = [styles.text, { color: isDark ? '#FFFFFF' : '#000000' }];

  return (
    <View style={containerStyle}>
      <Text style={textStyle}>Current Theme: {theme.toUpperCase()}</Text>
      
      <Pressable style={styles.button} onPress={toggleTheme}>
        <Text style={styles.buttonText}>Toggle Theme</Text>
      </Pressable>

      <Pressable style={[styles.button, styles.logoutButton]} onPress={handleLogout}>
        <Text style={styles.buttonText}>Logout</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 20 },
  text: { fontSize: 18, marginBottom: 20, fontWeight: 'bold' },
  button: { backgroundColor: '#007AFF', padding: 15, borderRadius: 8, width: '100%', marginBottom: 10 },
  logoutButton: { backgroundColor: '#FF3B30' },
  buttonText: { color: '#FFFFFF', textAlign: 'center', fontWeight: '600' }
});