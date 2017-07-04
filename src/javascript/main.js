//===================================================================
// SMOOTH SCROLL
// @author Chris Coyer
// @link https://css-tricks.com/snippets/jquery/smooth-scrolling/
//===================================================================

$(document).on("scroll", onScroll);
// Select all links with hashes
$('a[href*="#"]').not('[href="#"]').not('[href="#0"]').click(function(event) {
  // On-page links
  if (
    location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '')
    &&
    location.hostname == this.hostname
  ) {
    // Figure out element to scroll to
    var target = $(this.hash);
    target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
    $('#aside--navigation nav ul').find('li a.active').removeClass('active');
    $(this).addClass('active');
    // Does a scroll target exist?
    if (target.length) {
      // Only prevent default if animation is actually gonna happen
      event.preventDefault();
      $('html, body').animate({
        scrollTop: target.offset().top
      }, 1000, function() {
        // Callback after animation
        // Must change focus!
        var $target = $(target);
        $target.focus();
        if ($target.is(":focus")) { // Checking if the target was focused
          return false;
        } else {
          $target.attr('tabindex','-1'); // Adding tabindex for elements not focusable
          $target.focus(); // Set focus again
        };
      });
    }
  }
});
function onScroll(event){
    var scrollPos = $(document).scrollTop();
    $('#aside--navigation a').each(function () {
        var currLink = $(this);
        var refElement = $(currLink.attr("href"));
        if (refElement.position().top <= scrollPos && refElement.position().top + refElement.height() > scrollPos) {
            $('#aside--navigation ul li a').removeClass("active");
            currLink.addClass("active");

            if(refElement.is(":focus")){
              return false;
            } else {
              refElement.focus();
            }
        }
        else{
          refElement.attr('tabindex', '-1');

          currLink.removeClass("active");
        }
    });
}
