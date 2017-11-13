// $(document).ready(function() {

//     // Hide the div
//     $("#no_show").hide();

//     // Show the div in 5s
//     $("#no_show").delay(5500).fadeIn("slow");

// });

// setTimeout(function(){
//     $(".welcome_popup").fadeOut("slow");
// }, 5000);

// setTimeout(function(){
//     $(".dark_admin,.white_overlay").fadeIn("slow");
// }, 10000);

// setTimeout(function(){
//    $('.anonabot_title').show();// or fade, css display however you'd like.
// }, 500);


$(".welcome_popup").fadeOut(500);
$("#no_show").fadeIn(500);

// perform JavaScript after the document is scriptable.
$(function() {
    // setup ul.tabs to work as tabs for each div directly under div.panes
    $("ul.tabs").tabs("div.panes > div");
});