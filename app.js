var Julius   = require('julius');
var grammar = new Julius.Grammar();

var OpenJTalk = require('openjtalk');
var voice = new OpenJTalk();

var arDrone = require('ar-drone');
var client  = arDrone.createClient();
var http = require("http");

var server = http.createServer(function(req, res) {
  require("fs").createReadStream(__dirname + "/index.html").pipe(res);
});
require("dronestream").listen(server);
server.listen(3000);

// ドローン初期化ひとまず以下のコマンドを打っておけば大丈夫なはず
client.stop();
client.calibrate(0);
client.disableEmergency();

// 音声認識させる言葉を覚えさせる
grammar.add('ドローン?(テイクオフ|アヘッド|バック|レフト|ライト|ターン|ランディング|ストップ|アップ|ダウン|アニメーションジャンプ|アニメーションターン|アニメーションウエイブ)');
//以下ノイズ対応。よく出そうな単語等
grammar.add('(ノイズ|拾う|認識|音声|解析)');
grammar.add('(ノイズを拾う|じゅげむじゅげむ|ニンジャ|ナンデ|サン|ドーモ|サツバツ|バイオゴリラ|ミキプルーン|株式会社|テコラス|ノード|ライン|イシュコン|コンテスト|景品|開発|おお|です|から|って|プログラム|バージョン|うん|うーむ|ただ|また|だって)');
var kana = 'あいうえおかきくけこさしすせそたちつてとなにぬねのはひふへほまみめもやゆよらりるれろわをがぎぐげござじずぜぞだぢづでど';
for (var i = 0; i < kana.length; ++i) {
	grammar.add(kana[i]);
}

grammar.compile(function(err, result) {
	if (err) throw err;

	// Julius インスタンスの生成
    var julius = new Julius( grammar.getJconf() );

	julius.on('result', function(str) {
		if (str) console.log(str.slice(0).toString());
		switch (str) {
			case 'ドローンテイクオフ' :
        client.stop();
        client.takeoff();
        voice.talk('離陸します');
        break;
			case 'ドローンランディング' :
        client.stop();
        client.land();
        voice.talk('着陸します');
        break;
			case 'ドローンアヘッド' :
        client.stop();
        client.front(0.1);
        voice.talk('前進します');
        break;
			case 'ドローンバック' :
        client.stop();
        client.back(0.1);
        voice.talk('後進します');
        break;
      case 'ドローンライト' :
        client.stop();
        client.right(0.1);
        voice.talk('右へ移動します');
        break;
      case 'ドローンレフト' :
        client.stop();
        client.left(0.1);
        voice.talk('左へ移動します');
        break;
      case 'ドローンアップ' :
        client.stop();
        client.up(1);
        client
          .after(1000, function() {
            this.stop();
          });
        voice.talk('上昇します');
        break;
      case 'ドローンダウン' :
        client.stop();
        client.down(1);
        client
          .after(1000, function() {
            this.stop();
          });
        voice.talk('下降します');
        break;
			case 'ドローンターン' :
        client.stop();
        client.clockwise(0.3);
        voice.talk('回転します');
        break;
			case 'ドローンストップ' :
        client.stop();
        voice.talk('停止します');
        break;
      case 'ドローンアニメーションジャンプ' :
        client.stop();
        client.animate('flipBehind', 15);
        voice.talk('ジャンプ');
        break;
      case 'ドローンアニメーションターン' :
        client.stop();
        client.animate('turnaround', 2000);
        client
          .after(2000, function() {
            this.stop();
          });
        voice.talk('ターン');
        break;
      case 'ドローンアニメーションウエイブ' :
        client.stop();
        client.animate('wave', 2000);
        client
          .after(2000, function() {
            this.stop();
          });
        voice.talk('ウエイブ');
        break;
		}
	});

  voice.talk('テコラス 株式会社 ドローンシステム バージョン0.01 起動します。');
	console.log('テコラス 株式会社 ドローンシステム バージョン0.01 起動します。');
	// 音声認識の開始
	setTimeout(function() {
        julius.start();
    }, 10000);
});
