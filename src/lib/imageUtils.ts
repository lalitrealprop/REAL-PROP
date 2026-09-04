/**
 * Utility to convert common image sharing URLs to direct image URLs
 */
export function getDirectImageUrl(url: string): string {
  if (!url) return '';

  // Handle Instasize share links
  // From: https://instasize.com/p/87e2fdb8828fd9cdfa4566774e9ba73c587ea743872310c777de048c2b9dd4b1
  // To: https://instasize.com/api/image/87e2fdb8828fd9cdfa4566774e9ba73c587ea743872310c777de048c2b9dd4b1.jpeg
  const instasizeMatch = url.match(/instasize\.com\/p\/([a-zA-Z0-9]+)/);
  if (instasizeMatch && instasizeMatch[1]) {
    return `https://instasize.com/api/image/${instasizeMatch[1]}.jpeg`;
  }

  // Handle Google Drive links (common request)
  const gdriveMatch = url.match(/drive\.google\.com\/file\/d\/([a-zA-Z0-9_-]+)/);
  if (gdriveMatch && gdriveMatch[1]) {
    return `https://lh3.googleusercontent.com/d/${gdriveMatch[1]}`;
  }

  return url;
}
