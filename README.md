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


## Android APK build

This repository now includes a native Android wrapper around the web TV app. The Android app loads the static player from `app/src/main/assets/www/index.html` inside a WebView, enables JavaScript/local storage for playlist features, and requests internet access for legal live streams.

### Build locally

```bash
gradle --no-daemon assembleDebug
```

The debug APK will be written to `app/build/outputs/apk/debug/app-debug.apk`.

### Build on GitHub Actions

The workflow at `.github/workflows/android-apk.yml` builds the debug APK on pushes, pull requests, and manual `workflow_dispatch` runs, then uploads `turksat-tv-hub-debug-apk` as an artifact.


## Public internet streams

The app includes direct public TRT HLS entries where known and a **Load public streams** button that fetches the IPTV-Org Turkey playlist (`https://iptv-org.github.io/iptv/countries/tr.m3u`) at runtime. These internet streams can change, go offline, or be geo-blocked by the broadcaster/CDN. Only add streams that are intentionally public or that you have permission to watch.
