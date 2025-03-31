import { Audio } from 'expo-av'; // Importing the Audio module from expo-av to handle audio playback
import React from 'react'; // Importing React to use hooks and components

// Function to map selected sound names to actual sound files
const getSoundFile = (soundName) => {
  switch (soundName) {
    case 'Raining for power nap':
      return require('../../../assets/raining.mp3');
    case 'Suzume Soundtrack to Calm Yourself':
      return require('../../../assets/peacefulOcean.mp3');
    case 'Ocean Waves to reduce your stress':
      return require('../../../assets/suzumeChilling.mp3');
    default:
      return require('../../../assets/raining.mp3'); // Default to rain sound
  }
};

// Load the sound with looping enabled (if desired)
const playSound = async (soundFiles) => {
  try {
    const { sound: playbackSound } = await Audio.Sound.createAsync(soundFiles, {
      shouldPlay: true,
      isLooping: true,
    });
    setSound(playbackSound);
    await playbackSound.playAsync();
  } catch (error) {
    console.error('Error playing sound!!!', error); // Handle any errors in loading or playing the sound
  }
};

// Ensures the function only works if the sound is currently loaded and playing, otherwise no sound is playing so function does nothing
const stopSound = async () => {
  if (sound) {
    await sound.stopAsync(); //Stops the audio immediately, requiring it to be replayed from very beginning
    await sound.unloadAsync(); //Free up some memories here by unloading the audio file
    setSound(null); // resets the sound state to null which means you make sure the app does not attempt the stopped or unloaded sound later on
  }
};

export default SoundFunction;
