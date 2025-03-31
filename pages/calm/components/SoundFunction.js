// Helper function that allows user to choose the sound option they prefer
const loadAndPlaySound = async () => {
  let soundFile;
  // Here funcitonality that let the users choose the sound file based on user's choice
  if (selectedSound === 'raining') {
    soundFile = require('../../../assets/raining.mp3');
  } else if (selectedSound === 'meditation') {
    soundFile = require('../../../assets/suzumeChilling.mp3');
  } else {
    soundFile = require('../../../assets/raining.mp3'); //By default, it's raining sound
  }

  // Load the sound with looping enabled (if desired)
  const playSound = async (soundFile) => {
    try {
      const { sound: playbackSound } = await Audio.Sound.createAsync(
        soundFile,
        { shouldPlay: true, isLooping: true },
      );
      setSound(playbackSound);
      await playbackSound.playAsync();
    } catch (error) {
      console.error('Error playing sound!!!', error); // Handle any errors in loading or playing the sound
    }
  };
};

// Ensures the function only works if the sound is currently loaded and playing, otherwise no sound is playing so function does nothing
const stopSound = async () => {
  if (sound) {
    await sound.stopAsync(); //Stops the audio immediately, requiring it to be replayed from very beginning
    await sound.unloadAsync(); //Free up some memories here by unloading the audio file
    setSound(null); // resets the sound state to null which means you make sure the app does not attempt the stopped or unloaded sound later on
  }
};
