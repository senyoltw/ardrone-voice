ardrone-voice
=============
### Introduction
ドローンを日本語で操作するやつ！！
### How to install
```bash
git clone https://github.com/senyoltw/ardrone-voice.git
cd ardrone-voice

npm install

git clone https://github.com/hecomi/node-openjtalk
mv node-openjtalk node_modules/openjtalk
cd node_modules/openjtalk
npm install

# accses Wi-Fi AR Drone
node app.js
```

### Thanks!
@hecomi [node-julius](https://github.com/hecomi/node-julius) [node-openjtalk](https://github.com/hecomi/node-openjtalk)