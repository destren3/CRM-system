export type TStatus = 'all' | 'completed' | 'inWork';
export type TStatusRU = 'Все' | 'В работе' | 'Сделано';
export interface ICounts {
  Все: number;
  Сделано: number;
  'В работе': number;
}
