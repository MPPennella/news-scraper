console.log("Javascript loaded");

$(document).on("click",".commentBtn", function (event) {
    const button = $(this);
    console.log(button.parent().data("id"));
    button.siblings(".commentBox").toggle();
})

$(document).on("click",".commentRemoveBtn", function (event) {
    const button = $(this);
    
    // Get Id of Comment to remove
    const commentId = button.parents(".commentCard").data("id");

    // Send request to delete route
    $.ajax({
        url: `/comments/${commentId}`,
        type: 'DELETE',
        success: function(result) {
            // Do something with the result
            console.log("Successfully deleted")
        }
    });
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