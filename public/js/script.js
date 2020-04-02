const fetch_Users_Info = () => {
  $.get("/User", function(data) {
    var table = new Vue({
      el: "#table",
      data: {
        people: data.reverse()
      },
      methods: {
        RemoveUser: function(user) {
          const result = confirm("مطمئنی میخوای پاکش کنی؟؟؟");
          result
            ? $.ajax({
                url: "/User",
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
          form.editMode = true;
          form._id = user._id;
          form.userName = user.userName;
          form.email = user.email;
          form.password = user.password;
        }
      }
    });
  });
};

var form = new Vue({
  el: "#form",
  data: {
    userName: null,
    email: null,
    password: null,

    editMode: false,
    _id: null
  },
  methods: {
    AddOrUpdate: function() {
      let info = {
        userName: this.userName,
        email: this.email,
        password: this.password
      };

      if (this.editMode == true) {
        // UPDATE USER INFO
        info._id = this._id;

        $.ajax({
          method: "put",
          url: "/User",
          // contentType:'application/json',
          data: info
        })
          .done(function() {
            alert("UPDATING IS DONE");
            window.location.reload();
          })
          .fail(function(err) {
            console.error(err);
          });
      } else {
        // SIGNUP NEW USER
        $.post("/User", info, () => {
          window.location.reload();
        });
      }
    }
  }
});

fetch_Users_Info();
