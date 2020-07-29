$(document).ready(function () {
    const sendToken = function (request) {
        request.setRequestHeader(
            'Authorization',
            localStorage.getItem('x-auth') || sessionStorage.getItem("x-auth")
        )
    }
    
    
    // register
    let form = new Vue({
        el: "#registerForm",
        data: {
            userName: null,
            phone: null,
            email: null,
            password: null,
            _id: null,
        },
        methods: {
            AddNewUser: function () {

                let formdata = new FormData(document.getElementById('registerForm'))

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
                        location.assign('/')
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
                        window.location.href = "/"
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





    //logout part
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
                (function () {
                    return
                })()
        })
    }
})