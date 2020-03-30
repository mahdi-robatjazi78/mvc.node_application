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
                },
                beginUpdateTask:function(todo){
                    form.editMode=true
                    form.oldTodo=todo.text
                    form.newTodo=todo
                }
            }
        })
    })
}

getAllData()

const AppendTask = ()=>{
    const data = $('#input').val()
    if(data===''){
        alert('please fill data')
    }else{
        $.post('/todo',{text:data},(err)=>{
            console.err(err);
        })

        window.location.reload()
    }
}


var form = new Vue({
    el:"#form",
    data:{
        editMode : false,
        oldTodo : undefined,
        newTodo : {text:''}
    },
    methods:{
        
        addOrUpdate:function(){
            if(this.editMode){
                $.ajax({
                    method:'put',
                    url:'/todo',
                    contentType:'application/json',
                    data:JSON.stringify({oldTodo:this.oldTodo,newTodo:this.newTodo})
                }).done(function(){
                    alert('done')
                    window.location.reload()
                }).fail(function(err){
                    console.error(err);
                    alert(err)
                    return
                })
            }else{
                AppendTask()
            }
        }
    }
})
