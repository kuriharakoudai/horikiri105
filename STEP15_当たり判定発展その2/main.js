enchant(); 
var RUN_FRAME_LIST  = [1, 2];
score = 0;

window.onload = function() {

    
    game = new Game(320, 320);
    game.fps = 30;
    game.preload('chara1.png', 'icon0.png', 'chara2.png', 'icon1.png', 'map0.png','font0.png');

    game.onload = function() {


        /* 16x16 pxのサイズでマップオブジェクトの用意 */
        map = new Map(16, 16);
        /* マップオブジェクトに画像を登録 */
        map.image = game.assets['map0.png'];
        /* 配列でマップデータを用意する */
        mapArray = [
            [ 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4 ],
            [ 4, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ],
            [ 4, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ],
            [ 4, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ],
            [ 4, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ],
            [ 4, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ],
            [ 4, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ],
            [ 4, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ],
            [ 4, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ],
            [ 4, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ],
            [ 4, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ],
            [ 4, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ],
            [ 4, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ],
            [ 4, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ],
            [ 4, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ],
            [ 4, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ],
            [ 4, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ],
            [ 4, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ],
            [ 4, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ],
            [ 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4 ]
        ];
        
        /* マップデータをマップオブジェクトに渡す */
        map.loadData(mapArray);
        /* シーンにマップオブジェクトを渡してシーンに描画する */
        game.rootScene.addChild(map); 

        //ラベル作成
        label = new Label();
        
        //ラベルの中身
        label.text = "score:"+score;
        
        //ラベル座標
        label.x = 80;
        label.y = 0;
        
        //ラベルサイズ
        label.scaleY = 2;
        label.scaleX = 1.5;
        
        //ラベルカラー
        label.color = "white";
        
        game.rootScene.addChild(label);

        /* Player クラスのクマを1匹作る */
        player = new Sprite(32, 32);
        player.image = game.assets['chara1.png'];
        player.frameIndex = 0;

        // 更新処理
        player.onenterframe = function() {
            if (game.frame % 4 == 0) {
                // フレームインデックスを調整
                this.frameIndex += 1;
                this.frameIndex %= RUN_FRAME_LIST.length;
                // フレームを変更
                this.frame = RUN_FRAME_LIST[this.frameIndex];

                
                
            }
        };
        /* 画面に表示する (ひとつだけでる) */
        game.rootScene.addChild(player);
        
        game.rootScene.tl.delay(10).then(function() {
            game.rootScene.addChild(new Apple());
        }).loop();
    };

    

    /* タッチに付いてくるようにする
    touchmove: タッチ座標が動いたときのイベント */
    game.rootScene.ontouchmove = function(evt) {
        /* タッチしている座標が動いたときにここが呼び出される
        evt.x にタッチのx座標、evt.y にタッチのy座標が入っている */
        player.x = evt.x - 16;
        player.y = evt.y - 16;
    };
    game.rootScene.onenterframe = function () {
        if(game.frame%30==0){
            game.rootScene.addChild(new Enemy(32, 32));
            //ラベル更新
        label.text = "score:"+score;
        }
    };
    game.start();
};

function rand(num) {
    return Math.floor(Math.random() * num);
}

/* プレイヤー クラス (パペット) をつくる */
Player = Class.create(Sprite, {
    initialize: function(width, height) {
        Sprite.call(this, width, height);
        this.image = game.assets['chara1.png'];
                this.frame = 0;
    }
});

    
/* 敵 クラス (パペット) をつくる */
Enemy = Class.create(Sprite, {
    initialize: function(width, height) {
        Sprite.call(this, width, height);
        /* chara1.png をつかう */
        this.image = game.assets['chara2.png']; 
        /* しろクマの画像を利用 */
        this.frame = 1;
        /* 右からやってくるので、左右逆転 */
        this.scaleX = 1;
        this.x = 320;
        /* y座標は0から319までの任意の数 */
        this.y = rand(320);
        /* 5秒間かけて(-320, 0)だけ移動 */
        this.tl.moveBy(-320, 0, 150);
    },
    
    onenterframe: function() {
        // enemy と、player と交差しているかどうか判定
        if (this.intersect(player)) {
            // rootScene から、player を削除 (画面から消す)
            game.rootScene.removeChild(player);
            game.end();
        }
        if (this.x==0){
            game.rootScene.removeChild(this);
        }
    }
});

/* プレイヤー クラス (パペット) をつくる */
Apple = Class.create(Sprite, {
    initialize: function() {
        Sprite.call(this, 16, 16);
        // icon0.png をつかう
        // this は作ったクマ自身のこと
        this.image = game.assets['icon0.png'];                
        // リンゴの画像を選ぶ。左上から数えて15番目。(ただし0からはじまる)
        this.frame = 54;

        // プレイヤーがいる場所から発射
        this.x = player.x + 8;
        this.y = player.y + 8;  
        
        this.tl.moveBy(320, 0, 60).then(function(){
            // 画面から削除
            game.rootScene.removeChild(this); 
        });
    },

    onenterframe: function() {
        /* this指定だと適切に動かないので注意する */
        Apple.intersect(Enemy).forEach(function(p) {
            game.rootScene.removeChild(p[1]);
            game.rootScene.removeChild(p[0]);
            score+=100;
        });
        if(this.x>320){
            game.rootScene.removeChild(this);
        }
    }
});
