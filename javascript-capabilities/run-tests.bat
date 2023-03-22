set BROWSER=none
start "SERVERRUNNER" python -m http.server --directory www
for /F "TOKENS=1,2,*" %%a in ('tasklist /FI "WindowTitle eq SERVERRUNNER*"') do set MyPID=%%b
echo %MyPID%
timeout 10
node e2e-test-runner.js
taskkill /PID %MyPID% /T /F