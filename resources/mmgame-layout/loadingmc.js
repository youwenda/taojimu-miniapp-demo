import * as PIXI from '@tbminiapp/pixi-miniprogram-engine';
(function (PIXI, lib) {

    var MovieClip = PIXI.animate.MovieClip;
    var Container = PIXI.Container;
    var Text = PIXI.Text;
    var Graphics = PIXI.Graphics;
    var shapes = PIXI.animate.ShapesCache;

    lib.mc_txt = Container.extend(function () {
        Container.call(this);
        var instance1 = new Text("0%")
            .setStyle({
                fontFamily: "PingFang SC",
                fontSize: 40
            })
            .setAlign("center");
        this[instance1.name = "txtProgress"] = instance1;
        this.addChild(instance1);
    });

    var Graphic1 = MovieClip.extend(function (mode) {
        MovieClip.call(this, { mode: mode, duration: 9, loop: false });
        var instance1 = new Graphics()
            .drawCommands(shapes.loadingmc[0]);
        this.addTimedChild(instance1);
    });

    var Graphic2 = MovieClip.extend(function (mode) {
        MovieClip.call(this, { mode: mode, duration: 16, loop: false });
        var instance1 = new Graphics()
            .drawCommands(shapes.loadingmc[0]);
        this.addTimedChild(instance1);
    });

    var Graphic3 = MovieClip.extend(function (mode) {
        MovieClip.call(this, { mode: mode, duration: 23, loop: false });
        var instance1 = new Graphics()
            .drawCommands(shapes.loadingmc[0]);
        this.addTimedChild(instance1);
    });

    lib.ing = MovieClip.extend(function () {
        MovieClip.call(this, {
            duration: 30
        });
        var instance1 = new Graphics()
            .drawCommands(shapes.loadingmc[1]);
        var instance2 = new Graphic3(MovieClip.SYNCHED)
            .setTransform(91.15, 17.05);
        var instance3 = new Graphic2(MovieClip.SYNCHED)
            .setTransform(98.5, 17.05);
        var instance4 = new Graphic1(MovieClip.SYNCHED)
            .setTransform(105.85, 17.05);
        this.addTimedChild(instance1)
            .addTimedChild(instance2, 7, 23)
            .addTimedChild(instance3, 14, 16)
            .addTimedChild(instance4, 21, 9);
    });

    var Graphic4 = MovieClip.extend(function (mode) {
        MovieClip.call(this, { mode: mode, duration: 105, loop: false });
        var instance1 = new Graphics()
            .drawCommands(shapes.loadingmc[3])
            .setTransform(38.95, 77.95);
        this.addTimedChild(instance1);
    });

    lib.loadbar = Container.extend(function () {
        Container.call(this);
        var instance1 = new Graphics()
            .drawCommands(shapes.loadingmc[2])
            .setTransform(38.95, 77.95);
        this.addChild(instance1);
    });

    lib.loading = MovieClip.extend(function () {
        MovieClip.call(this, {
            duration: 105
        });
        var instance1 = new Graphics()
            .drawCommands(shapes.loadingmc[2])
            .setRenderable(false)
            .setTransform(38.95, 77.95);
        var instance3 = new lib.loadbar();
        this[instance3.name = "loadingBarBg"] = instance3;
        var instance2 = new Graphic4(MovieClip.SYNCHED)
            .setMask(instance1);
        this.addTimedChild(instance1)
            .addTimedChild(instance3)
            .addTimedChild(instance2, 0, 105, {
                "0": {
                    x: -434
                },
                "1": {
                    x: -429.65
                },
                "2": {
                    x: -425.3
                },
                "3": {
                    x: -421
                },
                "4": {
                    x: -416.65
                },
                "5": {
                    x: -412.3
                },
                "6": {
                    x: -407.95
                },
                "7": {
                    x: -403.6
                },
                "8": {
                    x: -399.3
                },
                "9": {
                    x: -394.95
                },
                "10": {
                    x: -390.6
                },
                "11": {
                    x: -386.25
                },
                "12": {
                    x: -381.9
                },
                "13": {
                    x: -377.6
                },
                "14": {
                    x: -373.25
                },
                "15": {
                    x: -368.9
                },
                "16": {
                    x: -364.55
                },
                "17": {
                    x: -360.2
                },
                "18": {
                    x: -355.9
                },
                "19": {
                    x: -351.55
                },
                "20": {
                    x: -347.2
                },
                "21": {
                    x: -342.85
                },
                "22": {
                    x: -338.5
                },
                "23": {
                    x: -334.2
                },
                "24": {
                    x: -329.85
                },
                "25": {
                    x: -325.5
                },
                "26": {
                    x: -321.15
                },
                "27": {
                    x: -316.8
                },
                "28": {
                    x: -312.5
                },
                "29": {
                    x: -308.15
                },
                "30": {
                    x: -303.8
                },
                "31": {
                    x: -299.45
                },
                "32": {
                    x: -295.1
                },
                "33": {
                    x: -290.8
                },
                "34": {
                    x: -286.45
                },
                "35": {
                    x: -282.1
                },
                "36": {
                    x: -277.75
                },
                "37": {
                    x: -273.4
                },
                "38": {
                    x: -269.1
                },
                "39": {
                    x: -264.75
                },
                "40": {
                    x: -260.4
                },
                "41": {
                    x: -256.05
                },
                "42": {
                    x: -251.7
                },
                "43": {
                    x: -247.4
                },
                "44": {
                    x: -243.05
                },
                "45": {
                    x: -238.7
                },
                "46": {
                    x: -234.35
                },
                "47": {
                    x: -230
                },
                "48": {
                    x: -225.7
                },
                "49": {
                    x: -221.35
                },
                "50": {
                    x: -217
                },
                "51": {
                    x: -212.65
                },
                "52": {
                    x: -208.3
                },
                "53": {
                    x: -204
                },
                "54": {
                    x: -199.65
                },
                "55": {
                    x: -195.3
                },
                "56": {
                    x: -190.95
                },
                "57": {
                    x: -186.6
                },
                "58": {
                    x: -182.3
                },
                "59": {
                    x: -177.95
                },
                "60": {
                    x: -173.6
                },
                "61": {
                    x: -169.25
                },
                "62": {
                    x: -164.9
                },
                "63": {
                    x: -160.6
                },
                "64": {
                    x: -156.25
                },
                "65": {
                    x: -151.9
                },
                "66": {
                    x: -147.55
                },
                "67": {
                    x: -143.2
                },
                "68": {
                    x: -138.9
                },
                "69": {
                    x: -134.55
                },
                "70": {
                    x: -130.2
                },
                "71": {
                    x: -125.85
                },
                "72": {
                    x: -121.5
                },
                "73": {
                    x: -117.2
                },
                "74": {
                    x: -112.85
                },
                "75": {
                    x: -108.5
                },
                "76": {
                    x: -104.15
                },
                "77": {
                    x: -99.8
                },
                "78": {
                    x: -95.5
                },
                "79": {
                    x: -91.15
                },
                "80": {
                    x: -86.8
                },
                "81": {
                    x: -82.45
                },
                "82": {
                    x: -78.1
                },
                "83": {
                    x: -73.8
                },
                "84": {
                    x: -69.45
                },
                "85": {
                    x: -65.1
                },
                "86": {
                    x: -60.75
                },
                "87": {
                    x: -56.4
                },
                "88": {
                    x: -52.1
                },
                "89": {
                    x: -47.75
                },
                "90": {
                    x: -43.4
                },
                "91": {
                    x: -39.05
                },
                "92": {
                    x: -34.7
                },
                "93": {
                    x: -30.4
                },
                "94": {
                    x: -26.05
                },
                "95": {
                    x: -21.7
                },
                "96": {
                    x: -17.35
                },
                "97": {
                    x: -13
                },
                "98": {
                    x: -8.7
                },
                "99": {
                    x: -4.35
                },
                "100": {
                    x: 0
                }
            });
    });

    lib.loadingIcon = Container.extend(function () {
        Container.call(this);
        var instance3 = new lib.loading()
            .setTransform(0, 32);
        this[instance3.name = "barProgress"] = instance3;
        var instance2 = new lib.ing()
            .setTransform(0, 54);
        var instance1 = new lib.mc_txt()
            .setTransform(0, -38);
        this.addChild(instance3, instance2, instance1);
    });

    lib.loadingmc = MovieClip.extend(function () {
        MovieClip.call(this, {
            duration: 1,
            framerate: 30
        });
        var instance1 = new lib.loadingIcon()
            .setTransform(373.55, 654.1);
        this[instance1.name = "loadingMc"] = instance1;
        this.addChild(instance1);
    });

    lib.loadingmc.assets = {
        "loadingmc": "loadingimages/loadingmc.shapes.txt"
    };
})(PIXI, loadingmcLib = loadingmcLib || {});
var loadingmcLib;
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        stage: loadingmcLib.loadingmc,
        background: 0xffffff,
        width: 750,
        height: 1334,
        framerate: 30,
        totalFrames: 1,
        library: loadingmcLib
    };
}