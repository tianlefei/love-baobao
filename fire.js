var canvas = document.getElementById("cas");
var ocas = document.createElement("canvas");
var octx = ocas.getContext("2d");
var ctx = canvas.getContext("2d");
ocas.width = canvas.width = window.innerWidth;
ocas.height = canvas.height = window.innerHeight;
var bigbooms = [];

// window.onload = function() {
//     autoPlayMusic()
// };

//document.getElementById("iframMusic").onload = function(){
//    var music = document.getElementById("music");
//    music.src = 'music.mp3';
//    music.oncanplay = function(){
//        music.play();
//    };
//};

// 音乐播放
//function autoPlayMusic() {
//  // 自动播放音乐效果，解决浏览器或者APP自动播放问题
//  function musicInBrowserHandler() {
//    musicPlay(true);
//    document.body.removeEventListener('touchstart', musicInBrowserHandler);
//  }
//  document.body.addEventListener('touchstart', musicInBrowserHandler);
//
//  // 自动播放音乐效果，解决微信自动播放问题
//  function musicInWeixinHandler() {
//    musicPlay(true);
//    document.addEventListener("WeixinJSBridgeReady",
//    function() {
//      musicPlay(true);
//    },
//    false);
//    document.removeEventListener('DOMContentLoaded', musicInWeixinHandler);
//  }
//  document.addEventListener('DOMContentLoaded', musicInWeixinHandler);
//}
//function musicPlay(isPlay) {
//  var media = document.querySelector('music');
//  if (isPlay && media.paused) {
//    media.play();
//  }
//  if (!isPlay && !media.paused) {
//    media.pause();
//  }
//}

function initMusic() {
	//动态创建一个audio节点
    var audio = document.createElement('audio');
    audio.setAttribute('id', 'audio');
    audio.setAttribute('autoplay', 'autoplay');
    audio.setAttribute('loop', 'loop');
    audio.innerHTML = '<source src="http://music.163.com/song/media/outer/url?id=553544145.mp3" type="audio/mpeg">';

    //将audio节点追加到dom
    document.body.appendChild(audio);
    audio.load();

	//iOS Safari可能是出于防止骚扰用户的考虑，首次非用户触发的play不会生效
    audio.play();
    audio.pause();

    document.addEventListener("WeixinJSBridgeReady", function () {
    	//微信H5环境，监听WeixinJSBridgeReady事件，再次进行play
    	//亲测iOS 微信H5页面能够自动播放
        document.getElementById('audio').play();
    }, false);
}

window.onload = function() {
	//初始化一段音乐，并直接进行播放
    initMusic();
};


function initAnimate() {
    drawBg();
    lastTime = new Date();
    animate()
}
var lastTime;
function animate() {
    ctx.save();
    ctx.fillStyle = "rgba(0,5,24,0.08)";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.restore();
    var newTime = new Date();
    if (newTime - lastTime > 800 + (window.innerHeight - 767) / 2) {
        // 随机决定是显示文字还是普通烟花
        var isText = Math.random() > 0.4; // 60%概率显示文字，40%概率显示普通烟花

        if (isText) {
            // 创建三个文字烟花
            var x1 = getRandom(canvas.width / 6, canvas.width / 3);
            var x2 = getRandom(canvas.width / 2 - 50, canvas.width / 2 + 50);
            var x3 = getRandom(canvas.width * 2/3, canvas.width * 5/6);
            var y = getRandom(50, 200);

            var bigboom1 = new Boom(x1, 2, "#FFF", {
                x: x1,
                y: y
            }, document.querySelectorAll(".shape")[0]);

            var bigboom2 = new Boom(x2, 2, "#FFF", {
                x: x2,
                y: y
            }, document.querySelectorAll(".shape")[1]);

            var bigboom3 = new Boom(x3, 2, "#FFF", {
                x: x3,
                y: y
            }, document.querySelectorAll(".shape")[2]);

            bigbooms.push(bigboom1);
            bigbooms.push(bigboom2);
            bigbooms.push(bigboom3);
        } else {
            // 创建2-3个普通烟花
            var count = Math.floor(getRandom(2, 4));
            for (var i = 0; i < count; i++) {
                var x = getRandom(canvas.width * 0.2, canvas.width * 0.8);
                var y = getRandom(50, 200);
                var bigboom = new Boom(x, 2, "#FFF", {
                    x: x,
                    y: y
                });
                bigbooms.push(bigboom);
            }
        }
        
        lastTime = newTime;
    }
    stars.foreach(function() {
        this.paint()
    });
    drawMoon();
    bigbooms.foreach(function(index) {
        var that = this;
        if (!this.dead) {
            this._move();
            this._drawLight()
        } else {
            this.booms.foreach(function(index) {
                if (!this.dead) {
                    this.moveTo(index)
                } else {
                    if (index === that.booms.length - 1) {
                        bigbooms[bigbooms.indexOf(that)] = null
                    }
                }
            })
        }
    });
    raf(animate)
}
function drawMoon() {
    var moon = document.getElementById("moon");
    var centerX = canvas.width - 200,
        centerY = 100,
        width = 80;
    if (moon.complete) {
        ctx.drawImage(moon, centerX, centerY, width, width)
    } else {
        moon.onload = function() {
            ctx.drawImage(moon, centerX, centerY, width, width)
        }
    }
    var index = 0;
    for (var i = 0; i < 10; i++) {
        ctx.save();
        ctx.beginPath();
        ctx.arc(centerX + width / 2, centerY + width / 2, width / 2 + index, 0, 2 * Math.PI);
        ctx.fillStyle = "rgba(240,219,120,0.005)";
        index += 2;
        ctx.fill();
        ctx.restore()
    }
}
Array.prototype.foreach = function(callback) {
    for (var i = 0; i < this.length; i++) {
        if (this[i] !== null) {
            callback.apply(this[i], [i])
        }
    }
};
var raf = window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.oRequestAnimationFrame || window.msRequestAnimationFrame ||
    function(callback) {
        window.setTimeout(callback, 1000 / 60)
    };
