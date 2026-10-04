# 857app

**Yaesu FT-857D** browser CAT controller with SDR-style baseband waterfall and built-in **FT8 / FT4** RX/TX helpers.

Open [`857app.html`](./857app.html) in Chrome or Edge.

---

## Features

### Radio control (Web Serial CAT)
- Frequency, mode, VFO A/B, split, clarifier, lock
- Band buttons with standard FT8/FT4 dial frequencies when FT mode is active
- RPT shift / tone / CTCSS–DCS (including EEPROM-backed offset where mapped)
- NB, IPO, ATT, NAR, AGC, DNR/DNF (where supported via CAT/EEPROM)
- TX power (EEPROM band registers; disabled under FLRig)
- S-meter (CAT `0xE7`); TX meter mode PWR/ALC/MOD/SWR via EEPROM when on Web Serial
- EEPROM peek (16-bit address)

### Link modes
- **Web Serial** — full feature set (direct to radio)
- **FLRig XML-RPC** — via local bridge (freq/mode/S-meter/PTT subset; EEPROM-only controls greyed out)

### Spectrum / waterfall
- Web Audio baseband FFT (mic/line/USB codec)
- Gain, floor, ceil, FFT size, palette, span, OFS +1k display shift
- Click spectrum/waterfall to set FT TX audio Hz
- Vertical TX channel markers (FT8 ~50 Hz / FT4 ~90 Hz)
- USB dropout concealment; slower CAT poll while audio is running

### FT8 / FT4
- RX decode from the same audio stream (WASM: ft8js / @e04/ft8ts)
- Decode in a **Web Worker** to reduce audio glitches
- CQ filter; **red highlight** for messages containing **your call**
- Click row → TX Hz; double-click CQ → tune + arm TX + draft reply
- ARM TX / TX 1 SLOT / **TUNE** (continuous tone + PTT)
- TX drive slider; RX level meter (WSJT-X style)
- Auto QSY to band FT dial + **DIG** mode when starting FT
- Auto-start audio when decoding starts; FT8↔FT4 switch starts decode

---

## Operating guide

### 1. Connect the radio
1. USB–serial cable (or radio USB if it presents a serial port).
2. Choose **Web Serial (Direct)** or **FLRig (XML-RPC)**.
3. Click **Connect** and pick the port (Serial) or confirm bridge host/port (default `127.0.0.1:4534`).

### 2. Basic operation
- Tune with band buttons, frequency digits (scroll), or FLRig/other software when bridged.
- Mode buttons set SSB/CW/FM/DIG etc.
- Watch the **S-meter** on Web Serial or FLRig (`rig.get_smeter` when available).

### 3. Waterfall audio
1. Click **START AUDIO** and allow microphone/line access.
2. Select the radio **USB audio** device if listed (not the PC mic).
3. Adjust **GAIN / FLOOR / CEIL** so signals show clearly without constant red.
4. For FT work, span **0–2.5 kHz** (or similar) is usually enough.

### 4. FT8 / FT4 RX
1. Enter **CALL** and optional **GRID**.
2. Select **FT8** or **FT4** (starts decode and QSYs to the standard dial when possible).
3. Or press **START FT8/FT4** after audio is running.
4. Keep the PC clock **NTP-synced** (slots are UTC).
5. **CQ ONLY** filters the log; your call appears in **red**.

### 5. FT TX
1. Set **Hz** (click a decode or the waterfall).
2. Set **MSG** or leave blank for auto `CQ CALL GRID`.
3. Choose **TX even** or **TX odd** slots.
4. **ARM TX** for continuous slot TX, or **TX 1 SLOT** once.
5. **TUNE** = continuous tone at TX Hz + PTT (click again to stop).
6. Route **browser audio output** to the radio **DATA/USB** input; set radio to **DIG**; use **TX drive** and radio mic gain so ALC is modest.

### 6. FLRig notes
- Use a local CORS bridge; the browser cannot call FLRig directly.
- Expect freq/mode/meter/PTT — not EEPROM features (power slider, tone tables, etc.).

### Troubleshooting
| Symptom | Try |
|--------|-----|
| No connect | Chrome/Edge; correct port; close other CAT programs if not using FLRig |
| Waterfall silent | Correct USB audio device; START AUDIO; OS privacy settings |
| Dark bars on waterfall | USB composite CAT+audio — reduce other USB load; already mitigated in recent builds |
| No FT decodes | Audio level mid-green; UTC clock; full 15 s / 7.5 s of audio |
| TX not heard | DIG mode; audio path to radio; TX drive; PTT via CAT |

---

## Version

Bundled build: **v0.107** (`857app.html`).
