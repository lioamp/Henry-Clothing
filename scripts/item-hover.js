$(document).ready(function () {
    $(".hoverable").hover(function () {
        $(this).css("box-shadow", "0px 0px 20px 15px rgba(255, 255, 255, 0.2)");
    }, function () {
        $(this).css("box-shadow", "none");
    });
}); 