import { supabase } from '../supabase';

export async function fetchTodos() {
  const { data, error } = await supabase
    .from('todos')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Error fetching todos:', error);
    throw error;
  }

  return data;
}

export async function fetchTodoStatus() {
  try {
    const { data, error } = await supabase
      .from('todos')
      .select('id, date, due_time, is_completed')
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching todo status:', error);
      throw error;
    }

    // I will leave this in case :)
    // console.log('Todo status data:', data);

    if (!data || data.length === 0) {
      console.warn('Todo status data is empty');
      return [];
    }

    return data;
  } catch (error) {
    console.error('Unexpected error in fetchTodoStatus:', error);
    return [];
  }
}

export async function fetchTodosByDate(date) {
  const { data, error } = await supabase
    .from('todos')
    .select('*')
    .eq('date', date)
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Error fetching todos by date:', error);
    throw error;
  }

  return data;
}

export async function addTodo(name, date, dueTime) {
  const { data, error } = await supabase
    .from('todos')
    .insert([
      {
        name,
        date,
        due_time: dueTime,
        user_id: (await supabase.auth.getUser()).data.user.id,
      },
    ])
    .select();

  if (error) {
    console.error('Error adding todo:', error);
    throw error;
  }

  return data[0];
}

export async function completeTodo(id, isCompleted) {
  const { data, error } = await supabase
    .from('todos')
    .update({ is_completed: isCompleted, updated_at: new Date() })
    .eq('id', id)
    .select();

  if (error) {
    console.error('Error completing todo:', error);
    throw error;
  }

  return data[0];
}

export async function deleteTodo(id) {
  const { error } = await supabase.from('todos').delete().eq('id', id);

  if (error) {
    console.error('Error deleting todo:', error);
    throw error;
  }

  return true;
}

export async function fetchTodosByWeek(startDate, endDate) {
  // const date = new Date('2025-03-21');
  // const formattedDate = date.toISOString().split('T')[0]; // '2025-03-21'
  const { data, error } = await supabase
    .from('todos')
    .select('*')
    .gte('date', startDate)
    .lte('date', endDate)
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Error fetching todos by week:', error);
    throw error;
  }

  return data;
}
