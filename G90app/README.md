# G90app

**Xiegu G90** browser controller over **CI-V** (Web Serial or FLRig bridge), with integrated **waterfall / band scope** and **FT8 / FT4**.

Open [`G90app.html`](./G90app.html) in Chrome or Edge.

---

## Features

### Radio (CI-V)
- Frequency display with per-digit scroll tune
- Modes: LSB, USB, AM, CW, CWR, NFM, **L-D**, **U-D**
- VFO A/B, split, lock, RIT
- PRE/ATT, AGC, NB, COMP
- TX power, AF, SQL
- Digital filter group + IF width
- ATU / PTT / tune
- S-meter and other meters (poll cadence respectful of G90 CAT)

### Link
- Web Serial @ 19200 8N1 (typical G90 CI-V)
- FLRig XML-RPC via local bridge (subset of controls; some need Web Serial)

### Scope
- RF-centred band scope driven from audio baseband
- Span auto by mode (including U-D / L-D baseband scale)
- Gain/floor/ceil/FFT/speed/palette

### FT8 / FT4
- Same overall workflow as 857app / RadioWaterfall
- Digital mode on G90 is **U-D** (USB-DATA), not Yaesu “DIG”
- Band buttons QSY to standard FT dial frequencies when FT mode is selected
- TX channel markers, RX meter, TX drive, TUNE, callsign highlight

---

## Operating guide

### 1. Connect
1. Match **CI-V address** to the radio/FLrig (often `70h`).
2. **Web Serial**: Connect → choose the G90 serial interface.
3. **FLRig**: bridge host/port → Connect (freq/mode/power/PTT oriented).

### 2. Everyday use
- Band buttons, mode grid, AF/SQL, power.
- Filter group + IF width for SSB/digital comfort.
- RIT slider when needed.

### 3. Scope audio
1. **START** on the waterfall card; pick the G90 USB audio device.
2. Set GAIN so the scope is useful without constant overload.
3. Scope gain is **not** tied to radio AF (avoids amplitude pumping).

### 4. FT8 / FT4
1. Enter CALL / GRID.
2. Select FT8 or FT4 — app QSYs and switches to **U-D**.
3. Decode log, CQ filter, red = to you.
4. TX: audio out → G90 data/USB; **TX drive** + radio digital gain; **ARM TX** or **TUNE**.

### 5. FLRig limitations
Controls that need raw G90 CI-V (NB, COMP, PRE, RIT details, some filters, NFM/L-D/U-D in some setups) may be disabled — use Web Serial for full access.

---

## Version

Bundled build: **v0.80** (`G90app.html`).
