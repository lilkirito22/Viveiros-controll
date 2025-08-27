import { createClient } from '@supabase/supabase-js'

// 1. Lendo as variáveis de ambiente que criamos
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

// 2. Criando o cliente Supabase com nossas credenciais
export const supabase = createClient(supabaseUrl, supabaseAnonKey)