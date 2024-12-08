import { useCallback, useEffect, useState } from 'react';
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
  const [triggerUpdate, setTriggerUpdate] = useState<number>(0);
  const counts = allContent?.info ? Object.values(allContent.info) : [0, 0, 0];

  const handleDeleteCard = useCallback(async (id: number) => {
    await NotesService.deleteNote(id);
    setTriggerUpdate((prev) => prev + 1);
  }, []);

  const handleAddCard = useCallback(async (data: TodoRequest) => {
    await NotesService.postNote(data);
    setInputValue('');
    setTriggerUpdate((prev) => prev + 1);
  }, []);

  const handleUpdateCard = useCallback(
    async (data: TodoRequest, id: number) => {
      await NotesService.updateNote(data, id);
      setTriggerUpdate((prev) => prev + 1);
    },
    []
  );

  const handleToggleCheckbox = useCallback(
    async (data: TodoRequest, id: number) => {
      await NotesService.updateNote(data, id);
      setTriggerUpdate((prev) => prev + 1);
    },
    []
  );

  const handleInputChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setInputValue(e.target.value);
    },
    []
  );

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
  }, [currentTab, triggerUpdate]);

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
      handleUpdateCard={handleUpdateCard}
    />
  );
};
