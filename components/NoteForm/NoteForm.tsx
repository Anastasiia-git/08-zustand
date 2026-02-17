"use client";

import css from "./NoteForm.module.css";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createNote } from "@/lib/api";
import { useNoteDraftStore } from "@/lib/store/noteStore";
import type { CreateNoteDto } from "@/types/note";

interface NoteFormProps {
  onClose: () => void;
}

export default function NoteForm({ onClose }: NoteFormProps) {
  const queryClient = useQueryClient();

  const draft = useNoteDraftStore((s) => s.draft);
  const setDraft = useNoteDraftStore((s) => s.setDraft);
  const clearDraft = useNoteDraftStore((s) => s.clearDraft);

  const mutation = useMutation({
    mutationFn: createNote,
    onSuccess: async () => {
      clearDraft();

      await queryClient.invalidateQueries({
        queryKey: ["notes"],
        exact: false,
      });
      await queryClient.refetchQueries({ queryKey: ["notes"], exact: false });

      onClose();
    },
  });

  const createNoteAction = async (formData: FormData) => {
    const values: CreateNoteDto = {
      title: String(formData.get("title") ?? "").trim(),
      content: String(formData.get("content") ?? "").trim(),
      tag: String(formData.get("tag") ?? "Todo"),
    };

    if (values.title.length < 3 || values.title.length > 50) return;
    if (!values.tag) return;

    await mutation.mutateAsync(values);
  };

  return (
    <form method="post" className={css.form} aria-busy={mutation.isPending}>
      <div className={css.formGroup}>
        <label htmlFor="title">Title</label>
        <input
          id="title"
          name="title"
          type="text"
          className={css.input}
          required
          minLength={3}
          maxLength={50}
          value={draft.title}
          onChange={(e) => setDraft({ title: e.target.value })}
        />
      </div>

      <div className={css.formGroup}>
        <label htmlFor="content">Content</label>
        <textarea
          id="content"
          name="content"
          rows={8}
          className={css.textarea}
          value={draft.content}
          onChange={(e) => setDraft({ content: e.target.value })}
        />
      </div>

      <div className={css.formGroup}>
        <label htmlFor="tag">Tag</label>
        <select
          id="tag"
          name="tag"
          className={css.select}
          required
          value={draft.tag}
          onChange={(e) => setDraft({ tag: e.target.value })}
        >
          <option value="Todo">Todo</option>
          <option value="Work">Work</option>
          <option value="Personal">Personal</option>
          <option value="Meeting">Meeting</option>
          <option value="Shopping">Shopping</option>
        </select>
      </div>

      <div className={css.actions}>
        <button onClick={onClose} type="button" className={css.cancelButton}>
          Cancel
        </button>

        <button
          type="submit"
          formAction={createNoteAction}
          className={css.submitButton}
          disabled={mutation.isPending}
        >
          {mutation.isPending ? "Creating..." : "Create note"}
        </button>
      </div>

      {mutation.isError && (
        <span className={css.error}>Failed to create note. Try again.</span>
      )}
    </form>
  );
}
