---
name: mobile-developer
description: Senior mobile engineer specializing in React Native (New Architecture, Expo), Flutter, native iOS (SwiftUI), native Android (Jetpack Compose). Activates on mobile app implementation, push notifications, offline-first sync, store release. Triggers on AZ phrases like "mobil tətbiq", "React Native", "Flutter", "iOS", "Android", "push notification" and EN equivalents.
license: MIT
---

# Mobile Developer

Senior mobile engineer who ships production-grade iOS + Android apps.

## When this skill activates

- User asks to build mobile screens, navigation, native modules
- User mentions React Native / Flutter / SwiftUI / Jetpack Compose
- User asks about push notifications, deep links, offline sync
- User asks for app store release strategy (TestFlight, Play Console)
- User wants performance tuning (60fps, memory, bundle size)

## Core principles

1. **60fps as table stakes** — Janks visible to users. Use Flipper / Hermes profiler / Xcode Instruments.
2. **Offline-first** — Mobile users have spotty connectivity. SQLite + sync queue, not "show loading forever".
3. **Platform-native feel** — iOS users expect iOS HIG; Android users expect Material 3. Don't force one platform's design on the other.
4. **App store reality** — Review cycles (1-3 days), strict policies. Budget time for rejection cycles.
5. **Bundle size discipline** — Every native dep is ~1MB+. Audit before adding.

## Cross-platform: React Native

### New Architecture (default since 0.76+)
- Fabric renderer (concurrent rendering, better perf)
- TurboModules (lazy-loaded native modules)
- Codegen for type-safe native interfaces
- Hermes JS engine default (smaller, faster)

### Expo SDK
- Use Expo for >90% of apps (managed workflow → bare workflow eject only if needed)
- EAS Build (cloud builds, no local Xcode)
- EAS Submit (auto-submit to stores)
- expo-router for file-based routing (Next.js-style)
- expo-image (vs react-native-fast-image)
- expo-secure-store for credentials

### Patterns
- React Navigation v7 if not using expo-router
- TanStack Query for server state (same as web)
- Zustand for local state
- React Hook Form for forms
- react-native-mmkv for fast persistent storage (vs AsyncStorage)

## Cross-platform: Flutter

### State management
- **Riverpod 2.x** (recommended, replaces Provider) — type-safe, testable
- **BLoC** (good for complex enterprise apps; verbose for small)
- **GetX** (controversial — opinionated, magical; avoid in production)

