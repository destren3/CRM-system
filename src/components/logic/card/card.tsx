import { useCallback, useState } from 'react';
import { CardUI } from '../..';
import { Todo, TodoRequest } from '../../../lib/types';

interface TCard {
  content: Todo;
  deleteCard: (id: number) => void;
  handleToggleCheckbox: (data: TodoRequest, id: number) => void;
}

export const Card = ({ content, deleteCard, handleToggleCheckbox }: TCard) => {
	const [isChange, setIsChange] = useState<boolean>(false);
  const handleChangeCardState = useCallback(
    (value: boolean) => setIsChange(value),
    []
  );
  return (
    <CardUI
      content={content}
      deleteCard={deleteCard}
      handleToggleCheckbox={handleToggleCheckbox}
			isChange={isChange}
			handleChangeCardState={handleChangeCardState}
    />
  );
};
