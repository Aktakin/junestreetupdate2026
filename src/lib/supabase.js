// Supabase client setup
import { createClient } from '@supabase/supabase-js';

// Get Supabase credentials from environment variables
const supabaseUrl = process.env.REACT_APP_SUPABASE_URL;
const supabaseAnonKey = process.env.REACT_APP_SUPABASE_ANON_KEY;

// Initialize Supabase client if credentials are available
let supabase = null;
if (supabaseUrl && supabaseAnonKey) {
  supabase = createClient(supabaseUrl, supabaseAnonKey);
}

// Fallback: Local storage keys (used if Supabase is not configured)
const STORAGE_KEY = 'junestreet_barbers';
const AUTH_KEY = 'junestreet_auth';

// Default barbers data (for localStorage fallback)
const defaultBarbers = [
  {
    id: '1',
    name: 'Zacc',
    image: '/images/placeholder.jpg',
    booking_type: 'external',
    booking_link: 'http://book.thecut.co/zacc-Mitchell-cutsbyzdfw',
    phone: null,
    is_visible: true,
    display_order: 1
  },
  {
    id: '2',
    name: 'Savant',
    image: '/images/placeholder.jpg',
    booking_type: 'external',
    booking_link: 'http://thesavant.booksy.com/a/',
    phone: null,
    is_visible: true,
    display_order: 2
  },
  {
    id: '3',
    name: 'Vino',
    image: '/images/placeholder.jpg',
    booking_type: 'external',
    booking_link: 'http://cutzbyvino.booksy.com/a/',
    phone: null,
    is_visible: true,
    display_order: 3
  },
  {
    id: '4',
    name: 'KP',
    image: '/images/placeholder.jpg',
    booking_type: 'internal',
    booking_link: null,
    phone: '+1 (214) 991-6181',
    is_visible: true,
    display_order: 4
  },
  {
    id: '5',
    name: 'Coffey',
    image: '/images/placeholder.jpg',
    booking_type: 'internal',
    booking_link: null,
    phone: '+1 (469) 540-8025',
    is_visible: true,
    display_order: 5
  }
];

// ============================================
// AUTHENTICATION FUNCTIONS
// ============================================

// Sign in with Supabase
export const signIn = async (email, password) => {
  if (supabase) {
    // Use Supabase authentication
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    
    if (error) {
      return { data: null, error };
    }
    
    return { data: data.session, error: null };
  } else {
    // Fallback to local auth (for development)
    console.warn('Supabase not configured. Using local authentication.');
    const ADMIN_EMAIL = 'admin@junestreet.com';
    const ADMIN_PASSWORD = 'admin123';
    
    if (email === ADMIN_EMAIL && password === ADMIN_PASSWORD) {
      const session = { 
        user: { email }, 
        expires: Date.now() + (24 * 60 * 60 * 1000) // 24 hours
      };
      try {
        localStorage.setItem(AUTH_KEY, JSON.stringify(session));
      } catch (e) {
        console.error('Auth save error:', e);
      }
      return { data: session, error: null };
    }
    return { data: null, error: { message: 'Invalid email or password' } };
  }
};

// Sign out
export const signOut = async () => {
  if (supabase) {
    // Use Supabase sign out
    const { error } = await supabase.auth.signOut();
    return { error };
  } else {
    // Fallback to local sign out
    try {
      localStorage.removeItem(AUTH_KEY);
    } catch (e) {
      console.error('Sign out error:', e);
    }
    return { error: null };
  }
};

// Get current session
export const getSession = async () => {
  if (supabase) {
    // Use Supabase session
    const { data: { session }, error } = await supabase.auth.getSession();
    if (error) {
      console.error('Session error:', error);
      return { session: null };
    }
    return { session };
  } else {
    // Fallback to local session
    try {
      const stored = localStorage.getItem(AUTH_KEY);
      if (!stored) {
        return { session: null };
      }
      const session = JSON.parse(stored);
      // Check if expired
      if (session.expires < Date.now()) {
        localStorage.removeItem(AUTH_KEY);
        return { session: null };
      }
      return { session };
    } catch (e) {
      return { session: null };
    }
  }
};

// ============================================
// BARBER CRUD FUNCTIONS
// ============================================