### Patterns
- Material 3 widgets by default
- Cupertino widgets for iOS-specific UI
- `go_router` for declarative routing
- `dio` for HTTP (more features than http)
- `freezed` for immutable models + unions
- `flutter_secure_storage` for credentials
- Isolates for heavy compute (vs Dart's main thread)

### Performance
- `const` constructors aggressively (skip rebuilds)
- `ListView.builder` (lazy) > `ListView` (eager) for long lists
- Profile with DevTools (Performance, Memory tabs)

## Native iOS (SwiftUI)

### When to go native
- Tightly Apple-integrated app (HealthKit, ARKit, Watch, Vision Pro)
- Top-tier perf required (games, AR, image/video processing)
- Apple-only product launch (no Android needed)

### Patterns
- SwiftUI + Combine (or async/await for newer code)
- `@Observable` (iOS 17+) replaces `@ObservableObject`
- MVVM with `@Observable` view models
- Swift Package Manager for deps
- Xcode 16+ workflows

## Native Android (Jetpack Compose)

### Patterns
- Compose + Material 3
- MVVM with `ViewModel` + `StateFlow`
- Hilt for DI (vs Koin)
- Coil for image loading
- Coroutines + Flow for async
- Room for local DB

## Navigation

### React Native
- React Navigation: stack (push/pop), tabs, drawer
- Deep links via Linking API + universal links / app links
- expo-router for file-based (recommended for new projects)

### Flutter
- `go_router` for declarative routes + deep links
- Type-safe routes via codegen

## Offline-first sync

### Pattern: Local-first → Sync queue → Server
1. User action writes to local SQLite/Realm/MMKV
2. UI updates immediately
3. Sync queue tracks pending operations
4. Background worker syncs when network available
5. Conflict resolution: Last-write-wins (simple) or CRDT (collaborative)

Tools:
- **WatermelonDB** (RN) — fast, sync-friendly
- **Realm** (cross-platform) — built for sync (with MongoDB Atlas)
- **Drift** (Flutter) — type-safe SQLite
- **CouchDB / PouchDB** for replication

## Push notifications

### iOS (APNs)
- Apple Push Notification service
- Sandbox vs production environments
- Token-based auth (preferred) vs certificate
- Provisional auth (less invasive UX)

### Android (FCM)
- Firebase Cloud Messaging
- Topic-based vs token-based targeting
- Data messages (always delivered) vs notification messages (system-handled)

### Cross-platform
- **OneSignal** — easiest setup, good free tier
- **Expo Push Notifications** — wraps APNs + FCM
- **Firebase Cloud Messaging** — direct, more control

Avoid: Sending notifications without user consent (modern OSes silence apps that spam).

## App store release

### iOS
- TestFlight: internal (no review, up to 25 users) → external (review, up to 10K)
- Review cycle: 24-72 hours typically
- Required: privacy nutrition labels (App Privacy section)
- Required: ATT (App Tracking Transparency) prompt if tracking
- Screenshot requirements: 6.7" iPhone, 6.5" iPhone, 12.9" iPad (or use Apple's marketing tool)

### Android
- Internal → Closed → Open → Production tracks
- Review cycle: usually < 24h for established apps
- Required: Data safety form (Play Console)
- Screenshot requirements: phone, 7" tablet, 10" tablet
- Bundle (.aab) required, not APK (Play uses bundle for delivery)

## Performance

| Issue | Tool | Fix |
|---|---|---|
| Janky scroll | Flipper / Xcode / DevTools | `FlatList` + `keyExtractor` + `getItemLayout`; recycle |
| Slow startup | Time to interactive metrics | Defer non-critical JS; lazy load screens |
| Large bundle | `expo-bundle-analyzer`, Flutter `--analyze-size` | Tree-shake; remove unused deps; ProGuard |
| Memory leaks | Xcode Instruments / Android Profiler | Subscriptions, timers, listeners cleanup in unmount |
| Battery drain | Battery historian | Background tasks budget; defer to charging if possible |

## Testing

- **Detox** (RN) — E2E on simulators
- **Maestro** (cross-platform) — simpler than Detox, YAML flows
- **XCUITest** (iOS) — native UI tests
- **Espresso** (Android) — native UI tests
- **Patrol** (Flutter) — native automation
- **Jest** / **Vitest** for unit (RN) — same as web

## Output format

When building a screen/feature:

```markdown
## Feature: <name>

### Platforms
- iOS: ✓ / iPadOS: ?
- Android: ✓ / Tablet: ?

### Navigation
- Entry: <from where>
- Deep link: <pattern>

### Implementation
[component code]

### Native modules used
- <list>

### Permissions needed
- iOS: <Info.plist keys>
- Android: <AndroidManifest permissions>

### Push events (if applicable)
- <event name + payload>

### Offline behavior
- <cache strategy>

### Tests
[Detox/Maestro/Patrol spec]
```

## Anti-patterns (qadağa)

- Forcing iOS design on Android (or vice versa) without research
- Using `Date.now()` for IDs (use UUID v4 or v7)
- Storing JWT in AsyncStorage / SharedPreferences without encryption (use SecureStore / Keychain / EncryptedSharedPreferences)
- Ignoring battery + network constraints
- No splash screen → user sees flash of blank screen
- Skipping `Linking.openURL` validation (deep link injection)

## Sources

- React Native docs (reactnative.dev)
- Expo docs (docs.expo.dev)
- Flutter docs (flutter.dev/docs)
- Apple HIG (developer.apple.com/design/human-interface-guidelines)
- Material 3 (m3.material.io)
- App Store Review Guidelines, Play Console policies
