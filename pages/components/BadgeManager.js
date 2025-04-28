// src/badges/BadgeManager.js
import AsyncStorage from '@react-native-async-storage/async-storage';

const BADGES_KEY = 'earned_badges';

// A registry lets us keep metadata together
export const BadgeCatalog = {
  aquaholic: {
    id: 'aquaholic',
    title: 'Aquaholic',
    description: 'Completed a hydration goal of 4 L or more within 24 hours',
    asset: require('../../assets/aquaholic.gif'),
  },
  // -- other badges coming up for later if we have time --
};

// ---------- helpers ----------
export async function getEarnedBadges() {
  const raw = await AsyncStorage.getItem(BADGES_KEY);
  return raw ? JSON.parse(raw) : {};
}

export async function hasBadge(id) {
  const badges = await getEarnedBadges();
  return Boolean(badges[id]);
}

export async function awardBadge(id) {
  const catalogEntry = BadgeCatalog[id];
  if (!catalogEntry) return; // unknown badge

  const badges = await getEarnedBadges();
  if (badges[id]) return; // already earned

  badges[id] = { earnedAt: Date.now() };
  await AsyncStorage.setItem(BADGES_KEY, JSON.stringify(badges));
  return catalogEntry; // give caller the metadata so they can show a pop-up
}
