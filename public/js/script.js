const getAllData = ()=>{
    $.get('/todo',function(data){
        var table = new Vue({
            el:"#table",
            data:{
                todos:data.reverse()
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
