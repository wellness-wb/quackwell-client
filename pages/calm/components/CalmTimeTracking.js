import AsyncStorage from '@react-native-async-storage/async-storage';

export async function saveUsage(seconds) {
  try {
    const today = new Date().toISOString().split('T')[0];
    const key = `usage_${today}`;
    const existing = await AsyncStorage.getItem(key);
    const total = existing
      ? parseInt(existing, 10) + Math.round(seconds)
      : Math.round(seconds);
    await AsyncStorage.setItem(key, total.toString());
  } catch (e) {
    console.error('Error saving usage:', e);
  }
}

export async function getUsageForDate(dateString) {
  try {
    const key = `usage_${dateString}`;
    const existing = await AsyncStorage.getItem(key);
    return existing ? parseInt(existing, 10) : 0;
  } catch (e) {
    console.error('Error retrieving usage:', e);
    return 0;
  }
}
