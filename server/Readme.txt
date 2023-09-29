先在前端安裝好package.json所要求的資源 接著回到TEMP_PACKAGE-MAIN
1. npm i 
在使用github上的source code 時 可能會遇到無法npm start的問題 以下幾項說明請注意
2. cd src => 先轉換路徑至前端folder
3. npm i --force 
4. npm remove mysql 
5. npm i mysql2 --save
將server.js中 require mysql改成mysql2 

執行完畢後 打開MYSQL COMMAND LINE 創建DB及TABLE
4. FOR LOGIN/REGISTER 以下指令

CREATE DATABASE test
CREATE TABLE test.login(
    id INT AUTO_INCREMENT PRIMARY KEY,
    firstname VARCHAR(255),
    lastname VARCHAR(255),
    email VARCHAR(255),
    password VARCHAR(255),
)
CREATE TABLE test.avx(
    id INT AUTO_INCREMENT PRIMARY KEY,
    file_name VARCHAR(255) NOT NULL,
    image_data LONGBLOB NOT NULL
);
接下來回到terminal , cd src 
隨後就可以打開專案 npm start 成功後會看到 Connected to MYSQL database
打開以下網址: localhost:3000 






製作Stable diffusion api interface -> TXT TO IMG / IMG TO IMG 
1. SOLVE THE DESIGN OF PAGE -> CSS / ANTDESIGN / MATERIAL UI
2. CONNECT THE API TO DELIVER PARAMETERS FROM SEVER 
3. TEST / PUSH 
