# G90app

**Xiegu G90** browser controller over **CI-V** (Web Serial or FLRig), with band scope / waterfall and **FT8 / FT4** (WSJT-X-style QSO).

Open [`G90app.html`](./G90app.html) in Chrome or Edge.

**Version:** v0.82

---

## Features

### Radio (CI-V)
- Frequency with per-digit scroll
- Modes: LSB, USB, AM, CW, CWR, NFM, **L-D**, **U-D**
- VFO A/B, split, lock, RIT
- PRE/ATT, AGC, NB, COMP
- TX power, AF, SQL
- Digital filter group + IF width
- ATU / PTT / tune
- S-meter (and related meters)

### Link
- Web Serial (typical G90 CI-V 19200 8N1)
- FLRig bridge (subset; some controls need Web Serial)

### Scope
- Audio-driven RF-centred scope; span auto by mode
- Gain independent of radio AF (no AF-linked pumping)
- TX channel markers when FT is active

### FT8 / FT4
- Same workflow as 857app / RadioWaterfall
- Digital mode on G90 is **U-D** (not Yaesu DIG)
- Band buttons QSY to standard FT dials when FT mode is selected
- Tx1–Tx6, Gen Std Msgs, Next, Auto Seq
- **Blue** own TX / CQ; **red** to your call
- TX drive, RX meter, TUNE

---

## Operating guide

### Connect
1. Match **CI-V address** to the radio (often `70h`).
2. Web Serial → **Connect** → G90 port; or FLRig bridge host/port.

### Everyday use
- Band, mode, AF/SQL, power, filters, RIT as needed.

### Scope
1. **START** on the scope card; select G90 USB audio.
2. Adjust GAIN so the display is usable without constant overload.

### FT8 / FT4
1. CALL / GRID.
2. FT8 or FT4 — app QSYs and switches to **U-D**.
3. Gen Std Msgs / Auto Seq for standard QSOs; double-click CQ to answer.
4. Audio out → G90 data/USB; set TX drive; ARM TX or TUNE.

### FLRig limitations
Raw CI-V-only controls (NB, COMP, PRE, some filters, etc.) may be disabled — use Web Serial for full access.

---

## Files
- `G90app.html` — single-file app
