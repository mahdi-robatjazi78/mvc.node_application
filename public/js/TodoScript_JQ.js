$(document).ready(function () {

	// SEND TOKEN FOR AUTHENTICATION BEFORE EXECUTE ANY OPERATION
	const sendToken = function (request) {
		try {
			request.setRequestHeader(
				"Authorization",
				localStorage.getItem("x-auth")||sessionStorage.getItem("x-auth")
			)
		} catch (err) {
			console.error(err)
		}
	}
	var editMode = false
	var oldTask = undefined

	// ADD TASK or EDITING TASK
	$("#submitTask").on('click',function (e) {
		const nullTodoInput=()=> {
			alert("please fill input task")
			e.preventDefault()
		}

		let todo = $("#Task").val()
		if (todo == "") {
			nullTodoInput()
		} else {
			if (editMode === false) {
				// NEW TASK
				$.ajax({
					beforeSend: sendToken,
					method: "post",
					url: "/todoList/newTask",
					data: { task:todo ,sender:["self"] },
				})
					.done(() => {
						window.location.reload()
					})
					.fail((message) => {
						console.error(message)
					})
			} else {
				// UPDATE TASK
				$.ajax({
					beforeSend: sendToken,
					method: "put",
					url: "/todoList/updateTask",
					data: { task:todo, oldTask },
				})
					.done(function () {
						editMode = false
						alert("your task updated now")
						window.location.reload()
					})
					.fail(function (err) {
						console.error(err)
					})
			}
		}
	})

	//WRITE TASKS ON TABLE TODO
	const writeHtmlTable = (allTasks) => {
		let checkboxValues = []
		allTasks.map((item, index) => {
			checkboxValues.push(item.isDone)

			let sender ;

			if(item.sender.self===true){
				sender = "self"
			}else if(item.sender.admin){
				sender =`admin/${item.sender.groupName}`
			}else if(item.sender.friend_name){
				sender = `friend/${item.sender.groupName}/${item.sender.friend_name}`
			}

			
			$("#tbody").append(`
				<tr>
					<td width="5%" class="chk">
						<input type="checkbox" value=${item._id} />
					</td>
					<td class=${item.isDone === true ? "text-muted" : ""}>${item.todo}</td>
					<td class=${item.isDone === true ? "text-muted" : ""}>${item.date}</td>
					<td class=${item.isDone === true ? "text-muted" : ""}>${item.time}</td>
					<td class="edit">
						<img class="logo" src="/images/edit.svg">
					</td>
					<td class="trash">
						<img class="logo" src="/images/trash.svg">
					</td>
					<td class=${item.isDone === true ? "text-muted" : ""}>
						${moment(item.createdAt).fromNow()}
					</td>
					<td class=${item.isDone === true ? "text-muted" : ""}>${sender}</td>	
				</tr>
			`)

			$("input:checkbox").eq(index).prop("checked", checkboxValues[index])
		})
	}



	// SHOW TASKS
	$(".all,.disable,.enabled").on("click",function () {
		let fetchStatus = $(this).attr("value")
		fetchTodos(fetchStatus)
	})

	const fetchTodos=(status)=>{
		$("#tbody").html("")
		$.ajax({
			beforeSend: sendToken,
			method: "get",
			url: `/todoList/${status}`,
			success: (data) => {
				if (data.count == 0) {
					alert("please first enter a task and then see it")
					return
				}
				// TASKS COUNT
				$("#count").html(`count : ${data.count}`).css({ color: 'black' })

				// WRITE TASKS TO TODOLIST PAGE
				writeHtmlTable(data.allTasks, data.moment)

				// CHECKED EVENT FOR TASKLISTS
				$(".chk").on("click", function (e) {
					let isChecked = e.target.checked
					$.post("/todoList/done", {
						isChecked,
						_id: e.target.value,
						success: function () {
							window.location.reload()
						},
					})
				})

				// REMOVE TASK
				$(".trash").on("click", function (e) {
					let todo = $(this).closest("tr").find("td:eq(1)").text()
					$.ajax({
						beforeSend: sendToken,
						method: "delete",
						url: "/todoList/removeTask",
						data: todo,
					})
						.done(function () {
							// alert('your task is removed now' + todo)
							window.location.reload()
						})
						.fail(function (err) {
							console.error(err)
						})
				})



				// EDIT MODE
				$(".edit").on("click", function (e) {
					const todo = $(this).closest("tr").find("td:eq(1)").text()
					$("#Task").val(todo)
					$("#submitTask").text("Edit Task")
					oldTask = todo
					editMode = true
				})
			},
			fail: function (err) {
				console.error(err)
			},
		})
	}
	fetchTodos("all")
})
