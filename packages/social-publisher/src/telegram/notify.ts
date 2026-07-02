/**
 * Telegram bildiriş — sadə fetch ilə sendMessage.
 * Pattern: MyJobs/cavably (channels/drivers/telegram.driver.ts) referansı.
 * Kitabxana lazım deyil — birbaşa Telegram Bot API.
 *
 * Env:
 *   TELEGRAM_BOT_TOKEN — @BotFather-dan
 *   TELEGRAM_CHAT_ID   — bildiriş gedən chat (bota "start" yazıb alınır)
 */

export interface TelegramConfig {
  botToken: string;
  chatId: string;
}

export function loadTelegramConfig(env = process.env): TelegramConfig | null {
  const botToken = env.TELEGRAM_BOT_TOKEN;
  const chatId = env.TELEGRAM_CHAT_ID;
  if (!botToken || !chatId) return null; // konfiqurasiya yoxdursa bildiriş deaktiv
  return { botToken, chatId };
}

/**
 * Telegram-a mesaj göndər. Uğursuzluqda atmır — yalnız false qaytarır
 * (bildiriş sistemi əsas işi (publish/watch) dayandırmamalıdır).
 */
export async function sendTelegram(
  cfg: TelegramConfig,
  text: string,
): Promise<boolean> {
  try {
    const res = await fetch(
      `https://api.telegram.org/bot${cfg.botToken}/sendMessage`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          chat_id: cfg.chatId,
          text,
          parse_mode: "HTML",
          disable_web_page_preview: true,
        }),
      },
    );
    return res.ok;
  } catch {
    return false;
  }
}

/** Konfiqurasiya varsa göndər, yoxsa səssiz keç (log üçün nəticə qaytarır). */
export async function notify(
  text: string,
  env = process.env,
): Promise<"sent" | "no-config" | "failed"> {
  const cfg = loadTelegramConfig(env);
  if (!cfg) return "no-config";
  const ok = await sendTelegram(cfg, text);
  return ok ? "sent" : "failed";
}
