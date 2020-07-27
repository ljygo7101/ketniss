// Skill Chart

(function ($) {
    function generateBarGraph(wrapper) {
        // Set Up Values Array
        var values = [];

        // Get Values and save to Array
        $(wrapper + ' .bar').each(function (index, el) {
            values.push($(this).data('value'));
        });

        // Get Max Value From Array
        var max_value = Math.max.apply(Math, values);

        // Set width of bar to percent of max value
        $(wrapper + ' .bar').each(function (index, el) {
            var bar = $(this),
                value = bar.data('value'),
                percent = Math.ceil((value / max_value) * 100);

            // Set Width & Add Class
            bar.width(percent + '%');
            bar.addClass('in');
        });
    }

    // Generate the bar graph on window load...
    $(window).on('load', function (event) {
        generateBarGraph('#dashboard-stats');
    });
})(jQuery);


// Accordion 
function myAccFunc() {
    var x = document.getElementById("demoAcc");
    if (x.className.indexOf("show") == -1) {
        x.className += " show";
    } else {
        x.className = x.className.replace(" show", "");
    }
}

// Open and close sidebar
function w3_open() {
    document.getElementById("mySidebar").style.display = "block";
    document.getElementById("myOverlay").style.display = "block";
}

function w3_close() {
    document.getElementById("mySidebar").style.display = "none";
    document.getElementById("myOverlay").style.display = "none";
}

// Visual slider
window.onload = function () {

    $('.slider').jdSlider({
        wrap: '.slide-inner',
        isAuto: true,
        isLoop: true
    });
};


// Portfolio gallery

$('.gallery-inner').isotope({
    itemSelector: '.item',
    masonry: {
        columnWidth: '.grid-sizer',
        gutter: 1
    }
}).isotope('layout');


$('.gallery-inner .item').on('click', function (event) {
    event.stopPropagation();

    var nbrArticles = $('.item').length;
    var clickedArticle = $(this);
    var thisIndex = $(this).index();
    var clickedArticleNext = $(this).next('.item');
    var clickedArticlePrev = $(this).prev('.item');

    console.log('The article : ');
    console.log(clickedArticle);

    imgToShow = clickedArticle.find('img').attr('src');
    articleLink = clickedArticle.data('article');
    articleData = $('#article-contents').find('.article-html[data-article="' + articleLink + '"]').html();
    articleTitle = clickedArticle.find('.desc h4').html();
    i = clickedArticle.index() + 1;
    var n = 1;

    changeArticle();

    $('.next-btn').click(function (event) {
        event.stopPropagation();

        var clickedArticle = $('.item:eq(' + (i) + ')');

        console.log('New article ' + i + ' : ');
        console.log(clickedArticle);
        imgToShow = clickedArticle.find('img').attr('src');
        articleLink = clickedArticle.data('article');
        articleData = $('#article-contents').find('.article-html[data-article="' + articleLink + '"]').html();
        articleTitle = clickedArticle.find('.desc h4').html();

        if (i >= $('.item').length - 1) {

            i = 0;
        } else {

            i++;
        }

        changeArticle();

    });

    $('.prev-btn').click(function (event) {
        event.stopPropagation();

        var clickedArticle = $('.item:eq(' + i + ')');
        console.log('New article ' + i + ' : ');
        console.log(clickedArticle);
        imgToShow = clickedArticle.find('img').attr('src');
        articleLink = clickedArticle.data('article');
        articleData = $('#article-contents').find('.article-html[data-article="' + articleLink + '"]').html();
        articleTitle = clickedArticle.find('.desc h4').html();

        if (i < 1) {
            i = ($('.item').length);
        } else {
            i--;
        }

        changeArticle();
    });

    function changeArticle() {

        $('.project-container').hide();

        $('.project-view .project-article-header').css({
            'background': 'url(' + imgToShow + ') no-repeat 65% 3% fixed'
        });

        $('.project-view .project-article-content').html('<div class="project-article-title"><h1>' + articleTitle + '</h1></div>' + '<div class="appended-data">' + articleData + '</div>');
        //$('.project-article-header').html('<div class="project-article-title"><h1>' + articleTitle + '</h1></div>');//

        $('.project-container').fadeIn(500);
    }

    if (!$('body').hasClass('article-opened')) {

        $('body').addClass('article-opened');

    } else {

        $('body').removeClass('article-opened');

    }

});

$('.project-view').on('click', function (event) {
    event.stopPropagation();
});


$('html, body, .overlay, .close').on('click', function () {
    $('body').removeClass('article-opened');
    var i = 0;
});