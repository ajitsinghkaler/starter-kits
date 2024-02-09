import { StarterKit } from "./starter-kit"

export interface Profile{
    avatar_url: string | null
    email: string
    full_name: string
    id: string
    website: string | null,
    starter_kits: StarterKit[]
  }