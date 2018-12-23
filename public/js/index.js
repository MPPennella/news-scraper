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
        author: $(this).find("[name=author]").val().trim()
    }
    const articleId = form.parents(".articleCard").data("id");
    
    $.post(`./articles/comment/${articleId}`, newComment);
})