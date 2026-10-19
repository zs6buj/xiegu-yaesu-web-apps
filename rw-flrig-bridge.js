#!/usr/bin/env node
/*
 * rw-flrig-bridge.js
 * ---------------------------------------------------------------------
 * A tiny local bridge that lets RadioWaterfall (running in a browser)
 * talk to FLRig's built-in XML-RPC server. FLRig's XML-RPC server
 * doesn't send CORS headers, so a browser page's fetch() to it directly
 * gets blocked. This script is a plain reverse proxy: it adds the CORS
 * headers and forwards each request/response body to FLRig untouched.
 *
 * This is what makes RadioWaterfall and WSJT-X able to control the same
 * radio at the same time: FLRig is the single owner of the physical
 * serial port, and its XML-RPC server happily answers multiple
 * independent clients. WSJT-X talks to FLRig directly (it's a native
 * app, no CORS restriction, no bridge needed); RadioWaterfall goes
 * through this bridge because it's running in a browser.
 *
 *          Radio <--serial--> FLRig (owns the port)
 *                                 | XML-RPC, HTTP :12345, path /RPC2
 *                 -----------------------------------
 *                 |                                 |
 *           WSJT-X (direct HTTP,              rw-flrig-bridge.js
 *           Rig: "FLRig")                     (this script)
 *                                                 | HTTP :4534
 *                                           RadioWaterfall (browser)
 *
 * SETUP
 * -----
 * 1. Install FLRig if you don't have it already: w1hkj.org/flrig-help
 *
 * 2. Start FLRig, select your radio and serial port as usual (Config ->
 *    Setup -> Transceiver), and make sure "XML-RPC" is enabled — it's on
 *    by default, listening on 127.0.0.1:12345.
 *
 * 3. Run this bridge (no npm install needed — uses only Node built-ins):
 *      node rw-flrig-bridge.js
 *    Optional env vars (defaults shown):
 *      FLRIG_HOST=127.0.0.1 FLRIG_PORT=12345 BRIDGE_PORT=4534 node rw-flrig-bridge.js
 *
 * 4. In WSJT-X: Settings -> Radio -> Rig: "FLRig" (talks to FLRig
 *    directly over XML-RPC at 127.0.0.1:12345 — no bridge involved).
 *
 * 5. In RadioWaterfall: set LINK to "FLRig (XML-RPC)", leave BRIDGE at
 *    127.0.0.1:4534 (or match BRIDGE_PORT above), click Connect.
 *
 * Both apps can now poll/set frequency and mode independently; FLRig
 * serializes their commands onto the one serial port.
 * ---------------------------------------------------------------------
 */

const http = require("http");

const FLRIG_HOST = process.env.FLRIG_HOST || "127.0.0.1";
const FLRIG_PORT = parseInt(process.env.FLRIG_PORT || "12345", 10);
const BRIDGE_PORT = parseInt(process.env.BRIDGE_PORT || "4534", 10);
const FLRIG_PATH = "/RPC2"; // FLRig's XML-RPC server's fixed endpoint path

function log(...args) {
  console.log(new Date().toISOString().slice(11, 19), ...args);
}

const CORS_HEADERS = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type",
};

const server = http.createServer((req, res) => {
  if (req.method === "OPTIONS") {
    res.writeHead(204, CORS_HEADERS);
    res.end();
    return;
  }

  if (req.method !== "POST") {
    res.writeHead(200, { "Content-Type": "text/plain", ...CORS_HEADERS });
    res.end("rw-flrig-bridge.js is running. RadioWaterfall talks to it via POST, not GET.\n");
    return;
  }

  const chunks = [];
  req.on("data", (c) => chunks.push(c));
  req.on("end", () => {
    const body = Buffer.concat(chunks);

    const upstream = http.request(
      {
        host: FLRIG_HOST,
        port: FLRIG_PORT,
        path: FLRIG_PATH,
        method: "POST",
        headers: {
          "Content-Type": "text/xml",
          "Content-Length": Buffer.byteLength(body),
        },
      },
      (upRes) => {
        const upChunks = [];
        upRes.on("data", (c) => upChunks.push(c));
        upRes.on("end", () => {
          res.writeHead(upRes.statusCode || 200, {
            "Content-Type": "text/xml",
            ...CORS_HEADERS,
          });
          res.end(Buffer.concat(upChunks));
        });
      }
    );

    upstream.on("error", (e) => {
      log("FLRig connection error:", e.message);
      res.writeHead(502, { "Content-Type": "text/plain", ...CORS_HEADERS });
      res.end("Bridge could not reach FLRig at " + FLRIG_HOST + ":" + FLRIG_PORT + " — " + e.message);
    });

    upstream.write(body);
    upstream.end();
  });
});

server.listen(BRIDGE_PORT, () => {
  log(`rw-flrig-bridge.js listening on http://127.0.0.1:${BRIDGE_PORT}`);
  log(`Relaying to FLRig's XML-RPC server at http://${FLRIG_HOST}:${FLRIG_PORT}${FLRIG_PATH}`);
  log("Start FLRig first if you haven't, with its XML-RPC server enabled (on by default).");
});
