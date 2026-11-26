import { useState } from "react";
import type { FormEvent } from "react";
import ContactFields from "./ContactFields.tsx";
import { deleteMessage, updateMessage } from "../api/client.ts";
import { getToken, removeToken } from "../api/editTokens.ts";
import { topicLabels, validateContact } from "../utils/validateContact.ts";
import type { ContactErrors } from "../utils/validateContact.ts";
import type { ContactInput, ContactMessage } from "../types.ts";

interface MyMessagesProps {
  messages: ContactMessage[];
  onUpdated: (message: ContactMessage) => void;
  onDeleted: (id: number) => void;
}

const formatDate = (iso: string) =>
  new Date(iso).toLocaleString(undefined, { dateStyle: "medium", timeStyle: "short" });

// "Your messages": the visitor can review (Read), edit (Update), and withdraw (Delete)
// the messages they sent from this browser.
function MyMessages({ messages, onUpdated, onDeleted }: MyMessagesProps) {
  const [editingId, setEditingId] = useState<number | null>(null);
  const [draft, setDraft] = useState<ContactInput>({ name: "", email: "", topic: "general", message: "" });
  const [errors, setErrors] = useState<ContactErrors>({});
  const [confirmDeleteId, setConfirmDeleteId] = useState<number | null>(null);
  const [notice, setNotice] = useState("");

  const startEdit = (msg: ContactMessage) => {
    setEditingId(msg.id);
    setDraft({ name: msg.name, email: msg.email, topic: msg.topic, message: msg.message });
    setErrors({});
    setConfirmDeleteId(null);
  };

  const handleSave = async (e: FormEvent<HTMLFormElement>, id: number) => {
    e.preventDefault();
    const found = validateContact(draft);
    setErrors(found);
    if (Object.keys(found).length > 0) return;

    const token = getToken(id);
    if (!token) return;
    try {
      onUpdated(await updateMessage(id, draft, token));
      setEditingId(null);
      setNotice("Your message was updated.");
    } catch (err) {
      setNotice(err instanceof Error ? err.message : "Could not update the message.");
    }
  };

  const handleDelete = async (id: number) => {
    const token = getToken(id);
    if (!token) return;
    try {
      await deleteMessage(id, token);
      removeToken(id);
      onDeleted(id);
      setConfirmDeleteId(null);
      setNotice("Your message was withdrawn.");
    } catch (err) {
      setNotice(err instanceof Error ? err.message : "Could not delete the message.");
    }
  };

  return (
    <section aria-labelledby="my-messages-title" className="my-messages-section">
      <h2 id="my-messages-title" className="section-title">Your messages</h2>
      <p className="muted">Messages sent from this browser. You can edit or withdraw them until I reply.</p>

      {/* role="status" makes screen readers announce the change */}
      <p className={notice ? "notice" : "visually-hidden"} role="status">{notice}</p>

      {messages.length === 0 && <p>No messages from this browser right now.</p>}

      <ul className="my-messages">
        {messages.map((msg) => (
          <li key={msg.id} className={editingId === msg.id ? "my-message is-editing" : "my-message"}>
            {editingId === msg.id ? (
              <form className="message-edit" onSubmit={(e) => handleSave(e, msg.id)} noValidate>
                <ContactFields idPrefix={`edit-${msg.id}`} values={draft} errors={errors} onChange={setDraft} />
                <div className="entry-actions">
                  <button type="submit" className="button">Save changes</button>
                  <button type="button" className="button button-secondary" onClick={() => setEditingId(null)}>Cancel</button>
                </div>
              </form>
            ) : (
              <>
                <p className="entry-head">
                  <strong>{topicLabels[msg.topic] ?? msg.topic}</strong>
                  <time dateTime={msg.created_at}>{formatDate(msg.created_at)}</time>
                  {msg.updated_at !== msg.created_at && <span className="entry-edited">(edited)</span>}
                </p>
                <p className="entry-meta">From {msg.name} &lt;{msg.email}&gt;</p>
                <p className="entry-message">{msg.message}</p>

                <div className="entry-actions">
                  {confirmDeleteId === msg.id ? (
                    <>
                      <span>Withdraw this message?</span>
                      <button type="button" className="link-button danger" onClick={() => handleDelete(msg.id)}>Yes, withdraw</button>
                      <button type="button" className="link-button" onClick={() => setConfirmDeleteId(null)}>Cancel</button>
                    </>
                  ) : (
                    <>
                      <button type="button" className="link-button" onClick={() => startEdit(msg)}
                        aria-label={`Edit your message from ${formatDate(msg.created_at)}`}>Edit</button>
                      <button type="button" className="link-button danger" onClick={() => setConfirmDeleteId(msg.id)}
                        aria-label={`Withdraw your message from ${formatDate(msg.created_at)}`}>Withdraw</button>
                    </>
                  )}
                </div>
              </>
            )}
          </li>
        ))}
      </ul>
    </section>
  );
}

export default MyMessages;
