import React, { useEffect, useState } from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import {
  getCompletedPlanCount,
  getCalmTimeAverage,
  getHydrationPercentage,
} from '../../utils/petScores';

const neutralGifs = [
  require('../../assets/blinking.gif'),
  require('../../assets/shifting.gif'),
  require('../../assets/winking.gif'),
];

const states = [
  require('../../assets/state1.gif'),
  require('../../assets/state2.gif'),
  require('../../assets/blinking.gif'),
  require('../../assets/state3.gif'),
  require('../../assets/state4.gif'),
];

const VirtualPet = () => {
  const [plannerScore, setPlannerScore] = useState(0);
  const [calmScore, setCalmScore] = useState(0);
  const [hydrationScore, setHydrationScore] = useState(0);
  const [petState, setPetState] = useState(2); // default to neutral
  const [showDevMenu, setShowDevMenu] = useState(false);
  const [stateScore, setStateScore] = useState(0.5);
  const [currentNeutralGif, setCurrentNeutralGif] = useState(neutralGifs[0]);

  useEffect(() => {
    async function fetchScores() {
      calmTimeAverage = await getCalmTimeAverage();
      hydrationPercentage = await getHydrationPercentage();
      completedPlanCount = await getCompletedPlanCount();
      setPlannerScore(completedPlanCount);
      setCalmScore(calmTimeAverage);
      setHydrationScore(hydrationPercentage);
    }

    fetchScores();

    getStateScore(plannerScore, calmScore, hydrationScore);
    const state = getPetState();

    // If the state is changing (it’s different from the current state), update pet state
    if (state !== petState) {
      setPetState(state);

      // Randomize the neutral GIF only when entering neutral state (state 2)
      if (state === 2) {
        const randomGif =
          neutralGifs[Math.floor(Math.random() * neutralGifs.length)];
        setCurrentNeutralGif(randomGif);
      }
    }
  }, [plannerScore, calmScore, hydrationScore, petState]);

  const getStateScore = (plannerScore, calmScore, hydrationScore) => {
    const normPlanner = Math.max(0, Math.min(1, plannerScore / 5));
    const normCalm = Math.max(0, Math.min(1, calmScore / 60));
    const normHydration = Math.max(0, Math.min(1, hydrationScore / 100));

    setStateScore(0.4 * normPlanner + 0.3 * normCalm + 0.3 * normHydration);
  };

  const getPetState = () => {
    if (stateScore < 0.2) return 0; // State 1: Negative
    if (stateScore < 0.4) return 1; // State 2
    if (stateScore < 0.6) return 2; // State 3: Neutral
    if (stateScore < 0.8) return 3; // State 4
    return 4; // State 5: positive
  };

  const toggleDevMenu = () => {
    setShowDevMenu((prev) => !prev);
  };

  const adjustScore = (type, delta) => {
    if (type === 'planner') {
      setPlannerScore((prev) => prev + delta);
    } else if (type === 'calm') {
      setCalmScore((prev) => prev + delta);
    } else if (type === 'hydration') {
      setHydrationScore((prev) => prev + delta);
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={toggleDevMenu}>
        <Image
          source={petState === 2 ? currentNeutralGif : states[petState]}
          style={styles.image}
        />
      </TouchableOpacity>

      {/* dev menu  ***FOR TESTING ONLY*** */}
      {showDevMenu && (
        <View style={styles.devMenu}>
          <View style={styles.menuItem}>
            <Text style={styles.menuText}>Planner Score: {plannerScore}</Text>
            <TouchableOpacity
              onPress={() => adjustScore('planner', -1)}
              style={styles.button}
            >
              <Text style={styles.buttonText}>-</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => adjustScore('planner', 1)}
              style={styles.button}
            >
              <Text style={styles.buttonText}>+</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.menuItem}>
            <Text style={styles.menuText}>Calm Score: {calmScore}</Text>
            <TouchableOpacity
              onPress={() => adjustScore('calm', -3)}
              style={styles.button}
            >
              <Text style={styles.buttonText}>-</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => adjustScore('calm', 3)}
              style={styles.button}
            >
              <Text style={styles.buttonText}>+</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.menuItem}>
            <Text style={styles.menuText}>
              Hydration Score: {hydrationScore}
            </Text>
            <TouchableOpacity
              onPress={() => adjustScore('hydration', -5)}
              style={styles.button}
            >
              <Text style={styles.buttonText}>-</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => adjustScore('hydration', 5)}
              style={styles.button}
            >
              <Text style={styles.buttonText}>+</Text>
            </TouchableOpacity>
          </View>
          <Text style={styles.menuItem}>State Score: {stateScore}</Text>
        </View>
      )}
      {/* end dev menu */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: 200,
    height: 200,
  },
  devMenu: {
    position: 'absolute',
    bottom: 300,
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 5,
    zIndex: 1000,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 5,
  },
  menuText: {
    marginRight: 10,
    fontSize: 16,
  },
  button: {
    marginHorizontal: 5,
    paddingVertical: 5,
    paddingHorizontal: 10,
    backgroundColor: '#ddd',
    borderRadius: 4,
  },
  buttonText: {
    fontSize: 16,
  },
});

export default VirtualPet;
