import { useEffect, useState } from 'react';
import { statusTypes, tabs, translationStatusTypes } from '../../lib/constants';
import { TodosPageUI } from '../pages-ui';
import { NotesService } from '../../lib/api/services/notes.service';
import {
  MetaResponse,
  TStatusRU,
  Todo,
  TodoInfo,
  TodoRequest,
} from '../../lib/types';

export const TodosPage = () => {
  const [allContent, setAllContent] = useState<MetaResponse<Todo, TodoInfo>>();
  const [currentTab, setIsCurrentTab] = useState<TStatusRU>(statusTypes.ALL.ru);
  const [inputValue, setInputValue] = useState<string>();
  const counts = allContent?.info ? Object.values(allContent.info) : [0, 0, 0];

  const handleDeleteCard = (id: number) => {
    NotesService.deleteNote(id);
  };

  const handleAddCard = async (data: TodoRequest) => {
    await NotesService.postNote(data);
    setInputValue('');
  };

  const handleToggleCheckbox = (data: TodoRequest, id: number) => {
    NotesService.updateNote(data, id);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  useEffect(() => {
    const fetchNotes = async () => {
      try {
        const content = await NotesService.getNotes(
          translationStatusTypes[currentTab]
        );
        setAllContent(content);
      } catch (error) {
        console.log(error);
      }
    };
    fetchNotes();
  }, [currentTab, handleDeleteCard, handleAddCard, handleToggleCheckbox]);

  return (
    <TodosPageUI
      cardsContent={allContent?.data ? allContent.data : []}
      onButtonAddClick={handleAddCard}
      tabs={tabs}
      counts={counts}
      currentTab={currentTab}
      setIsCurrentTab={setIsCurrentTab}
      deleteCard={handleDeleteCard}
      inputValue={inputValue ? inputValue : ''}
      setInputValue={handleInputChange}
			handleToggleCheckbox={handleToggleCheckbox}
    />
  );
};
