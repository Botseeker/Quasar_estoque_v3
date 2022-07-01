import { createClient } from '@supabase/supabase-js'
import useAuthUser from 'src/composables/UseAuthUser'

const supabaseUrl = process.env.SUPABASE_URL
const supabaseKey = process.env.SUPABASE_KEY
const supabase = createClient(supabaseUrl, supabaseKey)

supabase.auth.onAuthStateChange((event, session) => {
  const { user } = useAuthUser()

  user.value = session?.user || null
})

export default function useSupabase () {
  return { supabase }
}

/* 
const supabaseUrl = 'https://negxkovdsojpqxztatyv.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5lZ3hrb3Zkc29qcHF4enRhdHl2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2NTM1MDc2NDQsImV4cCI6MTk2OTA4MzY0NH0.3vqodP1s6S66A3HLOgQ0rN77FhZyOKNHqUdyQZLV9Kk'
 */
