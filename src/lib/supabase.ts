import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.SUPABASE_URL as string
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY as string

export const supabase = createClient(supabaseUrl, supabaseKey)

export async function getBlogById(id: number) {
  const { data, error } = await supabase
    .from('blog')
    .select()
    .eq('id', id)
    .single()

  return data
}

export async function getAllBlogs() {
  const { data, error } = await supabase
    .from('blog')
    .select()
    .order('created_at', { ascending: false })
  return data
}
