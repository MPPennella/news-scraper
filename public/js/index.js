console.log("Javascript loaded");

$(document).on("click",".commentBtn", function (event) {
    const button = $(this);
    console.log(button.parent().data("id"));
    button.siblings(".commentBox").toggle();
})

$(document).on("click",".postCmntBtn", function (event) {
    const button = $(this);
    console.log(button.parents(".articleCard").data("id"));
})