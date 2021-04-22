import * as PIXI from '@tbminiapp/pixi-miniprogram-engine';
(function (PIXI, lib) {

    var MovieClip = PIXI.animate.MovieClip;
    var Container = PIXI.Container;
    var Sprite = PIXI.Sprite;
    var fromFrame = PIXI.Texture.fromFrame;
    var Text = PIXI.Text;
    var Graphics = PIXI.Graphics;
    var shapes = PIXI.animate.ShapesCache;

    var Graphic1 = MovieClip.extend(function (mode) {
        MovieClip.call(this, { mode: mode, duration: 2, loop: false });
        var instance1 = new Sprite(fromFrame("start_radio2"))
            .setTransform(-7.5, -7.5);
        this.addTimedChild(instance1);
    });

    lib.txtfollow = Container.extend(function () {
        Container.call(this);
        var instance1 = new Text("关注店铺")
            .setStyle({
                fontFamily: "Arial",
                fontSize: 26
            })
            .setTransform(-58.75, -18.2);
        this[instance1.name = "txtfollow"] = instance1;
        this.addChild(instance1);
    });

    lib.followradio = MovieClip.extend(function () {
        MovieClip.call(this, {
            duration: 2
        });
        var instance4 = new lib.txtfollow()
            .setTransform(91.25, 15.6);
        this[instance4.name = "txtFollow"] = instance4;
        var instance3 = new Graphic1(MovieClip.SYNCHED)
            .setTransform(9.5, 12.5)
            .setColorTransform(0, 0, 0, 0, 0, 0);
        var instance2 = new Graphics()
            .drawCommands(shapes.scene1[0]);
        var instance1 = new Sprite(fromFrame("gou"));
        this.addTimedChild(instance4)
            .addTimedChild(instance3)
            .addTimedChild(instance2)
            .addTimedChild(instance1, 0, 1, {
                "0": {
                    x: 3,
                    y: 2
                }
            })
            .addAction(function () {
                this.stop();
            }, 0)
            .addAction(function () {
                this.stop();
            }, 1);
    });

    lib.McChanges = Container.extend(function () {
        Container.call(this);
        var instance2 = new Text("今日您还有        次挑战机会")
            .setStyle({
                fontFamily: "Arial",
                fontSize: 32
            })
            .setAlign("center")
            .setTransform(-1.5999999999999943, -19.2);
        this[instance2.name = "startText"] = instance2;
        var instance1 = new Text("10")
            .setStyle({
                fontFamily: "Arial",
                fontSize: 54,
                fontWeight: "bold"
            })
            .setAlign("center")
            .setTransform(-1.5999999999999943, -32.8);
        this[instance1.name = "txtChanges"] = instance1;
        this.addChild(instance2, instance1);
    });

    lib.McStart = Container.extend(function () {
        Container.call(this);
        var instance1 = new Sprite(fromFrame("r_btnstart"))
            .setTransform(-280, -55);
        this.addChild(instance1);
    });

    lib.McBottomButtons = Container.extend(function () {
        Container.call(this);
        var instance3 = new lib.McStart()
            .setTransform(0, -104.2);
        this[instance3.name = "btnStart"] = instance3;
        var instance2 = new lib.McChanges()
            .setTransform(1.6, -195.2);
        this[instance2.name = "mcChanges"] = instance2;
        var instance1 = new lib.followradio()
            .setTransform(-67.7, -29.2);
        this[instance1.name = "btnFollow"] = instance1;
        this.addChild(instance3, instance2, instance1);
    });

    lib.McPrizeInfo2 = Container.extend(function () {
        Container.call(this);
        var instance1 = new Sprite(fromFrame("r_btnMyPrize"));
        this.addChild(instance1);
    });

    lib.McPrizeInfo1 = Container.extend(function () {
        Container.call(this);
        var instance1 = new lib.McPrizeInfo2();
        this.addChild(instance1);
    });

    lib.McPrizeInfo = Container.extend(function () {
        Container.call(this);
        var instance1 = new lib.McPrizeInfo1()
            .setTransform(-64.5, -33.5);
        this.addChild(instance1);
    });

    lib.McRule = Container.extend(function () {
        Container.call(this);
        var instance1 = new Sprite(fromFrame("r_btnRule"))
            .setTransform(-62, -26);
        this.addChild(instance1);
    });

    lib.McTopButtons = Container.extend(function () {
        Container.call(this);
        var instance2 = new lib.McRule()
            .setTransform(0, 25);
        this[instance2.name = "btnRule"] = instance2;
        var instance1 = new lib.McPrizeInfo()
            .setTransform(2.75, 100);
        this[instance1.name = "btnMyPrize"] = instance1;
        this.addChild(instance2, instance1);
    });

    lib.scene1 = MovieClip.extend(function () {
        MovieClip.call(this, {
            duration: 1,
            framerate: 60
        });
        var instance3 = new Sprite(fromFrame("r_bg"))
            .setTransform(0, -145);
        var instance2 = new lib.McTopButtons()
            .setTransform(671.65, 75.55);
        this[instance2.name = "mcTopButtons"] = instance2;
        var instance1 = new lib.McBottomButtons()
            .setTransform(375.1, 1315.45);
        this[instance1.name = "mcBottomButtons"] = instance1;
        this.addChild(instance3, instance2, instance1);
    });

    lib.scene1.assets = {
        "gou": "scene1images/gou.png",
        "start_radio2": "scene1images/start_radio2.png",
        "r_btnstart": "scene1images/r_btnstart.png",
        "r_btnMyPrize": "scene1images/r_btnMyPrize.png",
        "r_btnRule": "scene1images/r_btnRule.png",
        "r_bg": "scene1images/r_bg.png",
        "scene1": "scene1images/scene1.shapes.txt"
    };
})(PIXI, scene1Lib = scene1Lib || {});
var scene1Lib;
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        stage: scene1Lib.scene1,
        background: 0xffffff,
        width: 750,
        height: 1334,
        framerate: 60,
        totalFrames: 1,
        library: scene1Lib
    };
}