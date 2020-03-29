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