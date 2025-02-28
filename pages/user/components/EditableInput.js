import { LinearGradient } from 'expo-linear-gradient';
import React, { useEffect, useRef, useState } from 'react';
import {
  Keyboard,
  Platform,
  Keyboard,
  Platform,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';

const EditableInput = ({
const EditableInput = ({
  placeholder,
  value,
  onChangeText,
  secureTextEntry = false,
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const inputRef = useRef(null);

  const handleEdit = () => {
    setIsEditing(true);
    setTimeout(() => {
      inputRef.current?.focus();
    }, 100);
  };

  useEffect(() => {
    if (Platform.OS === 'android') {
      const keyboardListener = Keyboard.addListener('keyboardDidHide', () => {
        setIsEditing(false);
      });

      return () => keyboardListener.remove();
    }
  }, []);

  return (
    <View style={styles.container}>
      {isEditing ? (
        <TextInput
          ref={inputRef}
          ref={inputRef}
          style={styles.input}
          value={value}
          onChangeText={onChangeText}
          onBlur={() => setIsEditing(false)}
          autoCapitalize="none"
          placeholder={placeholder}
          placeholderTextColor="#153CE6"
          secureTextEntry={secureTextEntry}
        />
      ) : (
        <TouchableOpacity style={styles.button} onPress={handleEdit}>
        <TouchableOpacity style={styles.button} onPress={handleEdit}>
          <LinearGradient
            colors={['#F3CAAF', '#739CEF']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.gradient}
          >
            <View style={styles.textContainer}>
              <Text
                style={styles.buttonText}
                numberOfLines={1}
                ellipsizeMode="tail"
              >
                {value ? (secureTextEntry ? '••••••' : value) : placeholder}
              </Text>
            </View>
          </LinearGradient>
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    marginBottom: 20,
  },
  button: {
    width: wp('70%'),
    height: hp('6%'),
    borderRadius: 25,
    overflow: 'hidden',
  },
  gradient: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    opacity: 0.77,
  },
  textContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'flex-start',
    marginLeft: wp('5%'),
  },
  buttonText: {
    color: '#153CE6',
    fontWeight: 'bold',
  },
  input: {
    width: wp('70%'),
    height: hp('7%'),
    borderRadius: 25,
    backgroundColor: 'rgba(115, 156, 239, 0.3)',
    paddingHorizontal: 20,
    fontWeight: 'bold',
    color: '#153CE6',
  },
});

export default EditableInput;
export default EditableInput;
