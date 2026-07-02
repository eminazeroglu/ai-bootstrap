/**
 * Queue tipləri və QueueStore interfeysi.
 *
 * Mərhələ 1-də JSON fayl store istifadə olunur (json-store.ts).
 * Sonra Railway Postgres-ə keçid üçün yalnız bu interfeysi implement edən
 * yeni store yazmaq kifayətdir — qalan kod dəyişmir.
 */

/** Dəstəklənən platformalar. */
export type PlatformName = "instagram" | "tiktok" | "linkedin";

/** Post tipləri (platformadan asılı olmayaraq ümumi). */
export type PostType = "image" | "video" | "reel" | "carousel";

/** Növbədəki postun statusu. */
export type PostStatus = "pending" | "publishing" | "posted" | "failed";

/** Carousel üçün bir element. */
export interface MediaItem {
  /** Public URL (https://...) — fayl yox. */
  url: string;
  type?: "IMAGE" | "VIDEO";
}

/** Cədvəllə paylaşılacaq bir post. */
export interface ScheduledPost {
  id: string;
  /** Hansı müştəri (clients.json-dakı id). */
  clientId: string;
  platform: PlatformName;
  type: PostType;
  /**
   * Media URL-ləri. image/video/reel üçün 1 element,
   * carousel üçün 2-10 element. Hamısı public URL olmalıdır.
   */
  mediaUrls: string[];
  caption?: string;
  /** ISO 8601 tarix — bu vaxtdan sonra paylaşılacaq. */
  scheduledAt: string;
  status: PostStatus;
  /** Uğurla paylaşıldıqdan sonra platforma media ID. */
  publishedMediaId?: string;
  /** Sonuncu xəta mesajı (failed olduqda). */
  error?: string;
  /** Neçə dəfə cəhd edilib. */
  attempts: number;
  createdAt: string;
  updatedAt: string;
}

/** Yeni post üçün giriş (id/status/timestamp avtomatik doldurulur). */
export interface NewPostInput {
  clientId: string;
  platform: PlatformName;
  type: PostType;
  mediaUrls: string[];
  caption?: string;
  scheduledAt: string;
}

/** Post filtri (siyahıda). */
export interface PostFilter {
  clientId?: string;
  platform?: PlatformName;
  status?: PostStatus;
}

/**
 * Queue store kontraktı. JSON və ya Postgres ilə implement oluna bilər.
 */
export interface QueueStore {
  /** Store-u hazırla (fayl yarat / cədvəl yarat və s.). */
  init(): Promise<void>;
  /** Yeni post əlavə et, yaradılmış postu qaytar. */
  add(input: NewPostInput): Promise<ScheduledPost>;
  /** Bir postu id ilə tap. */
  get(id: string): Promise<ScheduledPost | null>;
  /** Postları filtrə görə siyahıla. */
  list(filter?: PostFilter): Promise<ScheduledPost[]>;
  /** Postu sil. true = silindi. */
  remove(id: string): Promise<boolean>;
  /** Postu yenilə (qismən). Yenilənmiş postu qaytar. */
  update(id: string, patch: Partial<ScheduledPost>): Promise<ScheduledPost | null>;
  /**
   * Vaxtı çatmış (scheduledAt <= now) və status=pending olan postları qaytar.
   * Publisher loop bunu hər dövrdə çağırır.
   */
  dueNow(now: Date): Promise<ScheduledPost[]>;
}
