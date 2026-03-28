import {
  QueryClient,
  HydrationBoundary,
  dehydrate,
} from "@tanstack/react-query";
import { fetchNotes } from "@/lib/api";
import NotesListClient from "./Notes.client";

type Props = {
  params: Promise<{ searchValue: string; page: number }>;
};

const NoteListDetails = async ({ params }: Props) => {
  const { searchValue, page } = await params;
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
