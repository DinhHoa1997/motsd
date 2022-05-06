$(function () {
    $('#menu').mmenu();
    // $('.nav li').hover(function () {
    //     $('ul:first', this).stop().fadeIn();
    // }, function () {
    //     $('ul', this).hide();


    // tab danh mục đầu tư
    $('.tab-bar .tab-title:first-child').addClass('tab-active');
        $('.tab-content').hide();
        $('.tab-content:first').show();

// Click function
        $('.tab-bar .tab-title').click(function(){
        $('.tab-bar .tab-title').removeClass('tab-active');
        $(this).addClass('tab-active');
        $('.tab-content').hide();
        
        var activeTab = $(this).find('a').attr('href');
        $(activeTab).fadeIn();
        return false;
        });


    $(window).scroll(function (event) {
        if ($(this).scrollTop() > 500) {
            $("#button-btt").fadeIn();
        } else {
            $("#button-btt").fadeOut();
        }
    });




});
$.fn.digits = function () {
    return this.each(function () {
        $(this).text($(this).text().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1."));
    });
};
$.fn.dinhdangso = function () {
    return this.each(function () {
        $(this).html($(this).html().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1."));
    });
};
(function ($) {
    $.fn.extend({
        checkNull: function () {
            var obj = this;
            var ok = true;
            $('.notNull', obj).each(function () {
                if ($(this).val() == '') {
                    $(this).addClass('error');
                    ok = false;
                }
            });
            return ok;
        },
        frmSubmit: function () {
            var obj = this;
            obj.submit(function () {
                var ok = $(this).checkNull();
                if (ok == false) {
                    alert(obj.attr('data-alert'));
                    obj.find(".modal-box, .modal-overlay").fadeOut(500, function () {
                        $(".modal-overlay").remove();
                    });


                } else {
                    obj.ajaxSubmit({
                        beforeSubmit: function (a, f, o) {
                            obj.fadeTo('fast', 0.3);
                            o.dataType = 'html';
                        },
                        success: function (data) {
                            obj.fadeTo('fast', 1);
                            if (data == 1) {
                                obj.find(".msgbox").removeClass("form-error");

                                obj[0].reset();
                                obj.find(".msgbox").html(obj.attr('data-success'));
                                obj.find(".msgbox").addClass("form-success");
                                obj.find(".captcha_message").fadeOut();
								
								window.location.href = obj.attr('data-redirect');

                            } else if (data == -1) {
                                obj.find(".msgbox").addClass("form-error");
                                obj.find(".msgbox").html(obj.attr('data-captcha'));
                            } else {

                                obj.find(".msgbox").addClass("form-error");
                                obj.find(".msgbox").html(data);
                            }
                            $('.imgCaptcha').attr("src", "/lib/imagesercurity.php");
                        }
                    });
                }
                return false;
            });
        }
    });
    $(document).ready(function () {
        $('#regform').frmSubmit();
		$('#regform2').frmSubmit();
		
        $('#contactform').frmSubmit();
		$('#dailyform').frmSubmit();
		
		$('#news_regform').frmSubmit();
		$('#pop_regform').frmSubmit();
		
		
    });
})(jQuery);

