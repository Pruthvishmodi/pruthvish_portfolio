/**
 * Utility to process media URLs.
 * Rewrites local/Vercel Payload API media URLs to their static equivalents under /media/
 * to bypass serverless filesystem restrictions on Vercel.
 */
export const getMediaUrl = (url?: string | null): string => {
  if (!url) return ''
  if (url.startsWith('/api/media/file/')) {
    return url.replace('/api/media/file/', '/media/')
  }
  return url
}
