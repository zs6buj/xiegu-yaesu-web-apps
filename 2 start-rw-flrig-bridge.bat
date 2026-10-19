@echo off
REM ---------------------------------------------------------------------
REM start-rw-flrig-bridge.bat
REM Double-click launcher for rw-flrig-bridge.js on Windows.
REM Keep this .bat in the SAME FOLDER as rw-flrig-bridge.js.
REM
REM To use non-default hosts/ports, edit the "set" lines below, e.g.:
REM   set BRIDGE_PORT=4535
REM ---------------------------------------------------------------------

cd /d "%~dp0"

where node >nul 2>nul
if errorlevel 1 (
    echo.
    echo [ERROR] Node.js was not found on this system.
    echo Install it from https://nodejs.org ^(LTS version^), then run this again.
    echo.
    pause
    exit /b 1
)

if not exist "rw-flrig-bridge.js" (
    echo.
    echo [ERROR] rw-flrig-bridge.js was not found in this folder:
    echo   %~dp0
    echo Put start-rw-flrig-bridge.bat in the same folder as rw-flrig-bridge.js.
    echo.
    pause
    exit /b 1
)

REM Uncomment and edit any of these to override the defaults:
REM set FLRIG_HOST=127.0.0.1
REM set FLRIG_PORT=12345
REM set BRIDGE_PORT=4534

echo Starting rw-flrig-bridge.js ...
echo Leave this window open while using RadioWaterfall. Close it to stop the bridge.
echo.

node rw-flrig-bridge.js

echo.
echo [Bridge stopped]
pause
