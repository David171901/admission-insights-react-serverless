export type Result<T, E> =
  | { ok: T; success: true }
  | { err: E; success: false };

export type ErrorTypes = {
  type:
  | "NETWORK_ERROR"
  | "NOT_VALID_JSON"
  | "BAD_SCHEMA";
};