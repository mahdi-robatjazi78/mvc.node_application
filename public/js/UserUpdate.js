$(document).ready(function () {
    
    const sendToken = function(request){
        request.setRequestHeader(
            'Authorization',
            localStorage.getItem('x-auth') || sessionStorage.getItem("x-auth")
        )
    }




    
    
    // edit profile part

    let edit = new Vue({
        el:"#editProfile",
        data:{ 
            userName:'',
            phone:'',
            email:'',
            password:'',
        },
        methods:{
            getUserData:()=>{
                $.ajax({
                    beforeSend:sendToken,
                    method:"get",
                    url:"/profile/updatePageData",
                    success:function(data){
                        Success = true
                        edit.userName=data.userName,
                        edit.email=data.email,
                        edit.phone=data.phone
                    },
                    error:function (error) {
                        Success=false
                        console.error(error.msg);
                    }
                })
            },
            editProfile:()=>{


                $.ajax({
                    beforeSend:sendToken,
                    method:"put",
                    url:"/profile/editProfile",
                    data:{ 
                        userName:edit.userName,
                        email:edit.email,
                        password:edit.password,
                        phone:edit.phone
                    },
                    success:function(data){
                        Success=true
                        alert(data.msg)
                        localStorage.setItem("userName" , data.userName)||sessionStorage.setItem("userName",data.userName)
                    },
                    error:function(error){
                        Success=false
                        alert(error.msg)
                    }
                })
            }
        }
    })


    edit.getUserData()
    console.log(edit.userName);
});