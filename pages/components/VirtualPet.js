import React, { useEffect, useState } from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import {
  getCalmTimeAverage,
  getCompletedPlanCount,
  getHydrationPercentage,
} from '../../utils/petScores';

const neutralGifs = [
  require('../../assets/blinking.gif'),
  require('../../assets/shifting.gif'),
  require('../../assets/winking.gif'),
  require('../../assets/water.gif'),
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

  const [plannerModifier, setPlannerModifier] = useState(0); //for dev menu only
  const [calmModifier, setCalmModifier] = useState(0); //for dev menu only
  const [hydrationModifier, setHydrationModifier] = useState(0); //for dev menu only

  const [petState, setPetState] = useState(2); // default to neutral
  const [showDevMenu, setShowDevMenu] = useState(false);
  const [stateScore, setStateScore] = useState(0.5);
  const [currentNeutralGif, setCurrentNeutralGif] = useState(neutralGifs[0]);

  useEffect(() => {
    async function fetchScores() {
      try {
        const completedPlanCount = await getCompletedPlanCount();
        const calmTimeAverage = await getCalmTimeAverage();
        const hydrationPercentage = await getHydrationPercentage();

        setPlannerScore(completedPlanCount);
        setCalmScore(calmTimeAverage);
        setHydrationScore(hydrationPercentage);
      } catch (e) {
        console.error('fetchScores()', e);
      }
    }
    fetchScores();
  }, []);

  useEffect(() => {
    // 1) Re-normalize every metric including the dev-menu modifiers:
    const normPlanner = Math.max(
      0,
      Math.min(1, (plannerScore + plannerModifier) / 5),
    );
    const normCalm = Math.max(0, Math.min(1, (calmScore + calmModifier) / 60));
    const normHydration = Math.max(
      0,
      Math.min(1, (hydrationScore + hydrationModifier) / 100),
    );

    const composite = 0.4 * normPlanner + 0.3 * normCalm + 0.3 * normHydration;
    setStateScore(composite);

    // 2) Derive petState from that new composite score:
    let newState;
    if (composite < 0.2) newState = 0;
    else if (composite < 0.4) newState = 1;
    else if (composite < 0.6) newState = 2;
    else if (composite < 0.8) newState = 3;
    else newState = 4;

    if (newState !== petState) {
      setPetState(newState);
      if (newState === 2) {
        setCurrentNeutralGif(
          neutralGifs[Math.floor(Math.random() * neutralGifs.length)],
        );
      }
    }
  }, [
    plannerScore,
    calmScore,
    hydrationScore,
    plannerModifier,
    calmModifier,
    hydrationModifier,
  ]);

  const toggleDevMenu = () => {
    setShowDevMenu((prev) => !prev);
  };

  const adjustScore = (type, delta) => {
    if (type === 'planner') setPlannerModifier((p) => p + delta);
    if (type === 'calm') setCalmModifier((c) => c + delta);
    if (type === 'hydration') setHydrationModifier((h) => h + delta);
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
            <Text style={styles.menuText}>
              Planner Score:{' '}
              {parseFloat(plannerScore + plannerModifier).toFixed(1)}
            </Text>
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
            <Text style={styles.menuText}>
              Calm Score: {parseFloat(calmScore + calmModifier).toFixed(1)}
            </Text>
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
              Hydration Score:{' '}
              {parseFloat(hydrationScore + hydrationModifier).toFixed(1)}
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
          <Text style={styles.menuItem}>
            State Score: {parseFloat(stateScore).toFixed(3)}
          </Text>
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
