$(document).ready(function () {


	const sendToken = function (request) {
		request.setRequestHeader(
			'Authorization',
			localStorage.getItem('x-auth') || sessionStorage.getItem("x-auth")
		)
	}


	let fetch_Users_Info = () => {
		$.get("/userList/fetch", function ({ data, count }) {

			let table = new Vue({
				el: "#table",
				data: {
					people: data.reverse(),
					count,
					textSearch: null,
				},
				methods: {
					//get userImageSource
					getImageSource: function (user) {
						let address = "image/user/" + user.filename
						console.log(address);
						return address
					},
					//remove Users
					RemoveUser: function (user) {
						if (user.userName === localStorage.getItem('userName') ||
							user.userName === sessionStorage.getItem('userName')
						) {
							alert('please first logout and then remove yourself')
							return
						}
						const result = confirm("you sure ?? you creazy???")
						result
							?
							$.ajax({
								url: "/userList/removeUser",
								method: "delete",
								data: { _id: user._id }
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
					// begin update
					beginUpdate: function (user) {
						form.userName = user.userName
						form.phone = user.phone
						form.email = user.email
						form._id = user._id
					},
					//search Users
					searchUser: function () {
						let user = data.filter((item) =>
							item.userName.startsWith(this.textSearch)
						)
						this.people = user
					},
				},
			})
		})
	}

	fetch_Users_Info()

	let form = new Vue({
		el: ".form",
		data: {
			userName: null,
			phone: null,
			email: null,
			password: null,
			_id: null,
		},
		methods: {
			UpdateUser: function () {
				let info = {
					userName: this.userName,
					phone: this.phone,
					email: this.email,
					_id: this._id,
				}

				// UPDATE USER INFO
				$.ajax({
					method: "put",
					url: "/userList/updateUser",
					data: info,
				})
					.done(function () {
						alert("UPDATING IS DONE")
						window.location.reload()
					})
					.fail(function (err) {
						console.error(err)
					})
			},
			AddNewUser: function () {

				let formdata = new FormData(document.getElementById('form-data'))

				formdata.append('userName', this.userName)
				formdata.append('phone', this.phone)
				formdata.append('email', this.email)
				formdata.append('password', this.password)


				// SIGNUP NEW USER
				$.ajax({
					method: "post",
					url: "/userList/signUp",
					processData: false,
					contentType: false,
					data: formdata,
					success: function (res) {
						Success = true
						login.saveUserToken(res)
						location.assign(`/userList/?msg=${res.msg}`)
					},
					error: function (err) {
						Success = false
						console.error(err)
					}
				})
			}
		}
	})

	//login part

	let login = new Vue({
		el: "#login_form",
		data: {
			email: null,
			password: null,
			permanent: false,
		},
		methods: {
			loginUser: function () {
				let thiss = this
				let info = {
					email: this.email,
					password: this.password,
				}
				$.ajax({
					method: "post",
					url: "/userList/login",
					data: info,
					success: function (data) {
						Success = true;
						// SET TOKEN IN LOCAL STORAGE OR SESSION STORAGE
						thiss.saveUserToken(data, thiss.permanent)
					},
					error: function (err) {
						Success = false;
						console.error(err)

					}
				})
			},
			saveUserToken: function (data, permanent) {
				localStorage.clear()
				sessionStorage.clear()
				if (permanent) {

					localStorage.setItem("x-auth", data.token)
					localStorage.setItem("imageFilename", data.imageFilename)
					localStorage.setItem("userName", data.userName)
					localStorage.setItem("cash", data.cash)

				} else {
					sessionStorage.setItem("x-auth", data.token)
					sessionStorage.setItem("imageFilename", data.imageFilename)
					sessionStorage.setItem("userName", data.userName)
					sessionStorage.setItem("cash", data.cash)
				}
			}
		}
	})


	let token = localStorage.getItem('x-auth') || sessionStorage.getItem("x-auth")

	if (token === null) {
		$("#logout_button").hide()
	} else {
		$("#logout_button").on("click", function () {
			let result = confirm("Are you sure?? do you want logout now")
			result
			?
				$.ajax({
					beforeSend: sendToken,
					method: 'post',
					url: "/userList/logout",
					success: function (result) {
						localStorage.clear()
						sessionStorage.clear()
						console.log(result);
						window.location.reload()
						$("#logout_button").hide()
					},
					error: function (error) {
						console.log(error)
					}
				})
			: 
				(function(){
					return
				})()
		})
	}
})
