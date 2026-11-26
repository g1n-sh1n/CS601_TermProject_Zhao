import type { ContactInput } from "../types.ts";

export type ContactErrors = Partial<Record<keyof ContactInput, string>>;

// Same rules as the server (server/src/routes/messages.ts)
export function validateContact(data: ContactInput): ContactErrors {
  const errors: ContactErrors = {};
  if (data.name.trim().length < 2) errors.name = "Please enter your name.";
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) errors.email = "Please enter a valid email address.";
  if (data.message.trim().length < 10) errors.message = "Message should be at least 10 characters.";
  return errors;
}

export const topicLabels: Record<string, string> = {
  general: "General question",
  job: "Job opportunity",
  project: "Project collaboration"
};
