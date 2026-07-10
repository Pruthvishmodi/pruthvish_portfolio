/**
 * Utility to process media URLs from Payload CMS.
 *
 * With S3 + `disablePayloadAccessControl: true`, Payload returns full absolute
 * Supabase CDN URLs (e.g. https://<ref>.storage.supabase.co/storage/v1/object/public/…).
 * These are passed through as-is.
 *
 * Legacy fallback: if a relative Payload proxy URL (/api/media/file/…) is
 * encountered (e.g. from cached DB entries before the S3 migration), it is
 * rewritten to the static /media/ path as before.
 */
export const getMediaUrl = (url?: string | null): string => {
  if (!url) return ''
  // Already an absolute URL (S3/CDN) — return unchanged.
  if (url.startsWith('http://') || url.startsWith('https://')) {
    return url
  }
  // Legacy: rewrite Payload proxy paths for backward-compat.
  if (url.startsWith('/api/media/file/')) {
    return url.replace('/api/media/file/', '/media/')
  }
  return url
}
