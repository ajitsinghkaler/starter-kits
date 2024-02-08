export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      profile: {
        Row: {
          avatar_url: string | null
          email: string
          full_name: string | null
          id: string
          website: string | null
        }
        Insert: {
          avatar_url?: string | null
          email: string
          full_name?: string | null
          id: string
          website?: string | null
        }
        Update: {
          avatar_url?: string | null
          email?: string
          full_name?: string | null
          id?: string
          website?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "profile_id_fkey"
            columns: ["id"]
            isOneToOne: true
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
      }
      reviews: {
        Row: {
          id: number
          rating: number
          review_date: string
          review_text: string
          starter_kit: number
          user: string
        }
        Insert: {
          id?: number
          rating: number
          review_date?: string
          review_text: string
          starter_kit: number
          user?: string
        }
        Update: {
          id?: number
          rating?: number
          review_date?: string
          review_text?: string
          starter_kit?: number
          user?: string
        }
        Relationships: [
          {
            foreignKeyName: "reviews_starter_kit_fkey"
            columns: ["starter_kit"]
            isOneToOne: false
            referencedRelation: "starter_kits"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "reviews_user_fkey"
            columns: ["user"]
            isOneToOne: false
            referencedRelation: "profile"
            referencedColumns: ["id"]
          }
        ]
      }
      starter_kit_tags: {
        Row: {
          starter_kit: number
          tags: number
        }
        Insert: {
          starter_kit: number
          tags: number
        }
        Update: {
          starter_kit?: number
          tags?: number
        }
        Relationships: [
          {
            foreignKeyName: "starter_kit_tags_starter_kit_fkey"
            columns: ["starter_kit"]
            isOneToOne: false
            referencedRelation: "starter_kits"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "starter_kit_tags_tags_fkey"
            columns: ["tags"]
            isOneToOne: false
            referencedRelation: "tags"
            referencedColumns: ["id"]
          }
        ]
      }
      starter_kits: {
        Row: {
          description: string | null
          featured: boolean
          id: number
          inserted_at: string
          kit_image: string | null
          name: string
          price: number | null
          pricing_type: string | null
          rating: number
          short_description: string
          updated_at: string
          user: string
          website: string
        }
        Insert: {
          description?: string | null
          featured?: boolean
          id?: number
          inserted_at?: string
          kit_image?: string | null
          name: string
          price?: number | null
          pricing_type?: string | null
          rating?: number
          short_description: string
          updated_at?: string
          user?: string
          website: string
        }
        Update: {
          description?: string | null
          featured?: boolean
          id?: number
          inserted_at?: string
          kit_image?: string | null
          name?: string
          price?: number | null
          pricing_type?: string | null
          rating?: number
          short_description?: string
          updated_at?: string
          user?: string
          website?: string
        }
        Relationships: [
          {
            foreignKeyName: "starter_kits_user_fkey"
            columns: ["user"]
            isOneToOne: false
            referencedRelation: "profile"
            referencedColumns: ["id"]
          }
        ]
      }
      tags: {
        Row: {
          id: number
          name: string
        }
        Insert: {
          id?: number
          name: string
        }
        Update: {
          id?: number
          name?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (Database["public"]["Tables"] & Database["public"]["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (Database["public"]["Tables"] &
      Database["public"]["Views"])
  ? (Database["public"]["Tables"] &
      Database["public"]["Views"])[PublicTableNameOrOptions] extends {
      Row: infer R
    }
    ? R
    : never
  : never

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof Database["public"]["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof Database["public"]["Tables"]
  ? Database["public"]["Tables"][PublicTableNameOrOptions] extends {
      Insert: infer I
    }
    ? I
    : never
  : never

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof Database["public"]["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof Database["public"]["Tables"]
  ? Database["public"]["Tables"][PublicTableNameOrOptions] extends {
      Update: infer U
    }
    ? U
    : never
  : never

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof Database["public"]["Enums"]
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof Database["public"]["Enums"]
  ? Database["public"]["Enums"][PublicEnumNameOrOptions]
  : never
