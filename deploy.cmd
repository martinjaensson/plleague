cd app
npm install && npm run build:prod 
&& del /q D:\home\site\wwwroot\* && for /d %%x in (D:\home\site\wwwroot\*) do @rd /s /q "%%x" && xcopy /s D:\home\site\repository\app\dist D:\home\site\wwwroot