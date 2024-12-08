import { useEffect, useState } from 'react';
import { statusTypes, tabs } from '../../lib/constants';
import { TodosPageUI } from '../pages-ui';
import { NotesService } from '../../lib/api/services/notes.service';
import { Todo } from '../../lib/types';

export const TodosPage = () => {
  const [allContent, setAllContent] = useState<Todo[]>();
  useEffect(() => {
    const fetchNotes = async () => {
      try {
        const content = await NotesService.getNotes(statusTypes.ALL);
        setAllContent(content.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchNotes();
  }, []);

  return (
    <TodosPageUI
      cardsContent={allContent ? allContent : []}
      onButtonAddClick={() => {}}
      tabs={tabs}
      count={5}
      isActive
      setIsActive={() => {}}
    />
  );
};
