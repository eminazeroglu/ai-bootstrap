---
name: Publishing guide
description: ai-bootstrap-i npm-ə publish etmək üçün addım-addım təlimat
last_updated: 2026-06-20
---

# Publishing ai-bootstrap to npm

Bu sənəd `ai-bootstrap` paketini npm registry-ə publish etmək üçün addım-addım təlimatdır.

## Prerequisites

1. **npm account**
   - https://www.npmjs.com/signup
   - Email verification tamamla

2. **npm login** (terminal-də)
   ```bash
   npm login
   # Username, password, email, OTP (2FA)
   ```

3. **Verify login**
   ```bash
   npm whoami
   # → eminazeroglu (yaxud sənin npm username)
   ```

4. **Verify package name available**
   ```bash
   npm view ai-bootstrap
   # → 404 (yaxşı — ad sərbəstdir)
   # → əgər mövcud, ad dəyişmək lazımdır
   ```

   Əgər `ai-bootstrap` artıq tutulubsa, alternativ adlar:
   - `@azerogluemin/ai-bootstrap` (scoped — yalnız sənin account-da)
   - `claude-bootstrap`
   - `claude-ai-bootstrap`

## Pre-publish checklist

```bash
cd ~/MyJobs/ai-bootstrap/packages/cli

# 1. TypeScript build təmizdir
pnpm typecheck
# (heç bir output olmamalıdır — sıfır xəta)

# 2. Test passes
pnpm test
# → ✓ ALL TESTS PASSED (55/55)

# 3. Pack content yoxla (publish olmaz, yalnız siyahı)
npm pack --dry-run
# → 64 fayl, ~26 kB tarball, ~103 kB unpacked
# → README.md, LICENSE, package.json, bin/, dist/ daxil olmalıdır

# 4. Local install test (real install simulation)
cd /tmp
mkdir test-install && cd test-install
npm pack ~/MyJobs/ai-bootstrap/packages/cli
# → ai-bootstrap-0.0.1.tgz yarandı
npm install ai-bootstrap-0.0.1.tgz
# → installed, no errors

# 5. Verify CLI works
./node_modules/.bin/ai-bootstrap
# → banner görünməlidir
```

## Publish

```bash
cd ~/MyJobs/ai-bootstrap/packages/cli

# Final dry-run
npm publish --dry-run --access public

# Real publish
npm publish --access public

# Successful output:
# + ai-bootstrap@0.0.1
```

## Verify publish

```bash
# 1. View on npm
npm view ai-bootstrap
# → version 0.0.1, latest, description, links

# 2. Test global install
npm install -g ai-bootstrap
ai-bootstrap
# → banner görünür

# 3. Test npx
npx ai-bootstrap
# → eyni nəticə
```

## Version bumping (sonrakı release-lərdə)

```bash
# Patch (bug fix): 0.0.1 → 0.0.2
npm version patch

# Minor (new feature): 0.0.1 → 0.1.0
npm version minor

# Major (breaking change): 0.0.1 → 1.0.0
npm version major

# Sonra:
npm publish --access public
git push --follow-tags
```

## Rollback (if needed)

npm-də published version-ı **dərhal silmək olar** (72 saat ərzində):

```bash
npm unpublish ai-bootstrap@0.0.1
```

72 saat sonra unpublish QADAĞAN-dır (npm policy). Bu halda yeni version (məs. 0.0.2) ilə fix publish edilir + 0.0.1-i `deprecate` edirik:

```bash
npm deprecate ai-bootstrap@0.0.1 "Use 0.0.2 instead — bug fix"
```

## Distribution channels

1. **npm registry** (default): `https://www.npmjs.com/package/ai-bootstrap`
2. **GitHub Packages** (alternative): `npm install --registry=https://npm.pkg.github.com @azerogluemin/ai-bootstrap`
3. **Direct from GitHub**: `npm install github:eminazeroglu/ai-bootstrap`

## Post-publish actions

1. **Update GitHub README** to point to npm package
2. **Announce on Twitter / X**
3. **ProductHunt launch**
4. **AZ creator community Telegram**
5. **Update PROPOSAL.md status** → C-12 done

## Troubleshooting

### "Package name too similar to existing package"
- npm bəzən adları reject edir oxşar paketlər üçün
- Solution: scoped package istifadə et — `@azerogluemin/ai-bootstrap`

### "EAUTH" — authentication failed
- `npm login` yenidən edə
- 2FA OTP düz daxil et

### "EACCESS" — permission denied
- Public access üçün `--access public` flag mütləqdir (scoped paketlərdə)
- `publishConfig.access = "public"` package.json-da artıq var

### "Cannot find module" after install
- `files` field package.json-da düz konfiqurasiya edilməyib
- `dist/` daxildirmi yoxla — `npm pack --dry-run`

## CI/CD automation (gələcək)

GitHub Actions workflow yarat (`.github/workflows/publish.yml`):

```yaml
name: Publish to npm
on:
  release:
    types: [created]
jobs:
  publish:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: '22'
          registry-url: 'https://registry.npmjs.org'
      - run: pnpm install
      - run: pnpm test
      - run: npm publish --access public
        env:
          NODE_AUTH_TOKEN: ${{ secrets.NPM_TOKEN }}
```

NPM_TOKEN secret-ı GitHub repo settings-də əlavə etmək lazımdır.

## Status

- ✅ Package configured for publish
- ✅ npm pack dry-run successful (64 fayl, 26 kB)
- ✅ TypeScript build clean
- ✅ All 55 tests pass
- ⏳ Awaiting `npm login` + `npm publish` (manual user action)

---

**Last updated**: 2026-06-20 (Mərhələ C-12)
**Maintainer**: Emin Azəroğlu
