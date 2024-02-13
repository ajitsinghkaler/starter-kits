import { StarterKit } from "./starter-kit"

export interface Profile{
    avatar_url: string,
    email: string
    full_name: string
    id: string
    website: string | null,
    myKits?: StarterKit[],
    savedKits?: StarterKit[]
  }