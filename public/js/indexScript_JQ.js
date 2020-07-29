$(document).ready(function () {
    const getTokenFromStorage = () =>{
        return localStorage.getItem("x-auth")||sessionStorage.getItem("x-auth")
    }
    const sendToken = function(request){
        request.setRequestHeader("Authorization", getTokenFromStorage())
    }

    const showMessage = (status,msg) =>{
        $("#showMessageFromJquery").append(`
            <div class="alert alert-${status} alert-dismissible fade show text-right" role="alert">
                ${msg}
                <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                </button>
            </div>
        `)
    }

    $('.groupBox').mouseenter(function(){
        $(this).addClass("boxStyles")
        $('.groupBox form input').attr('placeholder','press enter')

    })

    $('.groupBox').mouseleave(function(){
        $(this).removeClass("boxStyles")
        $('.groupBox form input').removeAttr('placeholder')

    })

    $('#newGroup').on('keypress',function(event){
        // press enter on input
        if(event.which===13){
            const result = getTokenFromStorage()
            result
            ?
                (()=>{
                    // event.preventDefault()
                    let groupName = $("#newGroup").val()
                    if(!groupName){
                        showMessage("info","لطفا یک نام وارد کنید")
                        event.preventDefault()
                    }else{
                        $.ajax({
                            beforeSend:sendToken,
                            method:"post",
                            url:"/group/group_creation",
                            data:{groupName},
                            success:function(){
                                Success=true
                            },
                            error:function(){
                                Success=false
                            }
                        })
                    }
                })()
                
            :
            (()=>{
                event.preventDefault()
                showMessage("info","اول ثبت نام کنید یا وارد حساب خود شوید بعد یک گروه بسازید")
            })()
                
        }
    })


    $('#joinGroup').on('keypress',function(event){
        if(event.which===13){
            const result = getTokenFromStorage()
            result
            ?
                (()=>{
                    let groupName=$("#joinGroup").val()
                    if(!groupName){
                        showMessage("info","لطفا یک نام وارد کنید")
                        event.preventDefault()
                    }else{
                        $.ajax({
                            beforeSend:sendToken,
                            method:"post",
                            url:"/group/group_joining",
                            data:{groupName},
                            success:function(){
                                Success= true
                            },
                            error:function(){
                                Success=false
                            }
                        })
                    }
                })()
                
            :   
                (()=>{
                    event.preventDefault()
                    showMessage("info","اول ثبت نام کنید یا وارد حساب خود شوید بعد عضو یک گروه شوید ")
                })()
                
        }
    })

    //get user own groups and user joined gropus
    const getGroupsData=()=>{
        let result = getTokenFromStorage()
        result
        ?
            $.ajax({
                beforeSend:sendToken,
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
        :()=>{
            return
        }
    }

    
    
    getGroupsData()
    
        
})