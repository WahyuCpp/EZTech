@echo off
cd /d "%~dp0"
set "PATH=C:\Programming Environment\node;%PATH%"
"C:\Programming Environment\npm\npm.cmd" run build
