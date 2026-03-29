import {
  QueryClient,
  HydrationBoundary,
  dehydrate,
} from "@tanstack/react-query";
import { fetchNotes } from "@/lib/api";
import NotesListClient from "./Notes.client";

interface Props {
  searchValue?: string;
  page?: number;
}

const NoteListDetails = async ({ searchValue = "", page = 1 }: Props) => {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ["notes", searchValue, page],
    queryFn: () => fetchNotes(searchValue, page),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <NotesListClient />
    </HydrationBoundary>
  );
};

export default NoteListDetails;
