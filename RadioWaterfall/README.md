# RadioWaterfall (SDR Visualiser)

Generic **CAT / FLRig** front end with baseband **waterfall** and the same **FT8 / FT4** stack as 857app (including WSJT-X-style QSO).

Open [`RadioWaterfall.html`](./RadioWaterfall.html) in Chrome or Edge.

**Version:** v0.52

---

## Features

### Link / radio
- Web Serial or FLRig bridge
- Radio / CAT profile selection (FT-857 family, Generic, Icom CI-V, Kenwood, Elecraft options in UI)
- Frequency and mode as supported by the selected path

### Spectrum / waterfall
- Web Audio FFT waterfall + spectrum
- Device, gain, floor, ceil, FFT, speed, colour, span
- Click-to-set FT TX Hz; TX channel markers
- USB dropout concealment

### FT8 / FT4
- Worker decode; CQ filter
- **Red** = to your call; **blue** = your TX (incl. your CQ)
- Tx1–Tx6 standard messages, Gen Std Msgs, Next, Auto Seq
- Double-click CQ → answer sequence + arm TX
- ARM TX / TUNE / TX drive / RX meter
- Auto QSY + digital mode where applicable

---

## Operating guide

### Connect
1. **LINK**: Web Serial or FLRig.
2. Serial: radio/CAT profile → **Connect** → port.
3. FLRig: bridge host/port → **Connect**.

### Waterfall
1. **START AUDIO** → radio USB/line input.
2. Set GAIN/FLOOR/CEIL for a clear display.

### FT8 / FT4
1. CALL / GRID.
2. FT8 or FT4 (switching can auto-start decode).
3. **Gen Std Msgs** / **Auto Seq** for QSO flow (see 857app README table).
4. Double-click CQ to answer; **CQ…** / Tx1 to call CQ.
5. Audio out → radio digital input; PTT via CAT/FLRig.

### Tips
- NTP clock required for FT modes.
- USB radios sharing CAT and audio: avoid extra CAT load while watching the waterfall.
- FLRig is ideal when WSJT-X must share the rig.

---

## Files
- `RadioWaterfall.html` — single-file app
