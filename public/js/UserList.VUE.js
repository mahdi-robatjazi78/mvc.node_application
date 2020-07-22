$(document).ready(function () {

	const sendToken = (request) =>{
		request.setRequestHeader(
			"Authorization",
			localStorage.getItem("x-auth")||sessionStorage.getItem("x-auth")			
		)
	}

	$("#TextArea").css("display","none")

	let fetch_Users_Info = () => {
		let groupName,owned,joined
		let params = new URLSearchParams(window.location.search)
		
		for (const param of params) {
			if(param[0]==="groupName")groupName = param[1]
			else if(param[0]==="owned")owned = param[1]
			else if(param[0]==="joined")joined=param[1]
		}

		const showinfo = (count , adminName) =>{

			$('.groupName').append(`<span>${groupName}</span>`)
			if(owned) $('#yourPosition').append("<span>admin of this group</span>")
			else if(joined) $("#yourPosition").append("<span>joined to this group</span>")
			$("#adminName").append(`<span>${adminName}</span>`)
			$("#count").append(`<span>${count}</span>`)

		}

		getGroupName=()=>{
			//for user delete from group and send todo for users
			return groupName
		}

		$.post(`/userList/fetch`,
			{groupName,owned,joined},
			function ({ data, count ,adminName }) {
			showinfo(count , adminName)
			
			let table = new Vue({
				el: "#table",
				data: {
					people: data.reverse(),
					textSearch: null,
				},
				methods: {
					//get userImageSource
					getImageSource: function (user) {
						let address = "image/user/" + user.filename
						console.log(address);
						return address
					},
					//remove User
					RemoveUser: function (user) {
						const result = confirm("you sure ??")
						result
						?
							$.ajax({
								url: "/userList/removeUserFromGroup",
								method: "delete",
								data: { 
									id: user._id,
									groupName:getGroupName()
								}
							})
								.done(function () {

									alert(
										`${user.userName}  has deleted now`
									)
									window.location.reload()
								})
								.fail(function (err) {
									alert(err.msg)
								})
						: () => {
							return
						}
					},
					//search Users
					searchUser: function () {
						let user = data.filter((item) =>
							item.userName.startsWith(this.textSearch)
						)
						this.people = user
					},
					sendTodo : function(e){
						$("#TextArea").css({"display":"flex"})
						let t_row_index = $(e.target).parent().index()
						this.people.map((item,index)=>{
							if(index==t_row_index){
								$("#TextArea label span").remove()
								$("#TextArea label").append(`<span class="text-primary"> ${item.userName} </span>`)	
								

								var sender = [];

								if($("#yourPosition").text().includes("admin")){
									sender.push("admin")
									sender.push(getGroupName())
									sender.push(item._id)
								}
								else if($("#yourPosition").text().includes("joined")){
									sender.push("friend")
									sender.push(getGroupName())
									sender.push(item._id)
								}


								$("#TextArea button").on("click",function(e){
									let task = $("#textarea").val()
									if(task === ""){
										alert('please fill text area')
									}else{
										$.ajax({
											beforeSend:sendToken,
											method:"post",
											url:"/todoList/newTask",
											data:{ 
												task ,
												sender
											},
											success:function(){
												Success=true
												alert("your task sended now")
											},
											error:function(err){
												Success=false
												alert(err.msg)
											}
										})

										$("#TextArea label span").remove()

									}
								})
							
							}
						})

					}
				},
			})
			$("tr").on("click",function(event){
				table.sendTodo(event)
			})
		})
	}

	fetch_Users_Info()

	
})
