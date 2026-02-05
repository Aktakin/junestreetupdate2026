// Supabase client setup
import { createClient } from '@supabase/supabase-js';

// Get Supabase credentials from environment variables
const supabaseUrl = process.env.REACT_APP_SUPABASE_URL;
const supabaseAnonKey = process.env.REACT_APP_SUPABASE_ANON_KEY;

// Initialize Supabase client if credentials are available
let supabase = null;
if (supabaseUrl && supabaseAnonKey) {
  supabase = createClient(supabaseUrl, supabaseAnonKey);
  console.log('Supabase client initialized');
} else {
  console.warn('Supabase not configured. Missing:', {
    url: !supabaseUrl,
    key: !supabaseAnonKey
  });
}

// Fallback: Local storage keys (used if Supabase is not configured)
const STORAGE_KEY = 'junestreet_barbers';
const AUTH_KEY = 'junestreet_auth';

// Profile images in public/images (name "BarberName profile.jpeg") – used when DB has placeholder
const BARBER_PROFILE_IMAGES = {
  'vino': '/images/vino profile.jpeg',
  'kp': '/images/kp profile.jpeg',
  'coffey': '/images/coffey profile.jpeg',
  'sayla v': '/images/sayla v profile.jpeg',
};

// Get display image for a barber: use custom profile image if we have one, else barber.image
export const getBarberDisplayImage = (barber) => {
  if (!barber) return '/images/placeholder.jpg';
  const normalized = (barber.name || '').toLowerCase().trim();
  if (BARBER_PROFILE_IMAGES[normalized]) return BARBER_PROFILE_IMAGES[normalized];
  return barber.image || '/images/placeholder.jpg';
};

// Static work gallery (images + videos) in public/images – merged for display
const VINO_WORK_GALLERY = [
  { id: 'vino-work-1', image_url: '/images/Vino work gallery1.jpeg' },
  { id: 'vino-work-2', image_url: '/images/vino work gallery2.jpeg' },
  { id: 'vino-work-3', image_url: '/images/vino work gallery3.mp4', type: 'video' },
  { id: 'vino-work-4', image_url: '/images/vino work gallerry4 .mp4', type: 'video' },
  { id: 'vino-work-5', image_url: '/images/vino work gallery 5.mp4', type: 'video' },
  { id: 'vino-work-6', image_url: '/images/vino work gallery 6.mp4', type: 'video' },
];

// Returns work images to display: API images first, then any static gallery for this barber
export const getBarberWorkImagesForDisplay = (barber, apiWorkImages) => {
  const list = Array.isArray(apiWorkImages) ? [...apiWorkImages] : [];
  const name = (barber && barber.name || '').toLowerCase().trim();
  if (name === 'vino' && VINO_WORK_GALLERY.length) {
    list.push(...VINO_WORK_GALLERY);
  }
  return list;
};

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
    console.log('Attempting Supabase login for:', email);
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    
    if (error) {
      console.error('Supabase login error:', error);
      return { data: null, error };
    }
    
    console.log('Supabase login successful');
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
        console.error('Error fetching barbers from Supabase:', error);
        // If Supabase is paused or unavailable, fall back to localStorage
        console.warn('Falling back to localStorage due to Supabase error');
        return getBarbersFromStorage(includeHidden);
      }
      
      // If no data returned and Supabase might be paused, try fallback
      if (!data || data.length === 0) {
        console.warn('No barbers found in Supabase, checking localStorage fallback');
        const fallback = getBarbersFromStorage(includeHidden);
        if (fallback.length > 0) {
          return fallback;
        }
      }
      
      return data || [];
    } catch (error) {
      console.error('Exception fetching barbers from Supabase:', error);
      // Fall back to localStorage on any exception
      return getBarbersFromStorage(includeHidden);
    }
  } else {
    // Fallback to localStorage
    return getBarbersFromStorage(includeHidden);
  }
};

