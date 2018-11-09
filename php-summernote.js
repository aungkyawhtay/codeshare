$(document).ready(function() {
    $('.note').summernote({
        height:400,
        toolbar: [
            ['style', ['style']],
            ['font', ['bold', 'italic', 'underline', 'clear']],
            ['fontname', ['fontname']],
            ['fontsize', ['fontsize']],
            ['color', ['color']],
            ['para', ['ul', 'ol', 'paragraph']],
            ['height', ['height']],
            ['table', ['table']],
            ['insert', ['link', 'picture', 'hr']],
            ['view', ['fullscreen']],
        ],
        callbacks: {
            onImageUpload: function(file) {
                for (var i = file.length - 1; i >= 0; i--) {
                    $.upload(file[i], this);
                } 
            }
        }
    });
    $.upload = function (file, ele) {
        var out = new FormData();
        out.append('descfile', file);
        out.append('token', 'hash');
        $.ajax({
            method: 'POST',
            url: 'uploadUrl',
            data: out,
            cache: false,
            contentType: false,
            processData: false,
            success: function (respons) {
                var res = JSON.parse(respons);
                var img_node = document.createElement('IMG');
                img_node.src = 'imageurl';
                img_node.style = 'width:100%;';
                $(ele).summernote('insertNode', img_node);
            }, 
            error:function(e){
                console.log(e);
            }
        });
    };
});
