import { supabase } from '../supabase';

export async function getCompletedPlanCount() {
  const today = new Date();
  const threeDaysAgo = new Date();
  threeDaysAgo.setDate(threeDaysAgo.getDate() - 3);

  const { data, error } = await supabase
    .from('todos')
    .select('*')
    .lte(
      'date',
      today.toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
      }),
    )
    .gte(
      'date',
      threeDaysAgo.toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
      }),
    );

  if (error) {
    console.error('Error fetching completed tasks:', error);
    throw error;
  }
  uncompletedData = data.filter((task) => !task.is_completed);

  // console.log('Fetched data:', uncompletedData);
  return data.length - uncompletedData.length;
}

export async function getCalmTimeAverage() {
  return 30;
}

export async function getHydrationPercentage() {
  return 50;
}
