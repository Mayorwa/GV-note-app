# Note Application 

## how to setup
#### #1 to setup the project first install all packages on each folder
```bash 
[/web] npm install
[/api] npm install
```
#### #2 set up the environment files(for web .env, for api config/development.env):
the api uses mongodb for storing data so edit theses variables
```bash 
edit these variables in the api/config/developement.env file
'DATABASE_LOCAL', 'DATABASE_NAME'

DATABASE_LOCAL=your database url
DATABASE_NAME=your database name
```

#### #3 set up url to avoid cors:
to avoid cors error since the urls will be served locally set up a custom localhost url on your device for the web project to run on

a. setup the custom url for localhost on your machine
```bash 
to set up a custom localhost url check this link
```
https://emmapopoola.medium.com/setting-up-a-custom-domain-for-your-local-apps-mac-os-linux-c68798722143

b. add the url to the web project
```bash 
in the "web/vite.config.ts" file
edit the "host" value to match your url
server: {
  host: 'themayowa.custom',
},
```
c. add the url to the api
```bash 
edit the whitelist url in line 27 in the "api/app.ts" file
const whitelist = ['http://themayowa.custom:5173']

```

#### #4 running the project:
to run each project

while in the api project folder run the script:
```bash 
[/api]: npm run dev
```
while in the web project folder run:
```bash 
[/web]: npm run dev
```
now both project should be running on these urls respectively:
```bash 
[/api]: http://127.0.0.1:3000/
[/web]: http://[custom_domain]:5173/
```







