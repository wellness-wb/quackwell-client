import { MaterialIcons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import React, { useState } from 'react';
import {
  Alert,
  ImageBackground,
  SafeAreaView,
  StyleSheet,
  Switch,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import { signOut } from '../../utils/auth';

const Settings = ({ navigation }) => {
  const [darkMode, setDarkMode] = useState(false);
  const [allowPrivateMessages, setAllowPrivateMessages] = useState(false);
  const [option3, setOption3] = useState(false);

  const handleLogout = async () => {
    Alert.alert(
      'Logout',
      'Are you sure you want to logout?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Logout',
          style: 'destructive',
          onPress: async () => {
            try {
              await signOut();
              navigation.reset({
                index: 0,
                routes: [{ name: 'Login' }],
              });
            } catch (error) {
              alert('Logout error: ' + error);
            }
          },
        },
      ],
      { cancelable: false },
    );
  };

  const colors = {
    textColor: darkMode ? '#f4f3f4' : '#153CE6',
    backgroundColor: darkMode
      ? 'rgba(30, 30, 30, 0.8)'
      : 'rgba(255, 255, 255, 0.8)',
    gradientColors: darkMode ? ['#2a3852', '#462639'] : ['#739cef', '#f3caaf'],
    iconGradientColors: darkMode
      ? ['#364156', '#513643']
      : ['#e6f1fb', '#F3CAAF'],
    borderColor: darkMode ? '#f4f3f4' : '#153CE6',
    switchTrackColor: {
      false: '#767577',
      true: darkMode ? '#364156' : '#739cef',
    },
    switchThumbColor: darkMode ? '#f4f3f4' : '#153CE6',
    switchIOSBackgroundColor: darkMode ? '#513643' : '#e6f1fb',
  };

  return (
    <ImageBackground
      source={require('../../assets/background.png')}
      style={styles.background}
      resizeMode="cover"
    >
      <SafeAreaView style={styles.safeArea}>
        <TouchableOpacity
          style={[
            styles.backButton,
            { backgroundColor: colors.backgroundColor },
          ]}
          onPress={() => navigation.navigate('SocialMain')}
        >
          <MaterialIcons name="arrow-back" size={28} color={colors.textColor} />
        </TouchableOpacity>
      </SafeAreaView>

      <View style={styles.container}>
        <View style={styles.topSpace} />
        <LinearGradient
          colors={colors.gradientColors}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.gradient}
        >
          <View style={styles.contentContainer}>
            <Text style={[styles.header, { color: colors.textColor }]}>
              Settings:
            </Text>

            {/* Accessibility Section */}
            <View style={[styles.section, { borderColor: colors.borderColor }]}>
              <View
                style={[
                  styles.sectionContent,
                  { backgroundColor: colors.backgroundColor },
                ]}
              >
                <Text
                  style={[styles.sectionTitle, { color: colors.textColor }]}
                >
                  Accessibility:
                </Text>

                <View style={styles.optionRow}>
                  <Text
                    style={[styles.optionText, { color: colors.textColor }]}
                  >
                    Dark Mode
                  </Text>
                  <Switch
                    trackColor={colors.switchTrackColor}
                    thumbColor={darkMode ? colors.switchThumbColor : '#f4f3f4'}
                    ios_backgroundColor={colors.switchIOSBackgroundColor}
                    onValueChange={() => setDarkMode(!darkMode)}
                    value={darkMode}
                  />
                </View>

                <View style={styles.optionRow}>
                  <Text
                    style={[styles.optionText, { color: colors.textColor }]}
                  >
                    Allow Private Messages
                  </Text>
                  <Switch
                    trackColor={colors.switchTrackColor}
                    thumbColor={
                      allowPrivateMessages ? colors.switchThumbColor : '#f4f3f4'
                    }
                    ios_backgroundColor={colors.switchIOSBackgroundColor}
                    onValueChange={() =>
                      setAllowPrivateMessages(!allowPrivateMessages)
                    }
                    value={allowPrivateMessages}
                  />
                </View>

                <View style={styles.optionRow}>
                  <Text
                    style={[styles.optionText, { color: colors.textColor }]}
                  >
                    Option 3
                  </Text>
                  <Switch
                    trackColor={colors.switchTrackColor}
                    thumbColor={option3 ? colors.switchThumbColor : '#f4f3f4'}
                    ios_backgroundColor={colors.switchIOSBackgroundColor}
                    onValueChange={() => setOption3(!option3)}
                    value={option3}
                  />
                </View>
              </View>
            </View>

            {/* Login Section */}
            <View style={[styles.section, { borderColor: colors.borderColor }]}>
              <View
                style={[
                  styles.sectionContent,
                  { backgroundColor: colors.backgroundColor },
                ]}
              >
                <Text
                  style={[styles.sectionTitle, { color: colors.textColor }]}
                >
                  Login:
                </Text>

                <TouchableOpacity
                  style={styles.optionRow}
                  onPress={() => console.log('Change Password')}
                >
                  <Text
                    style={[styles.optionText, { color: colors.textColor }]}
                  >
                    Change Password
                  </Text>
                  <LinearGradient
                    colors={colors.iconGradientColors}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 1 }}
                    style={styles.iconContainer}
                  >
                    <MaterialIcons
                      name="lock-outline"
                      size={24}
                      color={colors.textColor}
                    />
                  </LinearGradient>
                </TouchableOpacity>

                <TouchableOpacity
                  style={styles.optionRow}
                  onPress={() => console.log('Change Email')}
                >
                  <Text
                    style={[styles.optionText, { color: colors.textColor }]}
                  >
                    Change Email
                  </Text>
                  <LinearGradient
                    colors={colors.iconGradientColors}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 1 }}
                    style={styles.iconContainer}
                  >
                    <MaterialIcons
                      name="email"
                      size={24}
                      color={colors.textColor}
                    />
                  </LinearGradient>
                </TouchableOpacity>
              </View>
            </View>

            {/* Logout Section */}
            <View style={[styles.section, { borderColor: colors.borderColor }]}>
              <View
                style={[
                  styles.sectionContent,
                  { backgroundColor: colors.backgroundColor },
                ]}
              >
                <Text
                  style={[styles.sectionTitle, { color: colors.textColor }]}
                >
                  Account:
                </Text>

                <TouchableOpacity
                  style={styles.logoutButton}
                  onPress={handleLogout}
                >
                  <Text
                    style={[styles.logoutText, { color: colors.textColor }]}
                  >
                    Logout
                  </Text>
                  <LinearGradient
                    colors={colors.iconGradientColors}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 1 }}
                    style={styles.iconContainer}
                  >
                    <MaterialIcons
                      name="logout"
                      size={24}
                      color={colors.textColor}
                    />
                  </LinearGradient>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </LinearGradient>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
  },
  safeArea: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 10,
    paddingTop: hp('5%'),
  },
  backButton: {
    margin: wp('3%'),
    width: wp('10%'),
    height: wp('10%'),
    borderRadius: wp('5%'),
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
  },
  container: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  topSpace: {
    flex: 0.1,
  },
  gradient: {
    height: hp('90%'),
    borderTopLeftRadius: wp('7%'),
    borderTopRightRadius: wp('7%'),
    padding: wp('5%'),
    overflow: 'hidden',
    opacity: 0.77,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.2,
    shadowRadius: 10,
    elevation: 8,
  },
  contentContainer: {
    flex: 1,
    paddingTop: hp('2%'),
  },
  header: {
    fontSize: wp('6%'),
    fontWeight: 'bold',
    marginBottom: hp('2%'),
    color: '#153CE6',
  },
  section: {
    marginBottom: hp('2%'),
    borderRadius: wp('5%'),
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#153CE6',
  },
  sectionContent: {
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    padding: wp('4%'),
    borderRadius: wp('5%'),
  },
  sectionTitle: {
    fontSize: wp('4.5%'),
    fontWeight: 'bold',
    marginBottom: hp('1%'),
    color: '#153CE6',
  },
  optionRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: hp('1%'),
  },
  optionText: {
    fontSize: wp('4%'),
    color: '#153CE6',
  },
  iconContainer: {
    width: wp('8%'),
    height: wp('8%'),
    borderRadius: wp('4%'),
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 5,
  },
  logoutButton: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: hp('1.5%'),
  },
  logoutText: {
    fontSize: wp('4%'),
    color: '#153CE6',
    fontWeight: 'bold',
  },
});

export default Settings;
