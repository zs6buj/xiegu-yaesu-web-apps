# Web radio control apps

Browser-based CAT / CI-V control with baseband waterfall and built-in **FT8 / FT4** (decode, TX, WSJT-X-style QSO). Open the HTML in **Chrome** or **Edge** — no install.

| App | Radio | Version |
|-----|--------|---------|
| [857app](./857app/) | Yaesu FT-857D (CAT) | v0.109 |
| [RadioWaterfall](./RadioWaterfall/) | Generic CAT / FLRig + waterfall | v0.52 |
| [G90app](./G90app/) | Xiegu G90 (CI-V) | v0.82 |

Each folder has a **feature overview** and **operating guide** in its `README.md`.

## Requirements

- Chrome or Edge (Web Serial API)
- Optional: local CORS proxy if using FLRig XML-RPC from the browser
- FT8/FT4: network once for WASM decoders (CDN); PC clock **NTP-synced**

## License notes

- UI/app code: free use for amateur radio
- FT8: **ft8js** (MIT). FT4: **@e04/ft8ts** (GPL) when FT4 is selected
