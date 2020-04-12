$(document).ready(function () {
    // REMOVE TASK J-QUERY__AJAX
    $('.trash').on('click',function(e){
        
        let todo = $(this).closest('tr').find('td:eq(1)').text()
        $.ajax({
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
            const todo = $('#Task').val();

            $.post("/todoList/newTask", {todo} ,function (){
                    alert('your task saved now')
                    window.location.reload()
                }
            );
        }else{
            const todo = $('#Task').val();
            
            $.ajax({
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

    // edit mode input 
    $('.edit').on('click',function(e){
        const todo = $(this).closest('tr').find("td:eq(1)").text()
        $('#Task').val(todo)
        $("#submit").text('Edit Task')
        oldTask = todo
        editMode = true
    })


    // done checkbox
    $('[type = checkbox]').on('click',function(e){
        isChecked = e.target.checked
        $.post('/todoList/done',{isChecked,_id : e.target.value},function(){
            window.location.reload()
        })            
    })


    


});