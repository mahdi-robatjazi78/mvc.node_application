$(document).ready(function () {
    const setToken = function(request){
        request.setRequestHeader(
            "Authorization",
            localStorage.getItem("x-auth")||sessionStorage.getItem("x-auth")

        )
    }

    $('.groupBox').mouseenter(function(){
        $(this).addClass("boxStyles")
        $('.groupBox form input').attr('placeholder','press enter')

    })

    $('.groupBox').mouseleave(function(){
        $(this).removeClass("boxStyles")
        $('.groupBox form input').removeAttr('placeholder')

    })

    $('#groupName').on('keypress',function(event){
        // press enter on input
        if(event.which===13){
            const result = localStorage.getItem('x-auth')|| sessionStorage.getItem("x-auth")
            result
            ?
                $.ajax({
                    beforeSend:setToken,
                    method:"post",
                    url:"/group/group_creation",
                    data:{groupName:$("#groupName").val()}
                    
                }).done(function(res){
                    console.log(res.msg)
                }).fail(function(err){
                    console.log(err.msg)
                })
            :
                alert('please first signUp or login then create a group. thanks')
                
        }
    })


    $('#joinGroup').on('keypress',function(event){
        if(event.which===13){
            const result = localStorage.getItem('x-auth')|| sessionStorage.getItem("x-auth")
            result
            ?
                $.ajax({
                    beforeSend:setToken,
                    method:"post",
                    url:"/group/group_joining",
                    data:{groupName:$("#joinGroup").val()},
                    success:function(res){
                        Success= true
                        alert(res.msg)
                    },
                    error:function(err){
                        Success=false
                        alert(err.msg)
                    }
                })
            : 
                alert('please first signUp or login then join to group. thanks')
        }
    })

    //get user own groups and user joined gropus
    const getGroupsData=()=>{
        $.ajax({
            beforeSend:setToken,
            method:"get",
            url:"/group/get_User_Groups_Data",
            success:function(res){
                Success=true
                res.owned_groups.map(item=>{
                    $("#ownedGroupsList").append(`<li class="owned_groupItems">${item}</li>`)
                })

                res.joined_groups.map(item=>{
                    $("#joinedGroupsList").append(`<li class="joined_groupItems">${item}</li>`)
                })    

                $(".owned_groupItems").on("click",function(e){
                    window.location.href=`/userList/?groupName=${e.target.innerText}&owned=true`
                })

                $(".joined_groupItems").on('click',function(e){
                    window.location.href=`/userList/?groupName=${e.target.innerText}&joined=true`
                })

            },
            error:function(err){
                Success=false
                console.log(err);
            }
        })
    }

    
    
    getGroupsData()
    
        
})