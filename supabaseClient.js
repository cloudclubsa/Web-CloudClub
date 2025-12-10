const SUPABASE_URL = 'https://rjfnmrmrzopphxmcnizn.supabase.co';
const SUPABASE_ANON_KEY = 'sb_publishable_bMa91UDkndCAGofTGsOYcw_Cf1EpFXd';

const { createClient } = supabase;
const sb = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

window.supabaseClient = sb;
