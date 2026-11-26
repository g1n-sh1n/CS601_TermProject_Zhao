import { useEffect, useState } from "react";
import type { FormEvent } from "react";
import SectionTitle from "../components/SectionTitle.tsx";
import ContactFields from "../components/ContactFields.tsx";
import MyMessages from "../components/MyMessages.tsx";
import { profile } from "../data/profile.ts";
import { getMessage, sendMessage } from "../api/client.ts";
import { getMyMessageIds, getToken, removeToken, saveToken } from "../api/editTokens.ts";
import { validateContact } from "../utils/validateContact.ts";
import type { ContactErrors } from "../utils/validateContact.ts";
import type { ContactInput, ContactMessage } from "../types.ts";

// Extra credit: the contact form talks to our own Node API + Postgres database.
//   Create: send the form       Read:   "Your messages" list
//   Update: Edit a message       Delete: Withdraw a message

// true once the visitor has had at least one message on this page
function useHadMessages(count: number): boolean {
  const [had, setHad] = useState(false);
  useEffect(() => {
    if (count > 0) setHad(true);
  }, [count]);
  return had;
}

const emptyForm: ContactInput = { name: "", email: "", topic: "general", message: "" };

function ContactPage() {
  const [form, setForm] = useState<ContactInput>(emptyForm);
  const [errors, setErrors] = useState<ContactErrors>({});
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);
  const [sendError, setSendError] = useState("");
  const [slowServer, setSlowServer] = useState(false);
  const [myMessages, setMyMessages] = useState<ContactMessage[]>([]);
  const hadMessages = useHadMessages(myMessages.length);

  // READ: load the messages this browser has sent before
  useEffect(() => {
    const ids = getMyMessageIds();
    if (ids.length === 0) return;

    Promise.all(
      ids.map((id) =>
        getMessage(id, getToken(id) ?? "").catch((err: Error & { status?: number }) => {
          // The message no longer exists (or the token is wrong): forget it
          if (err.status === 404 || err.status === 403) removeToken(id);
          return null;
        })
      )
    ).then((results) => {
      setMyMessages(results.filter((msg): msg is ContactMessage => msg !== null));
    });
  }, []);

  // CREATE
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const found = validateContact(form);
    setErrors(found);

    if (Object.keys(found).length > 0) {
      // Move focus to the first field with an error
      const firstField = Object.keys(found)[0];
      document.getElementById(`contact-${firstField}`)?.focus();
      return;
    }

    setSending(true);
    setSendError("");
    // The free API server sleeps when idle; tell the visitor if waking it up takes a while
    const timer = window.setTimeout(() => setSlowServer(true), 4000);
    try {
      const { message, editToken } = await sendMessage(form);
      saveToken(message.id, editToken);
      setMyMessages([message, ...myMessages]);
      setSent(true);
      setForm(emptyForm);
    } catch {
      setSendError(`Sorry, the message could not be sent. Please email me at ${profile.email} instead.`);
    } finally {
      window.clearTimeout(timer);
      setSlowServer(false);
      setSending(false);
    }
  };

  return (
    <>
      <div className="two-column">
        <section aria-labelledby="contact-title">
          <SectionTitle id="contact-title" level={1}>Contact</SectionTitle>

          {sent ? (
            <p className="notice" role="status">
              Thanks! Your message has been received and I will reply by email.{" "}
              <button type="button" className="link-button" onClick={() => setSent(false)}>Send another</button>
            </p>
          ) : (
            <form className="contact-form" onSubmit={handleSubmit} noValidate>
              <ContactFields idPrefix="contact" values={form} errors={errors} onChange={setForm} />
              {sendError && <p role="alert" className="field-error">{sendError}</p>}
              {slowServer && <p className="muted" aria-live="polite">The server is waking up, this can take up to a minute…</p>}
              <button type="submit" className="button" disabled={sending}>{sending ? "Sending…" : "Send message"}</button>
            </form>
          )}
        </section>

        <aside className="side-block" aria-labelledby="direct-title">
          <h2 id="direct-title" className="section-title">Reach me directly</h2>
          <ul className="link-list">
            <li><a href={`mailto:${profile.email}`}>{profile.email}</a></li>
            <li><a href={profile.githubUrl} target="_blank" rel="noopener noreferrer">github.com/{profile.github}</a></li>
          </ul>
          <p className="muted">Based in the {profile.location}.</p>
        </aside>
      </div>

      {/* stays visible after the last message is withdrawn, so the visitor sees the confirmation */}
      {(myMessages.length > 0 || hadMessages) && (
        <MyMessages
          messages={myMessages}
          onUpdated={(updated) => setMyMessages(myMessages.map((m) => (m.id === updated.id ? updated : m)))}
          onDeleted={(id) => setMyMessages(myMessages.filter((m) => m.id !== id))}
        />
      )}
    </>
  );
}

export default ContactPage;
