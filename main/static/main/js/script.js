function removeAllOpens(){
    document.getElementsByClassName('menuIcon')[0].classList.remove('closeMenuIcon')
    document.getElementsByClassName('back')[0].classList.remove('backOpen')
    document.getElementsByClassName('menu')[0].classList.remove('menuOpen')
}
$('.menuIcon').on('click', function () {
    document.getElementsByClassName('menuIcon')[0].classList.toggle('closeMenuIcon')
    document.getElementsByClassName('back')[0].classList.toggle('backOpen')
    document.getElementsByClassName('menu')[0].classList.toggle('menuOpen')
})
$('.back').on('click', function () {
    removeAllOpens()
})
$('#series').on('keyup', function () {
    if(this.value.length > 4){
        this.value = this.value[0]+this.value[1]+this.value[2]+this.value[3]
    }
})
$('#number').on('keyup', function () {
    if(this.value.length > 6){
        this.value = this.value[0]+this.value[1]+this.value[2]+this.value[3]+this.value[4]+this.value[5]
    }
})
$('.logoBar').on('click', function () {
    window.location.href = '/'

})

function validateEmail(email) {
    var chrbeforAt = email.substr(0, email.indexOf('@'));
    if (!($.trim(email).length > 127)) {
        if (chrbeforAt.length >= 2) {
            var re = /^(([^<>()[\]{}'^?\\.,!|//#%*-+=&;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
            return re.test(email);
        } else {
            return false;
        }
    } else {
        return false;
    }
}
if (localStorage.getItem('token')) {
    localToken = localStorage.getItem('token')
    if (localStorage.getItem('widget') == 'true') {
        widget = localStorage.getItem('widget')
        console.log(localToken);
        document.getElementsByClassName('localToken')[0].style.display = 'flex'
        document.getElementsByClassName('closeWidget')[0].style.display = 'flex'

        $('.localToken').on('click touch', function () {
            localStorage.setItem('widget', 'false')
            window.location.href = '/order/'+localToken    
        })
    }
}

$('.closeWidget').on('click', function () {
    localStorage.removeItem('widget')
    localStorage.removeItem('token')
    this.style.display = 'none'
    document.getElementsByClassName('localToken')[0].style.display = 'none'

})
$('.payButton').on('click', function () {
    localStorage.setItem('widget', 'true')

})
$('.submit').on('click', function () {
    names = document.getElementById('name').value
    surname = document.getElementById('surname').value
    patronymic = document.getElementById('patronymic').value
    series = document.getElementById('series').value
    number = document.getElementById('number').value
    date = document.getElementById('date').value
    email = document.getElementById('email').value

    errorText = document.getElementById('errorText')

if (surname) {
    document.getElementById('surname').classList.remove('errorPlaceholder')
    if (names) {
        document.getElementById('name').classList.remove('errorPlaceholder')
            if (patronymic) {
                document.getElementById('patronymic').classList.remove('errorPlaceholder')
                if (series) {
                    if (series.length == 4) {
                        document.getElementById('series').classList.remove('errorPlaceholder')
                        if (number) {
                            document.getElementById('number').classList.remove('errorPlaceholder')
                            if (number.length == 6) {
                                document.getElementById('number').classList.remove('errorPlaceholder')
                                if (date) {
                                    document.getElementById('date').classList.remove('errorPlaceholder')
                                    if (email) {
                                        document.getElementById('email').classList.remove('errorPlaceholder')
                                        if (validateEmail(email)) {
                                            document.getElementById('email').classList.remove('errorPlaceholder')
                                            $.ajax({
                                                type: 'GET',
                                                data: {
                                                    name: names,
                                                    surname: surname,
                                                    patronymic: patronymic,
                                                    series: series,
                                                    number: number,
                                                    date: date,
                                                    email: email,
                                                },
                                                success: function (redirect) {
                                                    localStorage.setItem('token', redirect.redirect)
                                                    window.location.href = 'pay/'+redirect.redirect
                                                }      
                                            })  
                                        }
                                        else{
                                            errorText.innerHTML = 'Некорректное заполнение эл. почты!'
                                            document.getElementById('email').classList.add('errorPlaceholder')
                                        }  
                                    }
                                    else{
                                        errorText.innerHTML = 'Пожалуйста заполните эл. почту!'
                                        document.getElementById('email').classList.add('errorPlaceholder')
                                    }  
                                }
                                else{
                                    errorText.innerHTML = 'Пожалуйста заполните дату!'
                                    document.getElementById('date').classList.add('errorPlaceholder')
                                }  
                            }
                            else{
                                errorText.innerHTML = 'Номер паспорта введен не верно!'
                                document.getElementById('number').classList.add('errorPlaceholder')
                            }  
                        }
                        else{
                            errorText.innerHTML = 'Пожалуйста заполните номер!'
                            document.getElementById('number').classList.add('errorPlaceholder')
                        }  
                    }
                    else{
                        errorText.innerHTML = 'Серия паспорта введена не верно!'
                        document.getElementById('series').classList.add('errorPlaceholder')
                    }  
                }
                else{
                    errorText.innerHTML = 'Пожалуйста заполните серию!'
                    document.getElementById('series').classList.add('errorPlaceholder')
                }  
            }
            else{
                errorText.innerHTML = 'Пожалуйста заполните отчество!'
                document.getElementById('patronymic').classList.add('errorPlaceholder')
            }  
        }
        else{
            errorText.innerHTML = 'Пожалуйста заполните имя!'
            document.getElementById('name').classList.add('errorPlaceholder')
        }
    }
    else{
        errorText.innerHTML = 'Пожалуйста заполните фамилию!'
        document.getElementById('surname').classList.add('errorPlaceholder')
    }   

})

SmoothScroll({    
    animationTime     : 700,    
    stepSize          : 80,        
    accelerationDelta : 30,      
    accelerationMax   : 2,       
    keyboardSupport   : true,      
    arrowScroll       : 50,        
    pulseAlgorithm    : true,
    pulseScale        : 4,
    pulseNormalize    : 1,    
    touchpadSupport   : true,
})

window.onscroll = function() {scrollFunction()};

function scrollFunction() {
  if (document.body.scrollTop > 80 || document.documentElement.scrollTop > 80) {
    document.getElementsByClassName('menuIcon')[0].style.filter = "brightness(500%)"
    
} else {
    document.getElementsByClassName('menuIcon')[0].style.filter = "none"
    
  }
}
$('.enter').on('click', function () {
    $.ajax({
        type: 'GET',
        data: {
            token: document.getElementById('token').value,
            
        }              
    })  
})