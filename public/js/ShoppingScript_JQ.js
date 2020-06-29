$(document).ready(function () {


    const sendToken = (request) => {
        try {
            request.setRequestHeader(
                "Authorization",
                localStorage.getItem("x-auth")||sessionStorage.getItem('x-auth')
            )
        } catch (err) {
            console.error(err);
        }
    }
    
    $('.sellme').on('click',function(){
        let priceCard = $(this).closest('.card').find("p:eq(1)").text()
        let titleCard = $(this).closest('.card').find("p:eq(0)").text()
        let result = window.confirm(`Do you want to buy this ((${titleCard}))??`)
        if(result){

            $.ajax({
                beforeSend:sendToken,
                method:"put",
                url:"/shopping/buy",
                data:{
                    priceCard,
                    titleCard
                },
                success:function(data){
                    let cash = data.cash
                    if(localStorage.getItem('cash')){
                        localStorage.setItem('cash' , cash)
                    }else{
                        sessionStorage.setItem('cash',cash)
                    }
                },
                fail:function(err){
                    console.error(err)
                }
            })

        }else{
            return
        }
    })


});