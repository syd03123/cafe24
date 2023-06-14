$(function(){


    
    //  /**
    //  * @sidemenu
    //  * 
    //  */
    // $('.header .btn-nav').click(function(e){ ///이벤트
    //     e.preventDefault(); //이벤트막기

    //     if(!$(this).hasClass('on')){
    //         showMenu.restart();// 메뉴버튼 클릭시에도 작동하려고
    //     }


    //     $('.header .side-nav,.header .btn-nav').toggleClass('on');
    //     $('body').toggleClass('scroll_hidden');
       
    // })         

    // gsap.set('.side-nav .side_menu .nav',{
    //     yPercent:100
    // })

    // showMenu = gsap.to('.side-nav .side_menu .nav',{
    //     yPercent:0,
    //     stagger:0.1,
    //     paused:true
    // })

   



     /**
     * @storyslide
     * 
     */
    //  <!-- Initialize Swiper -->
       var storySwiper = new Swiper(".story-Swiper", {
         slidesPerView: 3,
         spaceBetween: 30,
         navigation: {
            nextEl: ".sc-story .btn.next",
            prevEl: ".sc-story .btn.prev",
          },
       });
       var storySwiper = new Swiper(".story-child", {
              nested: true
       });


    /**
     * @howslide
     * 
     */
    //  <!-- Initialize Swiper -->
    var howSwiper = new Swiper(".how-Swiper", {
        slidesPerView: 3,
        // spaceBetween: 10,
        spaceBetween: 30,
        
    });

    





    /**
     * @FAQ
     * 
     */

    $('.nav').click(function(e){
        e.preventDefault();
        if ($(this).hasClass('on')) { 
            $(this).removeClass('on').siblings('.sub').stop().slideUp();
            $('.plus').removeClass('on');
        } else { 
            $('.nav').removeClass('on').siblings('.sub').stop().slideUp();
            $(this).addClass('on').siblings('.sub').stop().slideDown();
            $('.plus').addClass('on');
            $(this).addClass('on').siblings('.sub');

            
            // offset = $(this).offset().top - $('.sc_service .group_service .nav').height();
            // offset = $(this).offset().top - 96;
            window.scrollTo({top:offset,behavior:"smooth"})
        }
    })

    



    /****
     *  
     *  스크롤시 아래서 위로 효과
     * 
     * 
     */

    // gsap.to('',{
    //     scrollTrigger:{
    //         trigger:"",
    //         start:"",
    //         end:"",
    //         markers:true,
    //     },
    //     // 

    // })

   $('[data-scroll]').each(function(i,e){
        child=$(this).find('>*');
        gsap.from(child,{
            scrollTrigger:{
                trigger:$(this),
                start:"0% 60%",
                end:"100% 0%",
                toggleActions: "play pause resume pause",
                // markers:true,
            },
            opacity:0,
            yPercent:10,
            stagger:0.1,
        })
   })

  


    // motion1 = gsap.timeline({
        
    // })

    // motion1.to('.circle1',{x:-100 })
    // motion1.to('.circle2',{x:-200 })
    // motion1.to('.circle3',{x:-200 })
   

    /**
     * 
     * 패밀리 사이트
     * 
     */
    $(document).ready(function() {
        $(".f-title").click(function() {
          $(".family-list").toggleClass("opacity");
          $(".f-title img").toggleClass("rotate");
        });
    });



    $('.tap-item a').click(function(e){
        e.preventDefault();
        
        tab=$(this).data('tab');


        $('.tap-item a').removeClass('on');
        $(this).addClass('on');

        list(tab)



    })





    function list(tabNum){
        fetch('./assets/data/project.json')
        .then(res=>res.json())
        .then(json=>{
            data = json.items;

            sortData = data.filter(function(total){
                if(tabNum){
                    return total.cate.indexOf(tabNum) >= 0
                }else{
                    return total;
                }
            })

            let html = ``;
            let idx = 0;

            try{
                sortData.forEach(item => {
                    idx++;
                    isRes = (item.resident)?'상주':'비상주';

                    
                        html+=`<li class="prj-item">
                        <a href="" class="box">
                        <ul class="top">
                            <li>${isRes}</li>
                            <li>마감일D-${item.dDay}</li>
                        </ul>
                        <div class="txt-wrap">
                            <strong>${item.title}</strong>
                            <p>${item.desc}</p>
                        </div>
                        <div class="bottom">
                            <span class="money">${priceFormat(item.price)}만원</span>
                            <span class="date">${item.time}일</span>
                        </div>
                        </a>
                        </li>`;
                    if(idx==5){
                        html+=` <li class="prj-item more">
                        <a href="" class="box">
                           <p>더 많은 프로젝트 보러가기</p>
                           <img src="./assets/images/prj-arrow.svg" alt="프로젝트 더보기">
                        </a>
                        </li>`;
                        throw new Error("stop loop"); // 에러를 throw하면 강제로 루프에서 벗어나서 catch로 가게 된다.
                    }
                });

            }catch(e){

            }

            setTimeout(() => {
                
                $('#tabList').html(html);
            }, 1000);

        
        })
    }

    list();


    function priceFormat(num){
        return num.toLocaleString('ko-KR');
    }









       
})