// Helper function to get barbers from localStorage
const getBarbersFromStorage = (includeHidden = false) => {
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

// ============================================
// BARBER PROFILE IMAGE UPLOAD (Supabase Storage)
// ============================================

const BARBER_IMAGES_BUCKET = 'barber-images';

// Upload barber profile image to Storage and return public URL
export const uploadBarberProfileImage = async (barberId, file) => {
  if (!supabase) {
    return { url: null, error: { message: 'Supabase not configured' } };
  }
  try {
    const ext = file.name.split('.').pop() || 'jpg';
    const path = `barbers/${barberId}/profile.${ext}`;
    const { error } = await supabase.storage
      .from(BARBER_IMAGES_BUCKET)
      .upload(path, file, { upsert: true });
    if (error) return { url: null, error };
    const { data: { publicUrl } } = supabase.storage
      .from(BARBER_IMAGES_BUCKET)
      .getPublicUrl(path);
    return { url: publicUrl, error: null };
  } catch (e) {
    return { url: null, error: { message: e.message } };
  }
};

// Get single barber by id (for gallery page)
export const getBarberById = async (id) => {
  if (supabase) {
    try {
      const { data, error } = await supabase
        .from('barbers')
        .select('*')
        .eq('id', id)
        .single();
      if (error) return { data: null, error };
      return { data, error: null };
    } catch (e) {
      return { data: null, error: { message: e.message } };
    }
  }
  try {
    const barbers = JSON.parse(localStorage.getItem(STORAGE_KEY) || JSON.stringify(defaultBarbers));
    const barber = barbers.find((b) => b.id === id);
    return { data: barber || null, error: null };
  } catch (e) {
    return { data: null, error: { message: e.message } };
  }
};

// ============================================
// BARBER WORK GALLERY (Supabase table + Storage)
// ============================================

// Get work images for a barber
export const getBarberWorkImages = async (barberId) => {
  if (supabase) {
    try {
      const { data, error } = await supabase
        .from('barber_work_images')
        .select('*')
        .eq('barber_id', barberId)
        .order('display_order', { ascending: true });
      if (error) return [];
      return data || [];
    } catch (e) {
      return [];
    }
  }
  try {
    const key = `junestreet_work_${barberId}`;
    const stored = localStorage.getItem(key);
    return stored ? JSON.parse(stored) : [];
  } catch (e) {
    return [];
  }
};

// Upload work image: store file in Storage, insert row in barber_work_images
export const uploadBarberWorkImage = async (barberId, file) => {
  if (supabase) {
    try {
      const ext = file.name.split('.').pop() || 'jpg';
      const uniqueId = `${Date.now()}-${Math.random().toString(36).slice(2, 9)}`;
      const path = `barbers/${barberId}/work/${uniqueId}.${ext}`;
      const { error: uploadError } = await supabase.storage
        .from(BARBER_IMAGES_BUCKET)
        .upload(path, file, { upsert: false });
      if (uploadError) return { data: null, error: uploadError };
      const { data: { publicUrl } } = supabase.storage
        .from(BARBER_IMAGES_BUCKET)
        .getPublicUrl(path);
      const { data: row, error: insertError } = await supabase
        .from('barber_work_images')
        .insert([{ barber_id: barberId, image_url: publicUrl, file_path: path, display_order: 999 }])
        .select()
        .single();
      if (insertError) return { data: null, error: insertError };
      return { data: row, error: null };
    } catch (e) {
      return { data: null, error: { message: e.message } };
    }
  }
  try {
    const key = `junestreet_work_${barberId}`;
    const stored = localStorage.getItem(key);
    const list = stored ? JSON.parse(stored) : [];
    const id = `work-${Date.now()}`;
    const url = URL.createObjectURL(file);
    const entry = { id, barber_id: barberId, image_url: url, display_order: list.length };
    list.push(entry);
    localStorage.setItem(key, JSON.stringify(list));
    return { data: entry, error: null };
  } catch (e) {
    return { data: null, error: { message: e.message } };
  }
};

// Delete work image (Storage + row)
export const deleteBarberWorkImage = async (barberId, workImageId, filePath = null) => {
  if (supabase) {
    try {
      if (filePath) {
        await supabase.storage.from(BARBER_IMAGES_BUCKET).remove([filePath]);
      }
      const { error } = await supabase
        .from('barber_work_images')
        .delete()
        .eq('id', workImageId);
      return { error: error || null };
    } catch (e) {
      return { error: { message: e.message } };
    }
  }
  try {
    const key = `junestreet_work_${barberId}`;
    const stored = localStorage.getItem(key);
    const list = stored ? JSON.parse(stored) : [];
    const filtered = list.filter((img) => img.id !== workImageId);
    localStorage.setItem(key, JSON.stringify(filtered));
    return { error: null };
  } catch (e) {
    return { error: { message: e.message } };
  }
};
