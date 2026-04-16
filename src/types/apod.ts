export interface ApodEntry {
  /** Attribution for copyright holder, absent for public domain images */
  copyright?: string;
  /** Date in YYYY-MM-DD format */
  date: string;
  /** Extended description of the image */
  explanation: string;
  /** URL to the HD version (only present for images) */
  hdurl?: string;
  media_type: 'image' | 'video';
  service_version: string;
  title: string;
  /** Standard-resolution URL (or YouTube embed URL for videos) */
  url: string;
  /** Thumbnail URL returned when media_type is 'video' and thumbs=true */
  thumbnail_url?: string;
}
