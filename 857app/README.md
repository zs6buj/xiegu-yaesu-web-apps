# 857app

**Yaesu FT-857D** browser CAT controller with SDR-style baseband waterfall and built-in **FT8 / FT4** RX/TX and WSJT-X-style QSO sequencing.

Open [`857app.html`](./857app.html) in Chrome or Edge.

**Version:** v0.109

---

## Features

### Radio control (Web Serial CAT)
- Frequency, mode, VFO A/B, split, clarifier, lock
- Band buttons; auto QSY to FT8/FT4 dial frequencies when FT mode is active
- RPT shift / tone / CTCSS–DCS (EEPROM-backed offset where mapped)
- NB, IPO, ATT, NAR, AGC, DNR/DNF (CAT/EEPROM as supported)
- TX power (EEPROM band registers; disabled under FLRig)
- S-meter (CAT `0xE7`); TX meter mode PWR/ALC/MOD/SWR via EEPROM on Web Serial
- EEPROM peek (16-bit address)

### Link modes
- **Web Serial** — full feature set
- **FLRig XML-RPC** — via local bridge (freq/mode/S-meter/PTT subset; EEPROM-only controls greyed out)

### Spectrum / waterfall
- Web Audio baseband FFT (USB codec / line / mic)
- Gain, floor, ceil, FFT size, palette, span, OFS +1k
- Click spectrum/waterfall → FT TX audio Hz
- Vertical TX channel markers (FT8 ~50 Hz / FT4 ~90 Hz)
- USB dropout concealment; slower CAT poll while audio is running

### FT8 / FT4
- RX decode from the same audio stream (WASM; decode in a **Web Worker**)
- CQ filter; **red** = messages to **your call**; **blue** = **your own TX** (including your CQ)
- Click decode → TX Hz; double-click CQ → DX + Tx2 + Auto Seq + arm TX
- **WSJT-X-style standard messages** (Tx1–Tx6), **Gen Std Msgs**, **Next**, **Auto Seq**
- ARM TX / TX 1 SLOT / **TUNE** (continuous tone + PTT)
- TX drive slider; RX level meter
- Auto QSY + **DIG** mode when starting FT

---

## Operating guide

### 1. Connect
1. USB–serial (or radio USB serial).
2. **Web Serial (Direct)** or **FLRig (XML-RPC)**.
3. **Connect** → choose port, or set bridge host/port (default `127.0.0.1:4534`).

### 2. Everyday radio use
- Band buttons, frequency digits, mode grid.
- S-meter on Serial or FLRig (`rig.get_smeter` when available).
- FLRig: TX meter mode, power slider, and EEPROM tools stay disabled (no EEPROM over XML-RPC).

### 3. Waterfall
1. **START AUDIO** → allow access → select radio **USB audio** device.
2. Adjust **GAIN / FLOOR / CEIL**.
3. Prefer span ~0–2.5 kHz for FT work.

### 4. FT8 / FT4 receive
1. Enter **CALL** and optional **GRID**.
2. Select **FT8** or **FT4** (starts decode and QSYs when possible).
3. Keep the PC clock **NTP-synced**.
4. **CQ ONLY** filters the log. Colour key: amber = others’ CQ, red = to you, blue = your TX.

### 5. Standard QSO (like WSJT-X)

| Tx | Meaning | Example |
|----|---------|---------|
| Tx1 | You call CQ | `CQ ZS6BUJ KG43` |
| Tx2 | You answer their CQ | `K1ABC ZS6BUJ KG43` |
| Tx3 | Signal report | `K1ABC ZS6BUJ -10` |
| Tx4 | Roger + report | `K1ABC ZS6BUJ R-10` |
| Tx5 | RR73 | `K1ABC ZS6BUJ RR73` |
| Tx6 | 73 | `K1ABC ZS6BUJ 73` |

1. Set CALL / GRID (and **DX** if known).
2. **Gen Std Msgs** fills Tx1–Tx6.
3. Select a Tx line, or use **Next**.
4. **Auto Seq** advances after a matching decode (report → R-report → RR73 → 73).
5. **Double-click a CQ** in the log: sets DX, Tx2, Auto Seq on, arms TX.
6. **CQ…** selects Tx1 (you call CQ).

### 6. FT transmit
1. MSG is driven by the selected Tx (or free text in MSG).
2. **ARM TX** or **TX 1 SLOT**; choose even/odd slots.
3. **TUNE** = continuous tone at TX Hz + PTT.
4. Browser audio **out** → radio **DATA/USB**; radio in **DIG**; set **TX drive** and radio gain for modest ALC.

### Troubleshooting
| Symptom | Try |
|--------|-----|
| No connect | Chrome/Edge; free the serial port (or use FLRig share) |
| Silent waterfall | Correct USB audio device; START AUDIO |
| Black bars on waterfall | USB CAT+audio contention — mitigated; try audio-only test |
| No decodes | Level mid-green on RX meter; NTP clock; full slot of audio |
| TX not heard | DIG mode; audio path; TX drive; CAT PTT |

---

## Files
- `857app.html` — single-file app (open locally or via static hosting)
