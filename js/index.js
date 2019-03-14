/*
 * @Description: 主js
 * @Author: shenxf
 * @Date: 2019-02-28 20:33:47
 */
$(function () {
    /*初始化fullpage组件*/
    /*1.设置每一个屏幕的背景颜色*/
    /*2.设置屏幕内容的对齐方式  默认是垂直居中的  改成顶部对齐*/
    /*3.设置导航 设置指示器 点容器*/
    /*4.监听进入某一屏的时候 回调*/
    $('.container').fullpage({
        /*配置参数*/
        sectionsColor: ["#86afa4", "#109085", "#4d5e8f", "#945c4c", "#4b85a0", "#a29971"],
        verticalCentered: false,
        navigation: true,
        afterLoad:function (link,index) {
            /*index 序号 1开始  当前屏的序号*/
            $('.section').eq(index-1).addClass('now');

            if (index == 6) {
                $('.arrow').hide();
                $('.footer').show();
            } else {
                $('.arrow').show();
                $('.footer').hide();
            }
        },
        onLeave:function(index, nextIndex, direction) {
            $('.header .list .item').removeClass('cur-index');
            $('.header .list .item').eq(nextIndex - 1).addClass('cur-index');
            if(nextIndex == 1) {
                $('.header-title').html("首页");
            } else if (nextIndex == 2) {
                $('.header-title').html("关于我");
            } else if (nextIndex == 3) {
                $('.header-title').html("技能栈");
            } else if (nextIndex == 4) {
                $('.header-title').html("经历");
            } else if (nextIndex == 5) {
                $('.header-title').html("作品集");
            } else if (nextIndex == 6) {
                $('.header-title').html("联系我");
            }
            if (index == 6) {
                $('.footer').hide();
            }
        },
        afterRender: function(){
           
        },
        /*页面切换的时间 默认是700*/
        scrollingSpeed:1000
    });

    // 画面模板渲染
    var render = function() {
        // title
        $('title').html(resumeData.baseInfo.title);
        // 首页
        $('.photo').css('background-image','url(' + resumeData.home.photo + ')'); // 头像
        $('.quote').html(resumeData.home.quote);
        $('.des-list').html(template('deslist',resumeData.home));
        // 关于我
        $('.info .content').html(template('info',resumeData.info));
        // 技能栈
        $('.skill .contain').html(template('skill',resumeData.skill));
        // 经历
        $('.experience .content').html(template('experience',resumeData.experience));
        // 作品集
        $('.work .content').html(template('work',resumeData.work));
        // 联系我
        $('.contact .content').html(template('contact',resumeData.contact));
        // 页尾
        $('.footer').html(template('footer', resumeData.footer));
    }

    // 各种事件绑定
    var bindingEvent = function() {
        // 经历选择
        $('.cut-list .item').on('click',function(){
            // 导航按钮变色
            var expContent = $('.experience .experience-content');
            var that = this;
            expContent.fadeOut(200,function(){
                expContent.html(template('experienceContent',resumeData.experience.experienceList[$(that).index()]));
            }).fadeIn(200);
            $(this).addClass('selected').siblings().removeClass('selected');
        });

        // 经历版 立体效果
        $('.experience .banner').on('mousemove', function(e){
            var xd = (e.clientX - (document.body.clientWidth/2))/40;
            var yd = (e.clientY - (document.body.clientHeight/2))/40;
            $(".experience .banner").css("transform", 'rotateY('+xd+'deg) rotateX('+yd+'deg)');
        });

        $('.experience .banner').on('mouseleave', function(e){
            $(".experience .banner").css("transform", "rotateY(0deg) rotateX(0deg)");
        });

        // 头部点击事件
        $('.header-title').on('click', function(){
            toggleTitle(this);
        });

        $('.header .list .item').on('click',function(){
            $.fn.fullpage.moveTo( $(this).index() + 1 );
            toggleTitle($('.header-title'));
        });

        var toggleTitle = function(that) {
            $(that).toggleClass('rotate');
            $('.header-nav').toggleClass('show-nav');
        };

        // 作品集
        var switchIndex = 0;
        $('.work-switch .right').on('click',function() {
            switchIndex++;
            $('.work-list').css('transform',' rotateY('+switchIndex * 90+'deg)');
        });
        $('.work-switch .left').on('click',function() {
            switchIndex--;
            $('.work-list').css('transform',' rotateY('+switchIndex * 90+'deg)');
        });

        // 中英文
        $('.language-c span').on('click',function(){
            $span = $(this);
            $languageC = $('.language-c');
            $span.siblings().removeClass('selected').end().addClass('selected');
            if ($span.index() == 1) {
                $languageC.addClass('selectEn');
            } else {
                $languageC.removeClass('selectEn');
            }
        });
    }

    // 初始化方法
    var init = function() {
        // 个人介绍数据取得
        $.ajax({
            url: '../staticData/resumeData.json',
            type: 'get',
            data: {},
            success: function(data){
                window.resumeData = data;
                // 数据初始化
                render();
                // 事件绑定初始化
                bindingEvent();
            }
        });
    };

    // 初期化
    init();

});