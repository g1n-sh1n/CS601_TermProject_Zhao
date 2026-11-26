import type { ChangeEvent } from "react";
import type { ContactInput } from "../types.ts";
import { topicLabels } from "../utils/validateContact.ts";
import type { ContactErrors } from "../utils/validateContact.ts";

interface ContactFieldsProps {
  idPrefix: string; // keeps ids unique when the fields appear more than once on the page
  values: ContactInput;
  errors: ContactErrors;
  onChange: (values: ContactInput) => void;
}

// The four form fields, shared by "send a message" and "edit your message"
function ContactFields({ idPrefix, values, errors, onChange }: ContactFieldsProps) {
  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    onChange({ ...values, [e.target.name]: e.target.value });
  };

  const errorId = (field: keyof ContactInput) => (errors[field] ? `${idPrefix}-${field}-error` : undefined);

  return (
    <>
      <div className="field">
        <label htmlFor={`${idPrefix}-name`}>Name</label>
        <input id={`${idPrefix}-name`} name="name" type="text" autoComplete="name" maxLength={100}
          value={values.name} onChange={handleChange} required
          aria-invalid={Boolean(errors.name)} aria-describedby={errorId("name")} />
        {errors.name && <p id={errorId("name")} className="field-error">{errors.name}</p>}
      </div>

      <div className="field">
        <label htmlFor={`${idPrefix}-email`}>Email</label>
        <input id={`${idPrefix}-email`} name="email" type="email" autoComplete="email" maxLength={200}
          value={values.email} onChange={handleChange} required
          aria-invalid={Boolean(errors.email)} aria-describedby={errorId("email")} />
        {errors.email && <p id={errorId("email")} className="field-error">{errors.email}</p>}
      </div>

      <div className="field">
        <label htmlFor={`${idPrefix}-topic`}>Topic</label>
        <select id={`${idPrefix}-topic`} name="topic" value={values.topic} onChange={handleChange}>
          {Object.entries(topicLabels).map(([value, label]) => (
            <option key={value} value={value}>{label}</option>
          ))}
        </select>
      </div>

      <div className="field">
        <label htmlFor={`${idPrefix}-message`}>Message</label>
        <textarea id={`${idPrefix}-message`} name="message" rows={6} maxLength={2000}
          value={values.message} onChange={handleChange} required
          aria-invalid={Boolean(errors.message)} aria-describedby={errorId("message")} />
        {errors.message && <p id={errorId("message")} className="field-error">{errors.message}</p>}
      </div>
    </>
  );
}

export default ContactFields;
