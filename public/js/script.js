const fetch_Users_Info = () => {
    $.get('/User',function(data){
        var table = new Vue({
            el:"#table",
            data:{
                people:data.reverse()
            }
        
        })
    })
}


var form = new Vue({
    el:'#form',
    data:{
        userName:null,
        email:null,
        password:null,
        signUpDate:null
    },
    methods:{
        signUp : function(){
            let info = {
                userName:this.userName,
                email:this.email,
                password:this.password,
                signUpDate:this.signUpDate
            }
            $.post('/User',info,(err)=>{
                console.error(err);
                alert(err)
            })
        }
    }
})


fetch_Users_Info()