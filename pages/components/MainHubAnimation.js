import React, { useEffect, useState } from 'react';
import { Image, StyleSheet } from 'react-native';

const gifList = [
  require('../../assets/blinking.gif'),
  require('../../assets/shifting.gif'),
  require('../../assets/winking.gif'),
  require('../../assets/dancing.gif'),
];

const MainHubAnimation = () => {
  const [currentGif, setCurrentGif] = useState(gifList[0]);

  useEffect(() => {
    const interval = setInterval(() => {
      const randomGif = gifList[Math.floor(Math.random() * gifList.length)];
      setCurrentGif(randomGif);
    }, 10000);
    return () => clearInterval(interval);
  }, []);

  return <Image key={currentGif} source={currentGif} style={styles.image} />;
};

const styles = StyleSheet.create({
  gifBox: {},

  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
});

export default MainHubAnimation;
