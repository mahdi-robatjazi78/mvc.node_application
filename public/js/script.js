$(document).ready(function () {
  const fetch_Users_Info = () => {
    $.get("/userList/fetchAllData", function(data) {
      var table = new Vue({
        el: "#table",
        data: {
          people: data.reverse()
        },
        methods: {
          //remove user
          RemoveUser: function(user) {
            const result = confirm("you sure ?? you creazy???");
            result
            ? $.ajax({
              url: "/User/removeUser",
              method: "delete",
              data: user
            })
            .done(function() {
              alert(`${user.userName}  has deleted now`);
              window.location.reload();
            })
            .fail(function(err) {
              console.error(err);
            })
            : () => {
              return;
            };
          },
          beginUpdate: function(user) {
            form.userName = user.userName;
            form.phone = user.phone
            form.email = user.email;
            form.password = user.password;
            form._id = user._id
          }
        }
      });
    });
  };


  fetch_Users_Info();
  
  var form = new Vue({
    el: "#form",
    data:{
      userName: null,
      phone:null,
      email: null,
      password: null,
      _id: null
    },
    methods:{
      UpdateUser: function() {
        let info = {
          userName: this.userName,
          phone:this.phone,
          email: this.email,
          password: this.password,
          _id: this._id
        }

        // UPDATE USER INFO
        $.ajax({
          method: "put",
          url: "/userList/updateUser",
          data: info
        }).done(function() {
          alert("UPDATING IS DONE");
          window.location.reload();
        }).fail(function(err) {
          console.error(err);
        })
      },
      AddNewUser:function(){
        let info = {
          userName: this.userName,
          phone:this.phone,
          email: this.email,
          password: this.password,
        };

        // SIGNUP NEW USER
        $.post("/userList/signUp", info, () => {
          window.location.reload();
        });
      }
    }
  })
});
