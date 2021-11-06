// // Page Manager
let onOtherProjects=false
document.querySelector('.project-list').addEventListener('mouseenter',()=>onOtherProjects=true)
document.querySelector('.project-list').addEventListener('mouseleave',()=>onOtherProjects=false)
let manager={
    element:document.querySelector('.page-manager'),
    indicator:document.querySelector('#o-page').getElementsByTagName('div'),
    pages:[],
    current:0,
    next:()=>{
        manager.indicator[manager.current].classList.remove('current-page')  
        if(manager.pages.length>manager.current+1) manager.current+=1              
        manager.indicator[manager.current].classList.add('current-page')      
        return manager.pages[manager.current]
    },
    previous:()=>{
        manager.indicator[manager.current].classList.remove('current-page')
        if(0<=manager.current-1) manager.current-=1  
        manager.indicator[manager.current].classList.add('current-page')       
        return manager.pages[manager.current]
    }
};
for (let i = 0; i < manager.element.children.length; i++) {
    const element = manager.element.children[i];
    manager.pages.push(element.id)
}   

window.addEventListener("wheel",(e)=>{
    if (onOtherProjects) return
    if (manager.element.style.opacity!='1') return
    if (e.deltaY>0){ //SCROLL UP        
        location.href=`#${manager.next()}`
    }else{ //SCROLL DOWN
        location.href=`#${manager.previous()}`
    }
})

window.onload=()=>{
    if (location.href!=location.origin+"/") location.href=location.origin
}


// // Featured Project Control

let featured={
    btns: document.querySelector('.show-btns').getElementsByTagName('button'),
    indicator:document.querySelector('.show-btns').getElementsByTagName('div'),
    showcase: document.querySelector('.show-case').getElementsByClassName('show'),
    current: 0,
    hover:false,
    next:()=>{  
        if (featured.hover) return;      
        featured.indicator[featured.current].classList.remove('current-box')
        featured.showcase[featured.current].classList.remove('current-show') 

        if (featured.current+1 >= featured.indicator.length) featured.current=-1
        featured.current+=1

        featured.indicator[featured.current].classList.add('current-box')
        featured.showcase[featured.current].classList.add('current-show')        

        featured.resetInterval()
    },
    previous:()=>{     
        if (featured.hover) return;      
        featured.indicator[featured.current].classList.remove('current-box')
        featured.showcase[featured.current].classList.remove('current-show') 
        
        if (featured.current-1 < 0) featured.current=featured.indicator.length
        featured.current-=1

        featured.indicator[featured.current].classList.add('current-box')
        featured.showcase[featured.current].classList.add('current-show') 
        
        featured.resetInterval()
    },
    interval: null,
    resetInterval:()=>{
        if (featured.interval!=null){
            clearInterval(featured.interval)
        }
        featured.interval=setInterval(featured.next,5000)
    }
}
document.querySelector('.show-case').addEventListener('mouseenter',()=>featured.hover=true)
document.querySelector('.show-case').addEventListener('mouseleave',()=>featured.hover=false)
featured.btns[0].addEventListener('click',featured.previous)
featured.btns[1].addEventListener('click',featured.next)
featured.resetInterval()
// // Page Load Animation Sequence
let nav=document.querySelector('.navbar')
let overlay=document.querySelector('.overlay')

nav.style.visibility='visible'
nav.style.top='0'
overlay.style.visibility='visible'
overlay.style.bottom='0'
overlay.style.opacity='1'
manager.element.style.visibility='visible'
manager.element.style.bottom='0'
manager.element.style.opacity='1'