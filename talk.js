$(function() {
    $('#yes').click(function(event) {
        // 先隐藏按钮
        $('.btn-groups').hide();
        modal('我就知道你会答应！以后我们的故事才刚刚开始~ (^_^)', function() {
            $('.page_one').addClass('hide');
            $('.page_two').removeClass('hide');
            fireworks();
        });
    });
    $('#no').click(function(event) {
        // 先隐藏按钮
        $('.btn-groups').hide();
        modal('啊？系统错误！检测到您点击了一个不存在的按钮...', A);
    });
});

function A() {
    modal('重新启动系统...检测到您面前有一位诚心告白的帅哥', B);
}

function B() {
    modal('据说拒绝我的人都会长痘痘，而且会单身一辈子！', C);
}

function C() {
    modal('不要担心，我已经做好了准备，爱你三千遍', D);
}

function D() {
    modal('听说你拒绝我的次数越多，你越喜欢我，要不要再拒绝我几次？', E);
}

function E() {
    modal('好吧，我承认，这个按钮是个摆设，程序员已经提前写好了结局', F);
}

function F() {
    modal('你知道吗？我的心脏已经为你预留了一个位置', G);
}

function G() {
    modal('我保证，和我在一起，你的朋友圈会变得特别精彩', H);
}

function H() {
    modal('而且我会做饭，洗碗，还会哄你开心，这可是三项特长！', I);
}

function I() {
    modal('好啦，不逗你了，其实我就是想说：我真的很喜欢你！', J)
}

function J() {
    modal('今天的月色一定很美，就像你一样...让我们一起去看看为你准备的烟花吧！', function() {
        fireworks();
    });
}

function fireworks() {
    $('.page_one').addClass('hide');
    initAnimate();
}

function modal(content, callback) {
    var tpl = '<div class="container">'+
        '<div class="mask"></div>'+
        '<div class="modal">'+
        '<p>'+ content +'</p>'+
        '<button type="button" id="confirm" class="confirm">确定</button>'+
        '</div>'+
        '</div>';
    $('body').append(tpl);
    
    // 点击确定按钮时关闭弹窗
    $(document).on('click', '.confirm', function() {
        $('.container').remove();
        callback();
    });
}
