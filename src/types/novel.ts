export type ParagraphType = 'paragraph' | 'dialogue' | 'divider' | 'quote' | 'break';

export interface ParagraphItem {
  type: ParagraphType;
  html?: string;
  content?: string;
}

export interface Chapter {
  id: number;
  number: string;
  title: string;
  fullTitle: string;
  excerpt: string;
  wordCount: number;
  readTimeMinutes: number;
  isFinal: boolean;
  paragraphs: ParagraphItem[];
}

export interface NovelData {
  title: string;
  subtitle: string;
  tagline: string;
  author: string;
  genre: string;
  totalChapters: number;
  synopsis: string;
  quote: string;
  totalWords: number;
  totalReadTimeMinutes: number;
  chapters: Chapter[];
}

export type ThemeMode = 'cream' | 'sepia' | 'twilight' | 'dark' | 'white';
export type FontFamily = 'merriweather' | 'lora' | 'georgia';
export type LineHeight = 'compact' | 'comfortable' | 'loose';
export type PageWidth = 'narrow' | 'standard' | 'wide';
export type TextAlign = 'left' | 'justify';

export interface ReaderSettings {
  theme: ThemeMode;
  fontSize: number;
  fontFamily: FontFamily;
  lineHeight: LineHeight;
  pageWidth: PageWidth;
  textAlign: TextAlign;
  audioEnabled: boolean;
  audioVolume: number;
}
