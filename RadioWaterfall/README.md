# RadioWaterfall (SDR Visualiser)

Generic **CAT / FLRig** front end with a strong **baseband waterfall** and the same **FT8 / FT4** toolset as 857app, aimed at multi-rig use (Yaesu-focused CAT profiles included).

Open [`RadioWaterfall.html`](./RadioWaterfall.html) in Chrome or Edge.

---

## Features

### Link / radio
- Web Serial or FLRig bridge
- Radio model / CAT profile selection (FT-857 family, Generic, Icom CI-V, Kenwood, Elecraft options in UI)
- Frequency, mode, basic transport controls as supported by the selected path

### Spectrum / waterfall
- Web Audio FFT waterfall + live spectrum
- Device picker, gain, floor, ceil, FFT size, speed, colour, span
- Click-to-set FT TX audio frequency
- FT TX channel markers
- USB dropout concealment

### FT8 / FT4
- Same feature set as 857app: worker decode, CQ filter, callsign highlight, TX arm/tune, drive & RX meters, auto QSY + digital mode where applicable

---

## Operating guide

### 1. Connect
1. Select **LINK**: Web Serial or FLRig.
2. For Serial: choose radio/CAT profile, **Connect**, pick port.
3. For FLRig: host/port of the bridge → **Connect**.

### 2. Waterfall
1. **START AUDIO** → select radio USB/line input.
2. Adjust GAIN/FLOOR/CEIL for a clear display.
3. Use span to zoom the passband of interest.

### 3. FT8 / FT4
Same workflow as 857app:

1. CALL / GRID  
2. FT8 or FT4 (auto-starts decode when switching)  
3. Click decodes to set TX Hz; double-click CQ to arm  
4. ARM TX / TUNE / TX drive as needed  
5. Browser audio out → radio digital input; PTT via CAT/FLRig  

### 4. Tips
- Prefer **NTP clock** for FT modes.
- On USB radios that share CAT and audio, avoid heavy parallel CAT traffic while watching the waterfall.
- FLRig mode is ideal when WSJT-X or other apps must share the rig.

---

## Version

Bundled build: **v0.50** (`RadioWaterfall.html`).
