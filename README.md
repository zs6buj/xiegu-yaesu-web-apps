# Web radio control apps

Browser-based CAT / CI-V control and FT8/FT4 tools. No install — open the HTML file in **Chrome** or **Edge**.

| App | Radio | Latest |
|-----|--------|--------|
| [857app](./857app/) | Yaesu FT-857D (CAT) | v0.107 |
| [RadioWaterfall](./RadioWaterfall/) | Generic CAT / FLRig + SDR waterfall | v0.50 |
| [G90app](./G90app/) | Xiegu G90 (CI-V) | v0.80 |

Each folder has a **feature overview** and **operating guide** in its `README.md`.

## Requirements

- Chrome or Edge (Web Serial API)
- Optional: [rw-flrig-bridge](https://github.com/) or similar local CORS proxy if using FLRig XML-RPC
- For FT8/FT4: network access once to load WASM decoders from CDN; system clock NTP-synced

## License notes

- App UI/code in this repo: use as you wish for amateur radio purposes.
- FT8 decode uses **ft8js** (MIT). FT4 uses **@e04/ft8ts** (GPL) loaded from CDN when FT4 is selected.
