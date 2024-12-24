// Интерфейс запроса для фильтрации и сортировки пользователей
export interface UserFilters {
  search?: string;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
  isBlocked?: boolean;
  limit?: number;
  offset?: number;
}

// Интерфейс пользователя
export interface User {
  id: number;
  username: string;
  email: string;
  date: string; // ISO date string
  isBlocked: boolean;
  isAdmin: boolean;
  phoneNumber: string;
}

// Интерфейс метаинформации
export interface MetaResponseUsers<T> {
  data: T[];
  meta: {
    totalAmount: number;
    sortBy: string;
    sortOrder: 'asc' | 'desc';
  };
}

// Интерфейс для обновления прав пользователя
export interface UserRolesRequest {
  field: string;
  value: boolean;
}

// Интерфейс для обновления данных пользователя
export interface UserRequest {
  username?: string;
  email?: string;
  phoneNumber?: string;
}
