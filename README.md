# 短網址生產器
使用者可以輸入網址，並得到末5位由隨機亂碼組成的短網址

![image](/public/images/shortened_url.png)

## 環境需求
* Node.js - Development Environment
* Express - Web Application Framework
* Express handlebars - Template Engine
* Body-parser
* MongoDB - Document-oriented Database
* Mongoose - MongoDB Object Modeling(ODM)


## 安裝與執行步驟
1. 下載專案至本機
```
git clone https://github.com/Liangni/url_shortener.git
```
2. 開啟終端機，進入本專案資料夾
```
cd url_shortener
```
3. 安裝npm套件
```
npm install
```
4. 插入種子資料
```
npm run seed
```
5. 在終端機輸入下方指令啟動專案
```
npm run dev
```
6. 當終端機出現App is running on https://localhost:3000，即可以在瀏覽器輸入http://localhost:3000/ 開始使用網站
