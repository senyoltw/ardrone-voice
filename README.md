ardrone-voice
=============
Need! [Parrot AR Drone 2.0](http://www.amazon.co.jp/gp/product/B00HYO158Q?ie=UTF8&camp=1207&creative=8411&creativeASIN=B00HYO158Q&linkCode=shr&tag=senyoltw-22&qid=1414738801&sr=8-3&keywords=AR+Drone+2)  
Install! [node.js](http://ja.wikipedia.org/wiki/Node.js)

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
