$(document).ready(function () {
	// FADE JUMBOTRON AFTER 3 SECOND
	$('.jumbotron').fadeOut(3000)

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
	$("#submit").on('click',function (e) {
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
					data: { todo },
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
					data: { todo, oldTask },
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

			$("#tbody").append(`
				<tr>
					<td width="5%" class="chk">
						<input type="checkbox" value=${item._id} />
					</td>
					<td class=${item.isDone === true ? "text-muted done" : ""}>${item.todo}</td>
					<td class=${item.isDone === true ? "text-muted done" : ""}>${item.date}</td>
					<td class=${item.isDone === true ? "text-muted done" : ""}>${item.time}</td>
					<td class="edit">
						<img class="logo" src="/images/edit.svg">
					</td>
					<td class="trash">
						<img class="logo" src="/images/trash.svg">
					</td>
					<td class=${item.isDone === true ? "text-muted done" : ""}>
						${moment(item.createdAt).fromNow()}
					</td>							
				</tr>
			`)

			$("input:checkbox").eq(index).prop("checked", checkboxValues[index])
		})
	}

	$(".fetch,.all,.disable,.enabled").click(function (e) {
		let fetchStatus = $(this).attr("value")

		$("#tbody").html("")
		var tasks = []
		$.ajax({
			beforeSend: sendToken,
			method: "get",
			url: `/todoList/${fetchStatus}`,
			success: function (data, status, xhr) {
				if (data.count == 0) {
					alert("please first enter a task and then see it")
					// $('.display-3').show().text('please first enter a task and then see it')
					return
				}
				// TASKS COUNT
				$("#count").html(`count : ${data.count}`)

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
					$("#submit").text("Edit Task")
					oldTask = todo
					editMode = true
				})
			},
			fail: function (err) {
				console.error(err)
			},
		})
	})
})
