const sendToken = function(request){
    try {
        request.setRequestHeader('Authorization' , localStorage.getItem('x-auth'))
    } catch (err) {
        console.error(err);
    }
}


//FORM SUBMIT CHECK
$('#form').submit(function (e) { 
    var val = $('#Task').val()
    if(val==''){
        e.preventDefault()
        alert('please fill input task')
    }
});

let editMode = false
let oldTask = undefined

$("#submit").click(function (e) { 

    if (editMode === false){
        // NEW TASK
        const todo = $('#Task').val();

        $.ajax({
            beforeSend:sendToken,
            method:'post',
            url:'/todoList/newTask',
            data:{todo}
        }).done(()=>{
            console.log('done');
            window.location.reload()
        }).fail((message)=>{
            console.log(message);
        })

    }else{
        // UPDATE TASK
        const todo = $('#Task').val();
        
        $.ajax({
            beforeSend:sendToken,
            method:"put",
            url:"/todoList/updateTask",
            data:{todo,oldTask}
        }).done(function () {  
            editMode = false
            alert('your task updated now')
            window.location.reload()
        }).fail(function(err){
            console.error(err);
        })
    }
    
});

// edit mode input's 
$('.edit').on('click',function(e){
    const todo = $(this).closest('tr').find("td:eq(1)").text()
    $('#Task').val(todo)
    $("#submit").text('Edit Task')
    oldTask = todo
    editMode = true
})


// isdone checkbox for tasks
$('[type = checkbox]').on('click',function(e){
    isChecked = e.target.checked
    $.post('/todoList/done',{isChecked , _id:e.target.value},function(){
        window.location.reload()
    })            
})


// REMOVE TASK
$('.trash').on('click',function(e){

    let todo = $(this).closest('tr').find('td:eq(1)').text()
    $.ajax({
        beforeSend:sendToken,
        method:'delete',
        url:'/todoList/removeTask',
        data:todo
    }).done(function(){
        // alert('your task is removed now' + todo)
        window.location.reload()
    }).fail(function(err){
        console.error(err);
    })
})