  /* ===================================================================
     Supabase 연결
     =================================================================== */
  const SUPABASE_URL = "https://abglfgleitcxorclfhck.supabase.co";
  const SUPABASE_PUBLISHABLE_KEY = "sb_publishable_s-pEnjuvOc6gJoUkee8Csg_afwbLitt";
  const STORAGE_BUCKET = "portfolio-media";

  const sb = window.supabase.createClient(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY);
  const store = { profile:null, projects:[], papers:[], events:[], logs:[], session:null };
