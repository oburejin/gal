(function () {
    $(document).ready(function () {


        var youtubeEmbedLink = '<iframe width="770" height="432" src="{LINK}?autoplay=1" frameborder="0" allowfullscreen ></iframe>'
        var body = $('body');
        var overlay = $('#overlay');
        var thumbs = overlay.find('.thumbs');
        var content = overlay.find('.content');
        var text = overlay.find('.text');
        $('.thumb').on('click', function (event) {
            var self = $(this);
            var contentLinks = self.data('content');
            var thumbLinks = self.data('thumb') || [];

            event.preventDefault();
            body.addClass('noscroll');
            overlay.show();
            content.html(youtubeEmbedLink.replace('{LINK}', contentLinks[0]));
            overlay.find('.text').text(self.data('text'));

            overlay.find('.wrapper').on('click', function (event) {
                event.stopPropagation();
            });

            overlay.on('click', function (event) {
                body.removeClass('noscroll');
                clearOverlay();
                overlay.hide();
            });


            if (contentLinks.length > 1) {
                var div = $('<div></div>');
                thumbLinks.forEach(function (item, index) {
                    thumbs.append($('<div/>', {
                        'class': 'thumb',
                        'data-content': contentLinks[index],
                        'css': {
                            'background-image': 'url("' + item + '")',
                            'background-size': '70px 70px'
                        }
                    }).on('click', function (event) {
                        var el = $(this).data('content');
                        if (el.indexOf('youtube') !== -1) {
                            content.html(youtubeEmbedLink.replace('{LINK}', el));
                        } else {
                            content.html('<img src="' + el + '">');
                        }

                    }));
                });
            }
        });
        function clearOverlay() {
            content.html('');
            thumbs.html('');
            text.html('');

        }
    });


})();
