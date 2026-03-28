import axios from "axios";
import type { NewNoteContent, Note } from "../types/note";

axios.defaults.baseURL = "https://notehub-public.goit.study/api";
axios.defaults.headers.common.Authorization = `Bearer ${process.env.NEXT_PUBLIC_NOTEHUB_TOKEN}`;

interface FetchNotesResponse {
  notes: Note[];
  totalPages: number;
}
export async function fetchNotes(
  query: string,
  page: number,
): Promise<FetchNotesResponse> {
  const params = { search: query, page, perPage: 12 };
  const { data } = await axios.get<FetchNotesResponse>("/notes", { params });
  return data;
}

export async function createNote(newNote: NewNoteContent): Promise<Note> {
  const { data } = await axios.post<Note>("/notes", newNote);
  return data;
}

export async function deleteNote(id: Note["id"]): Promise<Note> {
  const { data } = await axios.delete<Note>(`/notes/${id}`);
  return data;
}
