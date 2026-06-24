---
name: Meta App konfiqurasiyası
description: Instagram Graph API üçün yaradılmış Meta app məlumatları
last_updated: 2026-06-18
---

# Meta App konfiqurasiyası

Bu fayl AzerogluEminAI Meta app-ının **gizli olmayan** məlumatlarını saxlayır. Gizli açarlar (token, app secret) `.env` faylındadır.

## App məlumatları

| Sahə | Dəyər |
|---|---|
| **App adı** | AzerogluEminAI |
| **App email** | azeroglu.emin05@gmail.com |
| **App rejimi** | Development (Live etmək LAZIM DEYIL — şəxsi avtomatlaşdırma) |
| **Use case** | Manage messaging & content on Instagram |
| **Business** | Bir Parça Söhbət |
| **App ID** | `872542572020790` |
| **Instagram app ID** | 1559712137053603 (qismi görünür, tam yoxlanılmalıdır) |
| **Instagram app adı** | AzerogluEminAI-IG |

## Instagram hesab məlumatları

| Sahə | Dəyər |
|---|---|
| **Username** | @azerogluemin_ai |
| **Instagram Business Account ID** | `17841452855231512` |
| **Hesab növü** | Business / Creator |
| **Tester statusu** | ✅ Əlavə edildi və qəbul olundu |

## Aktivləşdirilmiş icazələr (5)

1. `instagram_business_basic` — profil oxumaq
2. `instagram_business_manage_comments` — comment-lərə cavab yazmaq
3. `instagram_business_manage_messages` — DM göndərmək və cavablamaq
4. `instagram_business_content_publish` — Reel/post publish etmək
5. `instagram_business_manage_insights` — real analytics (like, view, save, reach, impressions)

## Token detalları

**Token tipi**: Instagram Login (yeni IG Graph API)
**Token vaxtı**: ~60 gün, refresh edilə bilir
**Token kim üçün**: yalnız @azerogluemin_ai hesabı

**Yeniləmə tarixçəsi**:
- 2026-06-18: İlk token yaradıldı (yenilənmə tarixi: ~2026-08-17)

## Tarix əlavə etmə

Hər dəfə token refresh ediləndə bu tarixçəni yenilə:
```markdown
- YYYY-MM-DD: Token refresh edildi (növbəti: YYYY-MM-DD)
```

## Vacib URL-lər

- Meta Developer Dashboard: https://developers.facebook.com/apps/
- App roles səhifəsi: Dashboard → AzerogluEminAI → App roles → Roles
- Instagram tester invitations: https://www.instagram.com/accounts/manage_access/

## Token-i Meta Dashboard-dan yenidən çıxartmaq

1. https://developers.facebook.com/apps/ → AzerogluEminAI seç
2. Sol menyu → Use cases → Customize "Manage messaging & content on Instagram"
3. **2. Generate access tokens** bölməsi
4. @azerogluemin_ai satrı → **"Generate token"** klik
5. Instagram-da consent ekranı açılır → İzin ver
6. Yeni token görünür → `.env`-ə yaz
