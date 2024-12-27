export enum BlockStatus {
  BLOCKED = 'blocked',
  UNBLOCKED = 'unblocked',
}

export const BlockStatusLocalization = {
  [BlockStatus.BLOCKED]: 'Заблокирован',
  [BlockStatus.UNBLOCKED]: 'Не заблокирован',
};
