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


$('.submit').on('click', function () {
    names = document.getElementById('name').value
    surname = document.getElementById('surname').value
    patronymic = document.getElementById('patronymic').value
    series = document.getElementById('series').value
    number = document.getElementById('number').value
    date = document.getElementById('date').value
    email = document.getElementById('email').value

    

    if (names && surname && patronymic && series && number && date && email){
        window.location.href = 'pay/'
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