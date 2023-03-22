set BROWSER=none
start "NPMRUNNER" npm run start
for /F "TOKENS=1,2,*" %%a in ('tasklist /FI "WindowTitle eq NPMRUNNER*"') do set MyPID=%%b
echo %MyPID%
timeout 10
node e2e-test-runner.js
taskkill /PID %MyPID% /T /F