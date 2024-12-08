export const statusTypes = {
  ALL: {
    ru: 'Все',
    en: 'all',
  },
  COMPLETED: {
    ru: 'Сделано',
    en: 'completed',
  },
  INWORK: {
    ru: 'В работе',
    en: 'inWork',
  },
} as const;

export const translationStatusTypes = {
  Все: 'all',
  Сделано: 'completed',
  'В работе': 'inWork',
} as const;
