# Türksat 4A TV Hub

A static web TV app for organizing Türksat 4A-style channel listings, loading public internet TV streams, importing legal IPTV playlists, and playing browser-supported live streams in a central media player.

## Important signal note

Türksat 4A channels are broadcast by satellite. A normal browser cannot receive satellite broadcasts through Wi‑Fi or Bluetooth alone. This app is designed for:

- official broadcaster web/HLS stream URLs,
- the built-in public internet stream loader for the IPTV-Org Turkey playlist,
- legal IPTV/M3U playlists,
- streams exposed over your local Wi‑Fi network by a DVB-S2 satellite tuner or gateway.

Bluetooth is only suitable for pairing nearby devices and cannot carry the satellite broadcast itself.

## Run locally

Open `index.html` directly in a browser, or serve the folder locally:

```bash
python3 -m http.server 8080
```

Then visit `http://localhost:8080`.

## Android APK

The Android wrapper app uses the application ID/package name `com.gamexturk.istektv` and loads the bundled web app from `app/src/main/assets/www`.

Build a debug APK locally with:

```bash
gradle --no-daemon :app:assembleDebug
```

The APK will be written to `app/build/outputs/apk/debug/app-debug.apk`. GitHub Actions also builds and uploads this APK through the **Build Android APK** workflow.

## GitHub Pages website

This project is now ready to publish as a plain static GitHub Pages website. The live web app uses the root files directly:

- `index.html` for the page markup,
- `styles.css` for the same TV-player look and responsive layout,
- `app.js` for channel browsing, favorites, imports, public streams, and playback,
- `assets/logo.svg` for the app icon/poster artwork.

The Android project builds an APK with package name `com.gamexturk.istektv`. The GitHub Actions workflow at `.github/workflows/android-apk.yml` builds the debug APK and uploads it as an artifact, while `.github/workflows/github-pages.yml` continues to publish the static site.

### Publish on GitHub Pages

1. Push this repository to GitHub.
2. In the repository settings, open **Pages**.
3. Set **Build and deployment** to **GitHub Actions**.
4. Push to `main` or `master`, or run the **Deploy GitHub Pages site** workflow manually.

## Public internet streams

The app includes direct public TRT HLS entries where known and a **Load public streams** button that fetches the IPTV-Org Turkey playlist (`https://iptv-org.github.io/iptv/countries/tr.m3u`) at runtime. These internet streams can change, go offline, or be geo-blocked by the broadcaster/CDN. Only add streams that are intentionally public or that you have permission to watch.
