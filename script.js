const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        if (entry.isIntersecting) {
            entry.target.classList.add('show');
        } else {
            entry.target.classList.remove('show')
        }
    });
});

// observer.observe(document.querySelectorAll('.hide'))

const html = {
    html: document.getElementById('html'),
    body: document.getElementById('body'),
    header: document.getElementById('header')
}

const scroll = {
    scrollMaxY:  Number(getComputedStyle(html.body).height.replace('px', ''))/2,
    scrollLimit: 20,
    previousScroll: 0
}

const animations = {
    mainText: document.getElementById('main-text'),
    subText: document.getElementById('sub-text'),
    stars: document.getElementById('stars'),
    transparent: document.getElementById('transparent'),
    bigBtn: document.getElementById('big-btn')
}

window.addEventListener('scroll', function(){
    if(scrollY > scroll.previousScroll){
        scroll.previousScroll = scrollY;
        html.header.classList.add('headerY-down')
        html.header.classList.remove('headerY-up')
    } else if(scrollY < scroll.previousScroll){
        scroll.previousScroll = scrollY;
        html.header.classList.add('headerY-up')
        html.header.classList.remove('headerY-down')
    }    
})

window.addEventListener('scroll', function(){
    if(scrollY > scroll.scrollLimit){
        html.header.classList.add('headerY-color')
    } else {
        html.header.classList.remove('headerY-color')
    }    
})


window.addEventListener('scroll', function (){
    let scrollYPercentage = (scrollY/scroll.scrollMaxY) * 100;
    animations.mainText.animate({
        transform: `translateX(${scrollYPercentage/3.5}vw)`
    }, {duration: 120, fill: "forwards"})
    animations.subText.animate({
        transform: `translateX(${-(scrollYPercentage/3.5)}vw)`
    }, {duration: 120, fill: "forwards"})
    animations.stars.animate({
        transform: `translateX(${(scrollYPercentage/2.5)}vw)`
    }, {duration: 120, fill: "forwards"})
    if(this.scrollY > 120) {
        animations.bigBtn.style.opacity = '0'
        animations.bigBtn.style.visibility = '-1'
    } else {
        animations.bigBtn.style.opacity = '1'
        animations.bigBtn.style.zIndex = '1'
        animations.bigBtn.animate({
            transform: `translateY(${(scrollYPercentage/2.5)}vw)`
        }, {duration: 120, fill: "forwards"})    
    }
})

const nav = {
    navBtn: document.getElementById('nav-btn'),
    navBar: document.getElementById('sliding-nav'),
    navCloseBtn: document.getElementById('sliding-nav-close-btn')
}

nav.navBtn.addEventListener('click', toggleNavBar)
nav.navCloseBtn.addEventListener('click', toggleNavBar)
document.addEventListener('click', function(e){
    if (e.target.id.includes("-li")){
        toggleNavBar()
    }
})

function toggleNavBar() {
    nav.navBar.classList.toggle('hidden')
    html.body.classList.toggle('no-overflow')
}

AOS.init();