canvas.onclick = function() {
    var x = event.clientX;
    var y = event.clientY;
    var bigboom = new Boom(getRandom(canvas.width / 3, canvas.width * 2 / 3), 2, "#FFF", {
        x: x,
        y: y
    });
    bigbooms.push(bigboom)
};
var Boom = function(x, r, c, boomArea, shape) {
    this.booms = [];
    this.x = x;
    this.y = (canvas.height + r);
    this.r = r;
    this.c = c;
    this.shape = shape || false;
    this.boomArea = boomArea;
    this.theta = 0;
    this.dead = false;
    this.ba = parseInt(getRandom(80, 200))
};
Boom.prototype = {
    _paint: function() {
        ctx.save();
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.r, 0, 2 * Math.PI);
        ctx.fillStyle = this.c;
        ctx.fill();
        ctx.restore()
    },
    _move: function() {
        var dx = this.boomArea.x - this.x,
            dy = this.boomArea.y - this.y;
        this.x = this.x + dx * 0.007;
        this.y = this.y + dy * 0.007;
        if (Math.abs(dx) <= this.ba && Math.abs(dy) <= this.ba) {
            if (this.shape) {
                this._shapBoom()
            } else {
                this._boom()
            }
            this.dead = true
        } else {
            this._paint()
        }
    },
    _drawLight: function() {
        ctx.save();
        ctx.fillStyle = "rgba(255,228,150,0.3)";
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.r + 3 * Math.random() + 1, 0, 2 * Math.PI);
        ctx.fill();
        ctx.restore()
    },
    _boom: function() {
        var fragNum = getRandom(30, 200);
        var style = getRandom(0, 10) >= 5 ? 1 : 2;
        var color;
        if (style === 1) {
            color = {
                a: parseInt(getRandom(128, 255)),
                b: parseInt(getRandom(128, 255)),
                c: parseInt(getRandom(128, 255))
            }
        }
        var fanwei = parseInt(getRandom(300, 400));
        for (var i = 0; i < fragNum; i++) {
            if (style === 2) {
                color = {
                    a: parseInt(getRandom(128, 255)),
                    b: parseInt(getRandom(128, 255)),
                    c: parseInt(getRandom(128, 255))
                }
            }
            var a = getRandom( - Math.PI, Math.PI);
            var x = getRandom(0, fanwei) * Math.cos(a) + this.x;
            var y = getRandom(0, fanwei) * Math.sin(a) + this.y;
            var radius = getRandom(0, 2);
            var frag = new Frag(this.x, this.y, radius, color, x, y);
            this.booms.push(frag)
        }
    },
    _shapBoom: function() {
        var that = this;
        putValue(ocas, octx, this.shape, 5,
            function(dots) {
                var dx = canvas.width / 2 - that.x;
                var dy = canvas.height / 2 - that.y;
                for (var i = 0; i < dots.length; i++) {
                    color = {
                        a: dots[i].a,
                        b: dots[i].b,
                        c: dots[i].c
                    };
                    var x = dots[i].x;
                    var y = dots[i].y;
                    var radius = 1;
                    var frag = new Frag(that.x, that.y, radius, color, x - dx, y - dy);
                    that.booms.push(frag)
                }
            })
    }
};
function putValue(canvas, context, ele, dr, callback) {
    context.clearRect(0, 0, canvas.width, canvas.height);
    var img = new Image();
    if (ele.innerHTML.indexOf("img") >= 0) {
        img.src = ele.getElementsByTagName("img")[0].src;
        imgload(img,
            function() {
                context.drawImage(img, canvas.width / 2 - img.width / 2, canvas.height / 2 - img.width / 2);
                dots = getimgData(canvas, context, dr);
                callback(dots)
            })
    } else {
        var text = ele.innerHTML;
        context.save();
        var fontSize = 80;
        context.font = fontSize + "px 微软雅黑 bold";
        context.textAlign = "center";
        context.textBaseline = "middle";
        
        // 生成随机亮色
        var r = getRandom(180, 255);
        var g = getRandom(180, 255);
        var b = getRandom(180, 255);
        
        // 添加描边使文字更清晰
        context.strokeStyle = "rgba(0,0,0,0.2)";
        context.lineWidth = 2;
        context.strokeText(text, canvas.width / 2, canvas.height / 2);
        
        // 使用随机颜色填充
        context.fillStyle = `rgb(${r},${g},${b})`;
        context.fillText(text, canvas.width / 2, canvas.height / 2);
        context.restore();
        dots = getimgData(canvas, context, 3);
        callback(dots)
    }
}
function imgload(img, callback) {
    if (img.complete) {
        callback.call(img)
    } else {
        img.onload = function() {
            callback.call(this)
        }
    }
}
function getimgData(canvas, context, dr) {
    var imgData = context.getImageData(0, 0, canvas.width, canvas.height);
    context.clearRect(0, 0, canvas.width, canvas.height);
    var dots = [];
    for (var x = 0; x < imgData.width; x += dr) {
        for (var y = 0; y < imgData.height; y += dr) {
            var i = (y * imgData.width + x) * 4;
            if (imgData.data[i + 3] > 128) {
                var dot = {
                    x: x,
                    y: y,
                    // 使用原始颜色值
                    a: imgData.data[i],
                    b: imgData.data[i + 1],
                    c: imgData.data[i + 2]
                };
                dots.push(dot)
            }
        }
    }
    return dots
}
function getRandom(a, b) {
    return Math.random() * (b - a) + a
}
var maxRadius = 1,
    stars = [];
