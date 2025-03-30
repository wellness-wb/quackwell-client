import React, { useEffect, useState } from 'react';
import { use } from 'react';
import { View, Image, StyleSheet, Text, TouchableOpacity } from 'react-native';

const states = [
  require('../../assets/state1.png'),
  require('../../assets/state2.png'),
  require('../../assets/state3.png'),
  require('../../assets/state4.png'),
  require('../../assets/state5.png'),
];

const VirtualPet = () => {
  const [plannerScore, setPlannerScore] = useState(0);
  const [calmScore, setCalmScore] = useState(0);
  const [hydrationScore, setHydrationScore] = useState(0);
  const [petState, setPetState] = useState(2); // default to neutral
  const [showDevMenu, setShowDevMenu] = useState(false);
  const [stateScore, setStateScore] = useState(0.5);

  useEffect(() => {
    getStateScore(plannerScore, calmScore, hydrationScore);
    const state = getPetState();
    setPetState(state);
  }, [plannerScore, calmScore, hydrationScore]);

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
        <Image source={states[petState]} style={styles.image} />
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
    top: 150,
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
