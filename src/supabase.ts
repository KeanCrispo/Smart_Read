import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://bjhkjyozminwzjnbxnkd.supabase.co'; // Your Supabase project URL
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJqaGtqeW96bWlud3pqbmJ4bmtkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDc4ODczNDEsImV4cCI6MjA2MzQ2MzM0MX0.0KoVPwO8J6tQXiygkmaoY2zN5U0mABmn-lh5Wdo9wp4'; // Replace with your anon/public key

export const supabase = createClient(supabaseUrl, supabaseAnonKey);