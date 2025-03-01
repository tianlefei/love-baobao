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
var lastFrameTime = Date.now();
var deltaTime = 0;
function animate() {
    // 计算帧间时间差
    var currentTime = Date.now();
    deltaTime = (currentTime - lastFrameTime) / 16.67; // 标准化到60fps
    lastFrameTime = currentTime;

    ctx.save();
    ctx.fillStyle = "rgba(0,5,24,0.06)";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.restore();

    var newTime = new Date();
    if (newTime - lastTime > 1000) {
        // 调整烟花类型概率
        var randomType = Math.random();
        
        // 25% 文字烟花，25% 心形烟花，25% 双心烟花，25% 普通烟花
        if (randomType < 0.25) {  // 文字烟花
            // 根据屏幕宽度调整文字烟花位置
            var margin = window.innerWidth <= 768 ? 20 : 50;
            var yPos = window.innerWidth <= 768 ? 150 : 200;
            
            // 调整三个文字的位置
            var x1 = getRandom(canvas.width * 0.15, canvas.width * 0.25);
            var x2 = getRandom(canvas.width * 0.45, canvas.width * 0.55);
            var x3 = getRandom(canvas.width * 0.75, canvas.width * 0.85);
            var y = getRandom(50, Math.min(yPos, canvas.height * 0.3));

            // 创建文字烟花
            var bigboom1 = new Boom(x1, window.innerWidth <= 768 ? 1.5 : 2, "#FFF", {
                x: x1,
                y: y
            }, document.querySelectorAll(".shape")[0]);
            var bigboom2 = new Boom(x2, window.innerWidth <= 768 ? 1.5 : 2, "#FFF", {
                x: x2,
                y: y
            }, document.querySelectorAll(".shape")[1]);
            var bigboom3 = new Boom(x3, window.innerWidth <= 768 ? 1.5 : 2, "#FFF", {
                x: x3,
                y: y
            }, document.querySelectorAll(".shape")[2]);

            bigbooms.push(bigboom1);
            bigbooms.push(bigboom2);
            bigbooms.push(bigboom3);
        } 
        else if (randomType < 0.5) {  // 心形烟花
            var count = window.innerWidth <= 768 ? 1 : 2;  // 手机上只显示1个心形
            for (var i = 0; i < count; i++) {
                var x = getRandom(canvas.width * 0.2, canvas.width * 0.8);
                var y = getRandom(50, window.innerWidth <= 768 ? 150 : 200);
                var bigboom = new Boom(x, window.innerWidth <= 768 ? 1.5 : 2, "#FFF", {
                    x: x,
                    y: y
                });
                bigboom.heartType = true;  // 标记为心形烟花
                bigbooms.push(bigboom);
            }
        }
        else if (randomType < 0.75) {  // 双心烟花
            var x = canvas.width * 0.5;  // 居中显示
            var y = getRandom(50, window.innerWidth <= 768 ? 150 : 200);
            var bigboom = new Boom(x, window.innerWidth <= 768 ? 1.5 : 2, "#FFF", {
                x: x,
                y: y
            });
            bigboom.doubleHeartType = true;  // 标记为双心烟花
            bigbooms.push(bigboom);
        }
        else {  // 普通烟花
            var count = window.innerWidth <= 768 ? 2 : Math.floor(getRandom(2, 4));
            for (var i = 0; i < count; i++) {
                var x = getRandom(canvas.width * 0.2, canvas.width * 0.8);
                var y = getRandom(50, window.innerWidth <= 768 ? 150 : 200);
                var bigboom = new Boom(x, window.innerWidth <= 768 ? 1.5 : 2, "#FFF", {
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
            this._move(deltaTime);
            this._drawLight()
        } else {
            this.booms.foreach(function(index) {
                if (!this.dead) {
                    this.moveTo(index, deltaTime)
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
    _move: function(deltaTime) {
        var dx = this.boomArea.x - this.x,
            dy = this.boomArea.y - this.y;
        var speed = 0.008 * deltaTime;  // 增加基础速度从 0.005 到 0.008
        this.x = this.x + dx * speed;
        this.y = this.y + dy * speed;
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
        ctx.fillStyle = "rgba(255,228,150,0.2)";
        ctx.beginPath();
        var lightSize = window.innerWidth <= 768 ? 2 : 4;  // 手机上缩小光晕
        ctx.arc(this.x, this.y, this.r + lightSize * Math.random() + 1, 0, 2 * Math.PI);
        ctx.fill();
        ctx.restore()
    },
    _boom: function() {
        if (this.doubleHeartType) {
            this._doubleHeartBoom();
            return;
        }
        else if (this.heartType || (!this.shape && Math.random() < 0.2)) {
            this._heartBoom();
            return;
        }
        var fragNum = window.innerWidth <= 768 ? 
            getRandom(50, 150) :
            getRandom(100, 300);
        
        var style = getRandom(0, 10) >= 5 ? 1 : 2;
        var color;
        if (style === 1) {
            color = {
                a: parseInt(getRandom(180, 255)),
                b: parseInt(getRandom(180, 255)),
                c: parseInt(getRandom(180, 255))
            }
        }
        
        // 调整扩散范围
        var fanwei = window.innerWidth <= 768 ? 
            parseInt(getRandom(100, 200)) :  // 手机上缩小范围
            parseInt(getRandom(200, 300));   // 电脑上保持原样
        
        for (var i = 0; i < fragNum; i++) {
            if (style === 2) {
                color = {
                    a: parseInt(getRandom(180, 255)),
                    b: parseInt(getRandom(180, 255)),
                    c: parseInt(getRandom(180, 255))
                }
            }
            var a = getRandom(-Math.PI, Math.PI);
            var x = getRandom(0, fanwei) * Math.cos(a) + this.x;
            var y = getRandom(0, fanwei) * Math.sin(a) + this.y;
            var radius = window.innerWidth <= 768 ? 
                getRandom(0.3, 1.5) :  // 手机上缩小粒子
                getRandom(0.5, 2.5);   // 电脑上保持原样
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
    },
    // 修改心形烟花方法
    _heartBoom: function() {
        var color = {
            a: parseInt(getRandom(220, 255)),  // 偏红色
            b: parseInt(getRandom(50, 150)),
            c: parseInt(getRandom(100, 180))
        };
        
        // 显著增大心形尺寸
        var heartSize = window.innerWidth <= 768 ? 100 : 150;  // 从 80/120 增大到 100/150
        var pointCount = window.innerWidth <= 768 ? 40 : 50;   // 增加点数使轮廓更平滑
        
        // 生成心形轮廓点
        var heartPoints = [];
        for (var angle = 0; angle < Math.PI * 2; angle += (Math.PI * 2 / pointCount)) {
            var x = 16 * Math.pow(Math.sin(angle), 3);
            var y = -(13 * Math.cos(angle) - 5 * Math.cos(2*angle) - 2 * Math.cos(3*angle) - Math.cos(4*angle));
            
            // 缩放并添加较小的随机偏移
            x = x * heartSize / 16 + getRandom(-1, 1);  // 减小随机偏移使形状更规整
            y = y * heartSize / 16 + getRandom(-1, 1);
            
            heartPoints.push({x: x, y: y});
        }
        
        // 创建心形轮廓的粒子，增大粒子尺寸
        heartPoints.forEach(point => {
            var frag = new Frag(
                this.x, this.y,
                window.innerWidth <= 768 ? getRandom(2, 3) : getRandom(2.5, 3.5),  // 增大粒子尺寸
                color,
                this.x + point.x,
                this.y + point.y
            );
            this.booms.push(frag);
        });
        
        // 增加装饰粒子数量和范围
        var decorNum = window.innerWidth <= 768 ? 50 : 70;  // 增加装饰粒子数量
        for (var i = 0; i < decorNum; i++) {
            var angle = getRandom(0, Math.PI * 2);
            var radius = getRandom(heartSize * 0.6, heartSize * 1.2);  // 调整装饰范围
            var x = this.x + radius * Math.cos(angle);
            var y = this.y + radius * Math.sin(angle);
            
            var frag = new Frag(
                this.x, this.y,
                getRandom(1, 2.5),  // 增大装饰粒子尺寸
                {
                    a: color.a - parseInt(getRandom(0, 20)),
                    b: color.b - parseInt(getRandom(0, 10)),
                    c: color.c - parseInt(getRandom(0, 10))
                },
                x, y
            );
            this.booms.push(frag);
        }
    },
    // 修改双心烟花方法
    _doubleHeartBoom: function() {
        var color = {
            a: parseInt(getRandom(220, 255)),
            b: parseInt(getRandom(50, 150)),
            c: parseInt(getRandom(100, 180))
        };
        
        // 显著增大心形尺寸和距离
        var heartSize = window.innerWidth <= 768 ? 140 : 200;  // 增加一倍
        var distance = window.innerWidth <= 768 ? 100 : 160;   // 增加一倍
        
        // 创建左侧心形
        this._createHeart(this.x - distance/2, this.y, heartSize, color);
        
        // 创建右侧心形
        this._createHeart(this.x + distance/2, this.y, heartSize, color);
        
        // 在两心之间添加连接线
        this._createHeartConnection(this.x - distance/2, this.y, this.x + distance/2, this.y, color);
    },
    // 调整创建单个心形的方法
    _createHeart: function(centerX, centerY, size, color) {
        var pointCount = window.innerWidth <= 768 ? 35 : 45;  // 增加点数使轮廓更平滑
        
        for (var angle = 0; angle < Math.PI * 2; angle += (Math.PI * 2 / pointCount)) {
            var x = 16 * Math.pow(Math.sin(angle), 3);
            var y = -(13 * Math.cos(angle) - 5 * Math.cos(2*angle) - 2 * Math.cos(3*angle) - Math.cos(4*angle));
            
            x = x * size / 16 + getRandom(-1, 1);
            y = y * size / 16 + getRandom(-1, 1);
            
            var frag = new Frag(
                centerX, centerY,
                window.innerWidth <= 768 ? getRandom(2, 3) : getRandom(2.5, 3.5),  // 增大粒子尺寸
                color,
                centerX + x,
                centerY + y
            );
            this.booms.push(frag);
        }
    },
    // 调整心形连接线
    _createHeartConnection: function(x1, y1, x2, y2, color) {
        var particleCount = window.innerWidth <= 768 ? 20 : 30;  // 增加连接线粒子数量
        
        for (var i = 0; i < particleCount; i++) {
            var ratio = i / (particleCount - 1);
            var x = x1 + (x2 - x1) * ratio;
            var y = y1 + (y2 - y1) * ratio - Math.sin(ratio * Math.PI) * 40;  // 增大弧度
            
            var frag = new Frag(
                (x1 + x2) / 2, (y1 + y2) / 2,
                window.innerWidth <= 768 ? getRandom(2, 3) : getRandom(2.5, 3.5),  // 增大粒子尺寸
                color,
                x, y
            );
            this.booms.push(frag);
        }
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
        
        // 根据屏幕宽度调整字体大小和粒子密度
        var fontSize, density;
        if (window.innerWidth <= 768) {  // 手机屏幕
            fontSize = 32;  // 更小的字体
            density = 2;    // 保持较高的粒子密度
        } else if (window.innerWidth <= 1024) {  // 平板屏幕
            fontSize = 45;
            density = 2.5;
        } else {  // 电脑屏幕
            fontSize = 70;
            density = 3;
        }
        
        // 优化文字渲染 - 移除 bold 使文字更细
        context.font = `${fontSize}px "Microsoft YaHei", "微软雅黑", sans-serif`;
        context.textAlign = "center";
        context.textBaseline = "middle";
        
        // 生成随机亮色
        var r = getRandom(180, 255);
        var g = getRandom(180, 255);
        var b = getRandom(180, 255);
        
        // 减小描边宽度
        context.strokeStyle = "rgba(0,0,0,0.2)";
        context.lineWidth = window.innerWidth <= 768 ? 2 : 3;
        context.strokeText(text, canvas.width / 2, canvas.height / 2);
        
        // 使用随机颜色填充
        context.fillStyle = `rgb(${r},${g},${b})`;
        context.fillText(text, canvas.width / 2, canvas.height / 2);
        context.restore();
        
        dots = getimgData(canvas, context, density);
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
    // 原有的星星代码
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
        
        // 添加闪烁效果
        if (Math.random() > 0.8) {
            ctx.globalAlpha = getRandom(0.5, 1);
        }
        
        // 添加发光效果
        ctx.shadowColor = `rgba(${this.color.a},${this.color.b},${this.color.c},0.5)`;
        ctx.shadowBlur = 3;
        
        var scale = this.radius <= 1 ? 0.9 : 0.8;
        ctx.arc(this.x, this.y, this.radius * scale, 0, 2 * Math.PI);
        ctx.fillStyle = "rgba(" + this.color.a + "," + this.color.b + "," + this.color.c + ",1)";
        ctx.fill();
        ctx.restore()
    },
    moveTo: function(index, deltaTime) {
        // 调整下落速度
        this.ty = this.ty + (0.15 * deltaTime);
        var dx = this.tx - this.x,
            dy = this.ty - this.y;
        
        // 调整扩散速度
        var speed = 0.08 * deltaTime;
        this.x = Math.abs(dx) < 0.1 ? this.tx : (this.x + dx * speed);
        this.y = Math.abs(dy) < 0.1 ? this.ty : (this.y + dy * speed);
        
        // 调整消失条件
        if (dx === 0 && Math.abs(dy) <= 100) {
            this.dead = true
        }
        this.paint()
    }
};