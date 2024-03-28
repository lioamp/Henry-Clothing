$(document).ready(function() {
    // Add and remove underline class on hover
    $('.navbar-nav .nav-link').hover(
        function() {
            $(this).addClass('underline');
        },
        function() {
            $(this).removeClass('underline');
        }
    );
});    