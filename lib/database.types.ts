export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  graphql_public: {
    Tables: {
      [_ in never]: never
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      graphql: {
        Args: {
          extensions?: Json
          operationName?: string
          query?: string
          variables?: Json
        }
        Returns: Json
      }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
  public: {
    Tables: {
      leads: {
        Row: {
          budget: string
          created_at: string | null
          email: string
          experience: string
          id: string
          integrations: string[] | null
          problem: string | null
          recommendations_sent_at: string | null
          use_case: string
          utm_campaign: string | null
          utm_medium: string | null
          utm_source: string | null
        }
        Insert: {
          budget: string
          created_at?: string | null
          email: string
          experience: string
          id?: string
          integrations?: string[] | null
          problem?: string | null
          recommendations_sent_at?: string | null
          use_case: string
          utm_campaign?: string | null
          utm_medium?: string | null
          utm_source?: string | null
        }
        Update: {
          budget?: string
          created_at?: string | null
          email?: string
          experience?: string
          id?: string
          integrations?: string[] | null
          problem?: string | null
          recommendations_sent_at?: string | null
          use_case?: string
          utm_campaign?: string | null
          utm_medium?: string | null
          utm_source?: string | null
        }
        Relationships: []
      }
      recommendations: {
        Row: {
          created_at: string | null
          id: string
          lead_id: string
          rank: number
          reason: string | null
          tool_id: string
        }
        Insert: {
          created_at?: string | null
          id?: string
          lead_id: string
          rank: number
          reason?: string | null
          tool_id: string
        }
        Update: {
          created_at?: string | null
          id?: string
          lead_id?: string
          rank?: number
          reason?: string | null
          tool_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "recommendations_lead_id_fkey"
            columns: ["lead_id"]
            isOneToOne: false
            referencedRelation: "leads"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "recommendations_tool_id_fkey"
            columns: ["tool_id"]
            isOneToOne: false
            referencedRelation: "tools"
            referencedColumns: ["id"]
          },
        ]
      }
      scrape_logs: {
        Row: {
          created_at: string | null
          error_message: string | null
          id: string
          raw_data: Json | null
          source: string
          source_id: string | null
          status: string
          tool_id: string | null
        }
        Insert: {
          created_at?: string | null
          error_message?: string | null
          id?: string
          raw_data?: Json | null
          source: string
          source_id?: string | null
          status: string
          tool_id?: string | null
        }
        Update: {
          created_at?: string | null
          error_message?: string | null
          id?: string
          raw_data?: Json | null
          source?: string
          source_id?: string | null
          status?: string
          tool_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "scrape_logs_tool_id_fkey"
            columns: ["tool_id"]
            isOneToOne: false
            referencedRelation: "tools"
            referencedColumns: ["id"]
          },
        ]
      }
      tools: {
        Row: {
          created_at: string | null
          description: string | null
          experience_levels: string[] | null
          id: string
          integrations: string[] | null
          last_scraped_at: string | null
          logo_url: string | null
          name: string
          pricing_model: string | null
          published: boolean | null
          scrape_status: string | null
          slug: string
          source: string | null
          source_id: string | null
          source_url: string | null
          starting_price: number | null
          tagline: string | null
          updated_at: string | null
          use_cases: string[] | null
          verified: boolean | null
          website_url: string | null
        }
        Insert: {
          created_at?: string | null
          description?: string | null
          experience_levels?: string[] | null
          id?: string
          integrations?: string[] | null
          last_scraped_at?: string | null
          logo_url?: string | null
          name: string
          pricing_model?: string | null
          published?: boolean | null
          scrape_status?: string | null
          slug: string
          source?: string | null
          source_id?: string | null
          source_url?: string | null
          starting_price?: number | null
          tagline?: string | null
          updated_at?: string | null
          use_cases?: string[] | null
          verified?: boolean | null
          website_url?: string | null
        }
        Update: {
          created_at?: string | null
          description?: string | null
          experience_levels?: string[] | null
          id?: string
          integrations?: string[] | null
          last_scraped_at?: string | null
          logo_url?: string | null
          name?: string
          pricing_model?: string | null
          published?: boolean | null
          scrape_status?: string | null
          slug?: string
          source?: string | null
          source_id?: string | null
          source_url?: string | null
          starting_price?: number | null
          tagline?: string | null
          updated_at?: string | null
          use_cases?: string[] | null
          verified?: boolean | null
          website_url?: string | null
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

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  graphql_public: {
    Enums: {},
  },
  public: {
    Enums: {},
  },
} as const

