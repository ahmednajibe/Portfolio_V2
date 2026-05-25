@echo off
echo Building...
call npm run build

echo Uploading...
scp -r .output root@67.205.171.104:/var/www/portfolio

echo Clearing cache and restarting...
ssh root@67.205.171.104 "rm -rf /var/www/portfolio/server /var/www/portfolio/public && mv /var/www/portfolio/.output/* /var/www/portfolio/ 2>/dev/null; pm2 restart portfolio"

echo Done!
pause