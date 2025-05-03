import { supabase } from '../supabase';
import { getThreeDayHydrationAverage } from '../pages/hydration/components/HydrationContext';
import { getUsageForDate } from '../pages/calm/components/CalmTimeTracking';

export async function getCompletedPlanCount() {
  const today = new Date();
  const threeDaysAgo = new Date();
  threeDaysAgo.setDate(threeDaysAgo.getDate() - 3);

  const { data, error } = await supabase
    .from('todos')
    .select('*')
    .lte('date', today.toISOString().split('T')[0])
    .gte('date', threeDaysAgo.toISOString().split('T')[0]);

  if (error) {
    console.error('Error fetching completed tasks:', error);
    throw error;
  }
  uncompletedData = data.filter((task) => !task.is_completed);

  // console.log('Fetched data:', uncompletedData);
  return data.length - uncompletedData.length;
}

export async function getCalmTimeAverage() {
  sum = 0;
  const result = {};
  for (let i = 0; i < 3; i++) {
    const date = new Date(Date.now() - i * 24 * 60 * 60 * 1000)
      .toISOString()
      .split('T')[0];
    const usage = await getUsageForDate(date);
    result[date] = usage;
    sum += usage;
  }
  return sum / 3 / 60;
}

export async function getHydrationPercentage() {
  return getThreeDayHydrationAverage();
}
