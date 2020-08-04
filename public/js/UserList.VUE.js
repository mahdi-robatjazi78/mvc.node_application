$(document).ready(function () {

	const sendToken = (request) =>{
		request.setRequestHeader(
			"Authorization",
			localStorage.getItem("x-auth")||sessionStorage.getItem("x-auth")			
		)
	}

	const showMessage = (status,msg) =>{
		$("#showMessage").append(`
			<div class="alert alert-${status} alert-dismissible fade show text-right" role="alert">
				${msg}
				<button type="button" class="close" data-dismiss="alert" aria-label="Close">
					<span aria-hidden="true">&times;</span>
				</button>
			</div>
		`)
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
				
			showinfo(count,adminName)


		
	
			
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
								beforeSend:sendToken,
								url: "/userList/removeUserFromGroup",
								method: "delete",
								data: { 
									id: user._id,
									groupName:getGroupName()
								}
							})
						: 
							() => {
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
								
								$("showMessage")

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
												showMessage("primary","تسک شماباموفقیت فرستاده شد")
												setInterval(()=>{
													$("#textarea").val("")
												},2000)
											},
											error:function(){
												Success=false
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
				showMessage('warning',"اول تسک خود را بنویسید بعد دکمه فرستادن را بزنید")
			})

			let txt = $("#yourPosition span").text()
			if(txt.includes("joined")){
				$(".removeLogo").css("display","none")
			}else{
				$(".removeLogo").css("display","block")
			}
		})
	}

	fetch_Users_Info()

})
