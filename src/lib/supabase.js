// Local data management (no external dependencies)
// Uses localStorage to persist barber data

const STORAGE_KEY = 'junestreet_barbers';
const AUTH_KEY = 'junestreet_auth';

// Default barbers data
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

// Admin credentials
const ADMIN_EMAIL = 'admin@junestreet.com';
const ADMIN_PASSWORD = 'admin123';

// Helper: Get barbers from storage
const getAllBarbers = () => {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      return JSON.parse(stored);
    }
    // Initialize with defaults
    localStorage.setItem(STORAGE_KEY, JSON.stringify(defaultBarbers));
    return defaultBarbers;
  } catch (e) {
    console.error('Storage error:', e);
    return defaultBarbers;
  }
};

// Helper: Save barbers to storage
const saveBarbers = (barbers) => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(barbers));
    return true;
  } catch (e) {
    console.error('Save error:', e);
    return false;
  }
};

// Get barbers (public)
export const getBarbers = async (includeHidden = false) => {
  const barbers = getAllBarbers();
  const sorted = [...barbers].sort((a, b) => a.display_order - b.display_order);
  
  if (includeHidden) {
    return sorted;
  }
  return sorted.filter(b => b.is_visible);
};

// Add barber
export const addBarber = async (barber) => {
  try {
    const barbers = getAllBarbers();
    const newBarber = {
      ...barber,
      id: Date.now().toString()
    };
    barbers.push(newBarber);
    saveBarbers(barbers);
    return { data: newBarber, error: null };
  } catch (e) {
    return { data: null, error: { message: e.message } };
  }
};

// Update barber
export const updateBarber = async (id, updates) => {
  try {
    const barbers = getAllBarbers();
    const index = barbers.findIndex(b => b.id === id);
    if (index === -1) {
      return { data: null, error: { message: 'Barber not found' } };
    }
    barbers[index] = { ...barbers[index], ...updates };
    saveBarbers(barbers);
    return { data: barbers[index], error: null };
  } catch (e) {
    return { data: null, error: { message: e.message } };
  }
};

// Delete barber
export const deleteBarber = async (id) => {
  try {
    const barbers = getAllBarbers();
    const filtered = barbers.filter(b => b.id !== id);
    saveBarbers(filtered);
    return { error: null };
  } catch (e) {
    return { error: { message: e.message } };
  }
};

// Toggle visibility
export const toggleBarberVisibility = async (id, isVisible) => {
  return updateBarber(id, { is_visible: isVisible });
};

// Sign in (local auth)
export const signIn = async (email, password) => {
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
};

// Sign out
export const signOut = async () => {
  try {
    localStorage.removeItem(AUTH_KEY);
  } catch (e) {
    console.error('Sign out error:', e);
  }
  return { error: null };
};

// Get session
export const getSession = async () => {
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
};
