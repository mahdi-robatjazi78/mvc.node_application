const getAllData = ()=>{
    $.get('/todo',function(data){
        var table = new Vue({
            el:"#table",
            data:{
                todos:data.reverse()
            },
            methods:{
                removeTask:function(todo){
                    $.ajax({
                        url:'/todo',
                        method:'delete',
                        data:todo
                    }).done(function(){
                        console.log(`${todo.text} has removed now`)
                        window.location.reload()
                    }).fail(function(err){
                        console.log(err)
                    })
                }
            }
        })
    })
}
getAllData()


var form = new Vue({
    el:"#form",
    data:{

    },
    methods:{
        postTask:function(){
            const data = $('#input').val()
            !data ? alert('please fill data')  :
            $.post('/todo',{text:data},(err)=>{
                console.log(err);
            })
        }
    }
})
