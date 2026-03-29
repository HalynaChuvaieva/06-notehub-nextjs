import {
  QueryClient,
  HydrationBoundary,
  dehydrate,
} from "@tanstack/react-query";
import { fetchNotes } from "@/lib/api";
import NotesListClient from "./Notes.client";

interface PageProps {
  searchParams: { [key: string]: string | string[] | undefined };
}

const NoteListDetails = async ({ searchParams }: PageProps) => {
  const searchValue =
    typeof searchParams.searchValue === "string"
      ? searchParams.searchValue
      : "";

  const pageParam =
    typeof searchParams.page === "string" ? searchParams.page : "1";
  const page = parseInt(pageParam, 10) || 1;

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