function drawBg() {
    for (var i = 0; i < 100; i++) {
        var r = Math.random() * maxRadius;
        var x = Math.random() * canvas.width;
        var y = Math.random() * 2 * canvas.height - canvas.height;
        var star = new Star(x, y, r);
        stars.push(star);
        star.paint()
    }
}
var Star = function(x, y, r) {
    this.x = x;
    this.y = y;
    this.r = r
};
Star.prototype = {
    paint: function() {
        ctx.save();
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.r, 0, 2 * Math.PI);
        ctx.fillStyle = "rgba(255,255,255," + this.r + ")";
        ctx.fill();
        ctx.restore()
    }
};
var focallength = 250;
var Frag = function(centerX, centerY, radius, color, tx, ty) {
    this.tx = tx;
    this.ty = ty;
    this.x = centerX;
    this.y = centerY;
    this.dead = false;
    this.centerX = centerX;
    this.centerY = centerY;
    this.radius = radius;
    this.color = color
};
Frag.prototype = {
    paint: function() {
        ctx.save();
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius * 0.8, 0, 2 * Math.PI);
        ctx.fillStyle = "rgba(" + this.color.a + "," + this.color.b + "," + this.color.c + ",1)";
        ctx.fill();
        ctx.restore()
    },
    moveTo: function(index) {
        this.ty = this.ty + 0.2;
        var dx = this.tx - this.x,
            dy = this.ty - this.y;
        this.x = Math.abs(dx) < 0.1 ? this.tx: (this.x + dx * 0.07);
        this.y = Math.abs(dy) < 0.1 ? this.ty: (this.y + dy * 0.07);
        if (dx === 0 && Math.abs(dy) <= 80) {
            this.dead = true
        }
        this.paint()
    }
};