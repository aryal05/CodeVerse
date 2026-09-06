export const SITE_URL = "https://codeversebuild.com";

export const SITE_NAME = "CodeVerse Build";

export const DEFAULT_DESCRIPTION =
  "CodeVerse Build is an IT company in Nepal providing web development, mobile app development, UI/UX design, and digital product services from Kathmandu.";

export function absoluteUrl(path = "/") {
  return new URL(path, SITE_URL).toString();
}
