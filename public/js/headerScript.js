(document).ready(function () {
    
    const sendToken = (request) =>{
        request.setRequestHeader("Authorization" , localStorage.getItem('x-auth')||sessionStorage.getItem("x-auth"))
    }

    $("#logout").on("click",function(){
        $.ajax({
            beforeSend:sendToken,
            method:"post",
            url:"/profile/logout",
            success:function(data){
                Success=true
                localStorage.clear()
                sessionStorage.clear()
                window.location.reload()
                alert(data.msg)

            },
            error:function(err){
                Success=false
                alert(error.msg)
            }
        })
    })
    
    $('#data').html(localStorage.getItem('userName')||
                    sessionStorage.getItem('userName')||
                    'you are not login')
    
    var imageFilename = window.localStorage.getItem('imageFilename') 
                        ||window.sessionStorage.getItem('imageFilename')



    if(imageFilename=="undefined"||imageFilename==undefined){
        $('#userLogo').attr("src","/images/user_logo.png")
    }else{
        $('#userLogo').attr("src",`http://localhost:3000/image/user/${imageFilename}`)
    } 
    
    window.addEventListener('resize',function(){
        if(window.innerWidth<768){
            $(".burger").css("display","block")
            $(".nav-link").removeClass('navLinkOpen').addClass("navLinkClusure")
        }
        if(window.innerWidth>768){
            $(".burger").css("display","none")
            $(".nav-link").removeClass("navLinkOpen").removeClass("navLinkClusure")
            $("header").removeClass("headerClusure")
        }
    })

    if(window.innerWidth<768){
        $(".nav-link").addClass("navLinkClusure")
    }
    if(window.innerWidth>768){
        $(".burger").css("display","none")
    }

    let open = false
    $(".burger").click(function(){
        if(!open){
            open = true
            $("header").removeClass("headerClusure").addClass("headerOpen")
            $(".nav-link").removeClass("navLinkClusure").addClass("navLinkOpen")
            return
        }else{
            open = false
            $("header").removeClass("headerOpen").addClass("headerClusure")
            $(".nav-link").removeClass("navLinkOpen").addClass("navLinkClusure")
        }
    })

});