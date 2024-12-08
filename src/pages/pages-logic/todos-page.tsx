import { useEffect, useState } from 'react';
import { statusTypes, tabs, translationStatusTypes } from '../../lib/constants';
import { TodosPageUI } from '../pages-ui';
import { NotesService } from '../../lib/api/services/notes.service';
import { MetaResponse, TStatusRU, Todo, TodoInfo } from '../../lib/types';

export const TodosPage = () => {
  const [allContent, setAllContent] = useState<MetaResponse<Todo, TodoInfo>>();
  const [currentTab, setIsCurrentTab] = useState<TStatusRU>(statusTypes.ALL.ru);
  const counts = allContent?.info ? Object.values(allContent.info) : [0,0,0];

	const handleDeleteCard = (id: number) => {
		NotesService.deleteNote(id)
	}

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
  }, [currentTab, handleDeleteCard]);


  return (
    <TodosPageUI
      cardsContent={allContent?.data ? allContent.data : []}
      onButtonAddClick={() => {}}
      tabs={tabs}
      counts={counts}
      currentTab={currentTab}
      setIsCurrentTab={setIsCurrentTab}
			deleteCard={handleDeleteCard}
    />
  );
};
