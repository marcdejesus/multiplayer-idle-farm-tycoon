export type UserRole = 'player' | 'moderator' | 'admin'
export type TransactionType = 'purchase' | 'sale' | 'reward' | 'gift'

export interface User {
  id: string
  username: string
  role: UserRole
  coins: number
  xp: number
  level: number
  created_at: string
  updated_at: string
}

export interface Farm {
  id: string
  user_id: string
  name: string
  layout: Record<string, any>
  last_harvested: string | null
  created_at: string
  updated_at: string
}

export interface InventoryItem {
  id: string
  user_id: string
  item_type: string
  item_id: string
  quantity: number
  created_at: string
  updated_at: string
}

export interface Transaction {
  id: string
  user_id: string
  type: TransactionType
  amount: number
  description: string | null
  created_at: string
}

export interface Achievement {
  id: string
  user_id: string
  achievement_id: string
  unlocked_at: string
}

export interface Database {
  public: {
    Tables: {
      users: {
        Row: User
        Insert: Omit<User, 'id' | 'created_at' | 'updated_at'>
        Update: Partial<Omit<User, 'id'>>
      }
      farms: {
        Row: Farm
        Insert: Omit<Farm, 'id' | 'created_at' | 'updated_at'>
        Update: Partial<Omit<Farm, 'id'>>
      }
      inventory: {
        Row: InventoryItem
        Insert: Omit<InventoryItem, 'id' | 'created_at' | 'updated_at'>
        Update: Partial<Omit<InventoryItem, 'id'>>
      }
      transactions: {
        Row: Transaction
        Insert: Omit<Transaction, 'id' | 'created_at'>
        Update: never
      }
      achievements: {
        Row: Achievement
        Insert: Omit<Achievement, 'id' | 'unlocked_at'>
        Update: never
      }
    }
    Functions: {
      get_user_profile: {
        Args: { user_id: string }
        Returns: {
          id: string
          username: string
          level: number
          xp: number
          coins: number
          farm_count: number
          achievement_count: number
        }
      }
    }
  }
} 