// Get barbers (public - only visible barbers)
export const getBarbers = async (includeHidden = false) => {
  if (supabase) {
    // Use Supabase database
    try {
      let query = supabase
        .from('barbers')
        .select('*')
        .order('display_order', { ascending: true });
      
      if (!includeHidden) {
        query = query.eq('is_visible', true);
      }
      
      const { data, error } = await query;
      
      if (error) {
        console.error('Error fetching barbers:', error);
        return [];
      }
      
      return data || [];
    } catch (error) {
      console.error('Error fetching barbers:', error);
      return [];
    }
  } else {
    // Fallback to localStorage
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const barbers = JSON.parse(stored);
        const sorted = [...barbers].sort((a, b) => a.display_order - b.display_order);
        if (includeHidden) {
          return sorted;
        }
        return sorted.filter(b => b.is_visible);
      }
      // Initialize with defaults
      localStorage.setItem(STORAGE_KEY, JSON.stringify(defaultBarbers));
      return includeHidden ? defaultBarbers : defaultBarbers.filter(b => b.is_visible);
    } catch (e) {
      console.error('Storage error:', e);
      return includeHidden ? defaultBarbers : defaultBarbers.filter(b => b.is_visible);
    }
  }
};

// Add barber
export const addBarber = async (barber) => {
  if (supabase) {
    // Use Supabase database
    try {
      const { data, error } = await supabase
        .from('barbers')
        .insert([{
          name: barber.name,
          image: barber.image || '/images/placeholder.jpg',
          booking_type: barber.booking_type,
          booking_link: barber.booking_link || null,
          phone: barber.phone || null,
          is_visible: barber.is_visible !== undefined ? barber.is_visible : true,
          display_order: barber.display_order || 0
        }])
        .select()
        .single();
      
      if (error) {
        console.error('Error adding barber:', error);
        return { data: null, error };
      }
      
      return { data, error: null };
    } catch (error) {
      console.error('Error adding barber:', error);
      return { data: null, error: { message: error.message } };
    }
  } else {
    // Fallback to localStorage
    try {
      const barbers = JSON.parse(localStorage.getItem(STORAGE_KEY) || JSON.stringify(defaultBarbers));
      const newBarber = {
        ...barber,
        id: Date.now().toString()
      };
      barbers.push(newBarber);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(barbers));
      return { data: newBarber, error: null };
    } catch (e) {
      return { data: null, error: { message: e.message } };
    }
  }
};

// Update barber
export const updateBarber = async (id, updates) => {
  if (supabase) {
    // Use Supabase database
    try {
      const { data, error } = await supabase
        .from('barbers')
        .update(updates)
        .eq('id', id)
        .select()
        .single();
      
      if (error) {
        console.error('Error updating barber:', error);
        return { data: null, error };
      }
      
      return { data, error: null };
    } catch (error) {
      console.error('Error updating barber:', error);
      return { data: null, error: { message: error.message } };
    }
  } else {
    // Fallback to localStorage
    try {
      const barbers = JSON.parse(localStorage.getItem(STORAGE_KEY) || JSON.stringify(defaultBarbers));
      const index = barbers.findIndex(b => b.id === id);
      if (index === -1) {
        return { data: null, error: { message: 'Barber not found' } };
      }
      barbers[index] = { ...barbers[index], ...updates };
      localStorage.setItem(STORAGE_KEY, JSON.stringify(barbers));
      return { data: barbers[index], error: null };
    } catch (e) {
      return { data: null, error: { message: e.message } };
    }
  }
};

// Delete barber
export const deleteBarber = async (id) => {
  if (supabase) {
    // Use Supabase database
    try {
      const { error } = await supabase
        .from('barbers')
        .delete()
        .eq('id', id);
      
      if (error) {
        console.error('Error deleting barber:', error);
        return { error };
      }
      
      return { error: null };
    } catch (error) {
      console.error('Error deleting barber:', error);
      return { error: { message: error.message } };
    }
  } else {
    // Fallback to localStorage
    try {
      const barbers = JSON.parse(localStorage.getItem(STORAGE_KEY) || JSON.stringify(defaultBarbers));
      const filtered = barbers.filter(b => b.id !== id);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(filtered));
      return { error: null };
    } catch (e) {
      return { error: { message: e.message } };
    }
  }
};

// Toggle visibility
export const toggleBarberVisibility = async (id, isVisible) => {
  return updateBarber(id, { is_visible: isVisible });
};
