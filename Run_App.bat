@echo off
cd /d C:\Users\keanc\Desktop\SmartRead-main

:: Start the dev server in a new command prompt window
start cmd /k "npm run dev"

:: Wait a few seconds for the server to start (optional but helpful)
timeout /t 3 >nul

:: Open the browser
start http://localhost:5173/
pause
