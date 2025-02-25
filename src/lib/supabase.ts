
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://fjxbfbfjnjcedzbmynhi.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZqeGJmYmZqbmpjZWR6Ym15bmhpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDA1MDAxNDcsImV4cCI6MjA1NjA3NjE0N30.E0g4Ih61Rs9Lw5n8NAmmOqHJwCv_YYuMmRdeW4rLOdc'

export const supabase = createClient(supabaseUrl, supabaseKey)
