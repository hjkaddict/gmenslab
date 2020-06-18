
$(function () {

    $(".list").hover(function () {
        $(this).addClass('hover');
    }, function () {
        $(this).removeClass('hover');
    });

    $(".list").click(function () {
        $(this).addClass('click');
    }, function () {
        $(".list").removeClass("click");
        $(this).removeClass("hover").addClass("click");
    });

    $('.mainNav .navContainer .list').on('click', function () {
        let value = this.id;
        let container = $(this).siblings();
        let otherContainers = $('.listContainer').not(container)

        container.css('max-height', '50vh')
        container.css('border-bottom', '1px solid gray')

        Array.from(otherContainers).forEach(function (item) {
            $(item).css('max-height', '0')
        })
        otherContainers.css('border-bottom', 'none')

        $(container).find('tbody').empty()

        $.getJSON("json/data.json", function (json) {
            json.forEach(function (v) {
                if (value === 'news') {
                    $(container).find('tbody')
                        .append($('<tr>')

                            .addClass(v.key + "-" + v.id)
                            //add date
                            .append($('<th>')
                                .addClass('firstColumn')
                                .text(v.date.year + "." + v.date.month + "." + v.date.day)
                            )
                            //add title
                            .append($('<th>')
                                .text("[" + v.key + "] " + v.title + " ")
                                .append($('<img>')
                                    .attr('src', 'img/expand.png')
                                )
                            )
                        )
                }

                if (value === v.key) {
                    $(container).find('tbody')
                        .append($('<tr>')

                            .addClass(v.key + "-" + v.id)
                            //add date
                            .append($('<th>')
                                .addClass('firstColumn')
                                .text(v.date.year + "." + v.date.month + "." + v.date.day)
                            )
                            //add title
                            .append($('<th>')
                                .text("[" + v.key + "] " + v.title + " ")
                                .append($('<img>')
                                    .attr('src', 'img/expand.png')
                                )
                            )
                        )
                }
            })
        });
    })



})

$(document).on('click', 'tr', function () {
    let thisText = $(this).attr('class')
    var contentText;

    $(this).siblings().removeClass('click')
    $(this).addClass('click')

    $('.textContainer').fadeOut('fast', function() {
        $.getJSON("json/data.json", function (json) {
            contentText = json.filter(v => v.key + "-" + v.id === thisText)
            // console.log(contentText[0].content)
            $('.textContainer').html(contentText[0].content)
        })
        $('.textContainer').fadeIn()
    })

});