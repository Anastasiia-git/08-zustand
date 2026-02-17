import css from "./CreateNote.module.css";
import CreateNoteClient from "./CreateNote.client";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Create Note",
  description:
    "Create a new note quickly and easily using the note creation form.",

  openGraph: {
    title: "Create Note",
    description:
      "Create a new note quickly and easily using the note creation form.",

    url: "https://08-zustand-one-henna.vercel.app/notes/action/create",

    siteName: "NoteHub",

    images: [
      {
        url: "https://ac.goit.global/fullstack/react/notehub-og-meta.jpg",
        width: 1200,
        height: 630,
        alt: "NoteHub preview",
      },
    ],

    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "NoteHub — Simple Note Manager",
    description:
      "Create, organize, and manage your notes with a clean interface.",
    images: ["https://ac.goit.global/fullstack/react/notehub-og-meta.jpg"],
  },
};

function CreateNote() {
  return (
    <main className={css.main}>
      <div className={css.container}>
        <h1 className={css.title}>Create note +</h1>
        <CreateNoteClient />
      </div>
    </main>
  );
}

export default CreateNote;
