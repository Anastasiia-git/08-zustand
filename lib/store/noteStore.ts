import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { CreateNoteDto } from "@/types/note";

export const initialDraft: CreateNoteDto = {
  title: "",
  content: "",
  tag: "Todo",
};

type NoteDraftStore = {
  draft: CreateNoteDto;
  setDraft: (patch: Partial<CreateNoteDto>) => void;
  clearDraft: () => void;
};

export const useNoteDraftStore = create<NoteDraftStore>()(
  persist(
    (set) => ({
      draft: initialDraft,
      setDraft: (patch) =>
        set((state) => ({ draft: { ...state.draft, ...patch } })),
      clearDraft: () => set({ draft: initialDraft }),
    }),
    {
      name: "note-draft",
      partialize: (state) => ({ draft: state.draft }),
    },
  ),
);
