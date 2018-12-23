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

$(document).on("submit","form", function (event) {
    event.preventDefault();
    const form = $(this)

    const newComment = {
        commentText: $(this).find("[name=comment]").val().trim(),
        author: "Test User".trim(),
        datePosted: new Date()
    }

    const articleId = placeholder = "5c1dfd8054e4c31bfc8f92e6"
    $.post(`./articles/comment/${articleId}`, newComment);
})