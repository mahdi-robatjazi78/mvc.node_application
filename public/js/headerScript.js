$(document).ready(function () {

    const getAuth = ()=>{
        return localStorage.getItem('x-auth') || sessionStorage.getItem("x-auth")
    }
    
    const sendToken = (request) =>{
        request.setRequestHeader("Authorization" , getAuth())
    }

    $("#logout").on("click",function(){
        if($("#logout").attr('enabled')){
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
        }
        else{
            return
        }
    })
    if(getAuth()){
        $('#data').html(localStorage.getItem('userName')+"_"+localStorage.getItem("cash")||
        sessionStorage.getItem('userName')+"_"+sessionStorage.getItem('cash')
        )
    }else{
        $('#data').html(
            'you are not login'
        )
    }
    
    var imageFilename = window.localStorage.getItem('imageFilename') 
                        ||window.sessionStorage.getItem('imageFilename')



    if(getAuth()){
        let color = "rgb(248,240,1)"
        $(".nav-link li:eq(1) a")
            .attr("href","/todoList")
            .css("color",color)
        $("#shop")
            .attr("href","/shopping")
            .css("color",color)
        $(".dropdown-item:eq(2)")
            .attr('href','/profile/editProfile')
            .css("color",color)
        
        $("#logout")
            .attr("enabled","enabled")
            .css("color","rgb(248, 240, 1)")
    }else{
        let color = '#999'
        $(".nav-link li:eq(1) a")
            .attr("href","#")
            .css("color",color)
        $("#shop")
            .attr("href","#")
            .css("color",color)
        $(".dropdown-item:eq(2)")
            .attr('href',"#")
            .css("color",color)
        $("#logout")
            .attr("disabled","disabled")
            .css("color",color)
    }



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