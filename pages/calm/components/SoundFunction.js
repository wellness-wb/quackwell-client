const SoundFunction = {
  getSoundFile: (soundName) => {
    switch (soundName) {
      case 'Raining':
        return require('../../../assets/raining.mp3');
      case 'Suzume Soundtrack':
        return require('../../../assets/suzumeChilling.mp3');
      case 'Ocean Waves':
        return require('../../../assets/peacefulOcean.mp3');
      default:
        return require('../../../assets/raining.mp3');
    }
  },
};

export default SoundFunction;
