/**
 * Created by 86427 on 2017/12/23.
 */
// 弹幕定时器
var timers = [];
// 控制弹幕显隐变量
var isShow = true;
// 监听发送按钮
$(".send").on("click", function () {
    // 创建弹幕
    var jqueryDom = createScreenbullet($("#screenBulletText").val());
    // 添加定时任务
    addInterval(jqueryDom);
});

$("#screenBulletText").on("keydown", function (event) {
    if (event.keyCode == 13) {
        // 创建弹幕
        var jqueryDom = createScreenbullet($("#screenBulletText").val());
        // 添加定时器
        addInterval(jqueryDom);
    }
});

// 监听关闭弹幕按钮
$(".clear").on("click", function () {
    if (isShow) {
        $(".bullet").css("opacity", 0);
        isShow = false;
        $(".clear-span").attr('src',"img/弹幕关.png");
    } else {
        $(".bullet").css("opacity", 1);
        isShow = true;
        $(".clear-span").attr('src',"img/弹幕开.png");
    }
});
// 新建一个弹幕
function createScreenbullet(text) {
    var jqueryDom = $("<span class='bullet'>" + text + "</span>");
    var fontColor = "rgb(" + Math.floor(Math.random() * 256) + "," + Math.floor(Math.random() * 256) + "," + Math.floor(Math.random()) + ")";
    var fontSize = Math.floor((Math.random() + 1) * 24) + "px";
    var left = $(".b06-screen_container").width() + "px";
    var top = Math.floor(Math.random() * 400) + "px";
    top = parseInt(top) > 340 ? "340px" : top;
    jqueryDom.css({
        "position": 'absolute',
        "color": fontColor,
        "font-size": fontSize,
        "left": left,
        "top": top,
        "white-space":'nowrap'//防止自动换行
    });
    $(".b06-screen_container").append(jqueryDom);
    return jqueryDom;
}
// 为弹幕添加定时任务
function addInterval(jqueryDom) {
    var left = jqueryDom.offset().left - $(".b06-screen_container").offset().left;
    var timer = setInterval(function () {
        left--;
        jqueryDom.css("left", left + "px");
        if (jqueryDom.offset().left + jqueryDom.width() < $(".b06-screen_container").offset().left) {
            jqueryDom.remove();
            clearInterval(timer);
        }
    }, 10);
    timers.push(timer);
}