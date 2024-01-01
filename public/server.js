
        let search = document.getElementById('search');
let search_icon = document.getElementById('search_icon');

search_icon.addEventListener('click', () => {
    search.classList.toggle('search_input');
})

let cato_bx = document.getElementById('cato_bx');
let left_scroll = document.getElementById('left_scroll');
let right_scroll = document.getElementById('right_scroll');

left_scroll.addEventListener('click', () => {
    cato_bx.scrollLeft -= 100;
})
right_scroll.addEventListener('click', () => {
    cato_bx.scrollLeft += 100;
})


let mvoes_bx_1 = document.getElementById('mvoes_bx_1');
let left_scroll1 = document.getElementById('left_scroll1');
let right_scroll1 = document.getElementById('right_scroll1');

left_scroll1.addEventListener('click', () => {
    mvoes_bx_1.scrollLeft -= 150;
})
right_scroll1.addEventListener('click', () => {
    mvoes_bx_1.scrollLeft += 150;
})




// year and a-z box start 
let year = document.getElementById('year');
let a_z = document.getElementById('a_z');

year.addEventListener('click', () => {
    year.classList.toggle('show_year1')
});
a_z.addEventListener('click', () => {
    a_z.classList.toggle('show_year1')
});



// header slider start

let header_dur = document.getElementById('header_dur');
let header_gen = document.getElementById('header_gen');
let header_title = document.getElementById('header_title');
let header_pra = document.getElementById('header_pra');
let header = document.getElementsByTagName('header')[0];
let slider_btn = document.getElementsByClassName('slider');

const slider_load = () => {
    setTimeout(() => {
        header.style.background = "url('https://people.com/thmb/lIw6Jt22aOlxSQ82M-7f0YA4FCY=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc():focal(719x489:721x491)/Best-Books-of-2023-So-Far-013023-4e29467ab3c14c2f821ab0c16f1a697e.jpg') no-repeat center center/cover";
        header_dur.innerText = "400-500pages";
        header_gen.innerHTML = `<i class="fas fa-star"></i>6.5
        <span>Action / Adventure / Sci-Fi</span>`;
        header_title.innerText = "Popular";
        header_pra.innerText = "As per the survey conducted by wikipedia, these are the best books of 2023.It covers a wide range of genres like thriller,romance,crime and fantasy.";
        slider_btn[0].style.background = "#fff";
        slider_btn[1].style.background = "rgb(184, 184, 184, .1)";
        slider_btn[2].style.background = "rgb(184, 184, 184, .1)";
    }, 1);
    setTimeout(() => {
        header.style.background = "url('img/user1.jpg') no-repeat center center/cover";
        header_dur.innerText = "200 pages";
        header_gen.innerHTML = `<i class="fas fa-star"></i>8.5
        <span>Comedy / Spritual</span>`;
        header_title.innerText = "Feel Good";
        header_pra.innerText = "Some are lighthearted and funny books, and others are wholesome comfort reads. Here's my selection of the best feel-good books to lift your spirits when you're feeling low, remind you of the good in the world, and bring a smile to your face.";
        slider_btn[0].style.background = "rgb(184, 184, 184, .1)";
        slider_btn[1].style.background = "#fff";
        slider_btn[2].style.background = "rgb(184, 184, 184, .1)";
    }, 5000);
    setTimeout(() => {
        header.style.background = "url('img/romance.jpg') no-repeat center center/cover";
        header_dur.innerText = "400pages";
        header_gen.innerHTML = `<i class="fas fa-star"></i>9.2
        <span>Comady / Action / Drama</span>`;
        header_title.innerText = "Romantic Books";
        header_pra.innerText = "Romance books can help you identify what turns you on or what gives you pleasure because sometimes you just don't know until you read about it. Doing a buddy read with a partner may also spice up your relationship as well.";
        slider_btn[0].style.background = "rgb(184, 184, 184, .1)";
        slider_btn[1].style.background = "rgb(184, 184, 184, .1)";
        slider_btn[2].style.background = "#fff";
    }, 10000);
}

setInterval(slider_load, 15000);
slider_load();

// video controal start 

let plays = document.getElementById('play');
let videos = document.getElementById('video');
let play_btn = document.getElementById('play_btn');


play_btn.addEventListener('click', () => {
    videos.play();
    plays.classList.add('bi-pause-fill');
    plays.classList.remove('bi-play-fill');
});

plays.addEventListener('click', () => {
    if (videos.paused || videos.currentTime <= 0) {
        plays.classList.add('bi-pause-fill');
        plays.classList.remove('bi-play-fill');
        videos.play();
    } else {
        plays.classList.remove('bi-pause-fill');
        plays.classList.add('bi-play-fill');
        videos.pause();
    }
});

// video time update 

videos.addEventListener('timeupdate', () => {
    let start_time = document.getElementById('start_time');
    let end_time = document.getElementById('end_time');
    let video_duration = videos.duration;
    let min = Math.floor(video_duration / 60);
    let hour = Math.floor(min / 60);
    let sec = Math.floor(video_duration % 60);
    let video_current_time = videos.currentTime;


    let start_min = Math.floor(video_current_time / 60);
    let start_sec = Math.floor(video_current_time % 60);
    let start_hour = Math.floor(start_min / 60);

    if (start_min < 10) {
        start_min = "0" + start_min;
    }
    if (start_sec < 10) {
        start_sec = "0" + start_sec;
    }
    start_time.innerText = start_min + ":" + start_sec;

    if (start_hour < 10) {
        start_hour = "0" + start_hour;
    }

    if (start_min == 60 || start_min > 60) {
        start_time.innerText = start_hour + ":" + start_min + ":" + start_sec;
    }

    // end 
    let end_min = min - start_min;
    let end_sec = video_duration - start_sec;
    let end_hour = hour - start_hour;

    let end_mins = Math.floor(end_min % 60);
    if (end_mins < 10) {
        end_mins = "0" + end_mins;
    }
    let end_secs = Math.floor(end_sec % 60);
    if (end_secs < 10) {
        end_secs = "0" + end_secs;
    }
    let end_hours = Math.floor(end_min / 60);
    if (end_hours < 10) {
        end_hours = "0" + end_hours;
    }

    end_time.innerText = "-" + end_mins + ":" + end_secs;

    if (end_min == 60 || end_min > 60) {
        end_time.innerText = "-" + end_hours + ":" + end_mins + ":" + end_secs;
    }


    // seek bar start

    let seek = document.getElementById('seek');
    let seek_2 = document.getElementById('seek_2');
    let seek_dot = document.getElementById('seek_dot');


    let progressbar = parseInt((videos.currentTime / videos.duration) * 100);

    seek.value = progressbar;
    let seekbar = seek.value;
    seek_2.style.width = `${seekbar}%`;
    seek_dot.style.left = `${seekbar}%`;

    // seekbar value change 
    let sec_30 = document.getElementById('sec_30');
    seek.addEventListener('change', () => {
            videos.currentTime = seek.value * videos.duration / 100;
            sec_30.addEventListener('click', () => {
                videos.currentTime = seek.value * ((videos.duration - 30) / 100);
            });
        })
        // video end event 
    videos.addEventListener('ended', () => {
        plays.classList.remove('bi-pause-fill');
        plays.classList.add('bi-play-fill');
    })
});

// volume change

let start_seekbar_end = document.querySelector('.start_seekbar_end');
let cc_vol_screen = document.querySelector('.cc_vol_screen');
let vol = document.getElementById('vol');
let vol_icon = document.getElementById('vol_icon');

vol_icon.addEventListener('click', () => {
    cc_vol_screen.classList.toggle('cc_vol');
    start_seekbar_end.classList.toggle('start_seekbar');
    vol.classList.toggle('input_vol');
});

vol.addEventListener('change', () => {
    if (vol.value == 0) {
        vol_icon.classList.remove('bi-volume-up-fill');
        vol_icon.classList.remove('bi-volume-down-fill');
        vol_icon.classList.add('bi-volume-off-fill');
    }
    if (vol.value > 0) {
        vol_icon.classList.remove('bi-volume-up-fill');
        vol_icon.classList.add('bi-volume-down-fill');
        vol_icon.classList.remove('bi-volume-off-fill');
    }
    if (vol.value > 50) {
        vol_icon.classList.add('bi-volume-up-fill');
        vol_icon.classList.remove('bi-volume-down-fill');
        vol_icon.classList.remove('bi-volume-off-fill');
    }

    let vol_a = vol.value;
    videos.volume = vol_a / 100;
});

// full screen start 
let full_screen = document.getElementById('full_screen');
full_screen.addEventListener('click', () => {
    videos.requestFullscreen();
});

// video box start
let title_video = document.getElementsByClassName('title_video');
let video_1 = document.getElementsByClassName('video_1');
video_1[0].addEventListener('click', () => {
    videos.src = "./video/everless.mp4";
    videos.play();
    title_video[0].innerText = "Everless By Sara";
    plays.classList.add('bi-pause-fill');
    plays.classList.remove('bi-play-fill');
});
video_1[1].addEventListener('click', () => {
    videos.src = "./video/red queen.mp4";
    videos.play();
    title_video[0].innerText = "Red Queen";
    plays.classList.add('bi-pause-fill');
    plays.classList.remove('bi-play-fill');
});
video_1[2].addEventListener('click', () => {
    videos.src = "./video/girl.mp4";
    videos.play();
    title_video[0].innerText = "The girl in Room 105";
    plays.classList.add('bi-pause-fill');
    plays.classList.remove('bi-play-fill');
});


// Movies Box Set

const movies = [{
            id: 36,
            img: "book_img/relativity.jpg",
            down_img: "book_img/relativity.jpg",
            title: "Relativity",
            letter: "t",
            genre1: "action",
            genre2: "none",
            genre3: "none",
            genre4: "biography",
            genre5: "animation",
            genre6: "none",
            genre7: "documentary",
            genre8: "none",
            genre9: "18+",
            genre10: "scifi",
            genre11: "horor",
            year: 2021,
            rate: 9.9,
            url: "book_files/relativity.html",
            tppr: "trend",
            msot: "movie",
            screen1: "img/gazi1.jpg",
            screen2: "img/gazi2.jpg",
            screen3: "img/gazi3.jpg",
            ph420: "img/the-ghazi-attack-poster.webp",
            ph720: "mimg/comndo.jpg",
            ph1080: "img/the-ghazi-attack-poster.webp",
        },
        {
            id: 35,
            img: "book_img/goosebumps.jpeg",
            title: "goosebumps",
            letter: "c",
            genre1: "action",
            genre2: "none",
            genre3: "none",
            genre4: "biography",
            genre5: "animation",
            genre6: "none",
            genre7: "documentary",
            genre8: "none",
            genre9: "18+",
            genre10: "scifi",
            genre11: "horor",
            year: 2020,
            rate: 9.3,
            url: "book_files/goosebumps1.html",
            tppr: "trend",
            msot: "movie"
        },
        {
            id: 34,
            img: "book_img/spiderman.jpg",
            title: "Spiderman",
            letter: "c",
            genre1: "action",
            genre2: "none",
            genre3: "none",
            genre4: "biography",
            genre5: "animation",
            genre6: "none",
            genre7: "documentary",
            genre8: "none",
            genre9: "18+",
            genre10: "scifi",
            genre11: "horor",
            year: 2020,
            rate: 9.1,
            url: "book_files/spiderman1.html",
            tppr: "trend",
            msot: "movie"
        },
        {
            id: 33,
            img: "book_img/hanuman.jpg",
            title: "Hanuman",
            letter: "b",
            genre1: "action",
            genre2: "none",
            genre3: "none",
            genre4: "biography",
            genre5: "animation",
            genre6: "none",
            genre7: "documentary",
            genre8: "none",
            genre9: "18+",
            genre10: "scifi",
            genre11: "horor",
            year: 2021,
            rate: 9.7,
            url: "book_files/hanuman1.html",
            tppr: "trend",
            msot: "movie"
        },
        {
            id: 32,
            img: "book_img/guliver.jpg",
            title: "Guliver",
            letter: "b",
            genre1: "action",
            genre2: "none",
            genre3: "none",
            genre4: "biography",
            genre5: "animation",
            genre6: "none",
            genre7: "documentary",
            genre8: "none",
            genre9: "18+",
            genre10: "scifi",
            genre11: "horor",
            year: 2021,
            rate: 7.7,
            url: "book_files/gulliver1.html",
            tppr: "trend",
            msot: "movie"
        },
        {
            id: 31,
            img: "book_img/harry_poter.jpg",
            title: "Harry Poter",
            letter: "t",
            genre1: "action",
            genre2: "none",
            genre3: "none",
            genre4: "biography",
            genre5: "animation",
            genre6: "none",
            genre7: "documentary",
            genre8: "none",
            genre9: "18+",
            genre10: "scifi",
            genre11: "horor",
            year: 2021,
            rate: 7.9,
            url: "book_files/harrypotter1.html",
            tppr: "trend",
            msot: "movie"
        },
        {
            id: 30,
            img: "book_img/and_then.jpg",
            title: "And then",
            letter: "b",
            genre1: "action",
            genre2: "none",
            genre3: "none",
            genre4: "biography",
            genre5: "animation",
            genre6: "comady",
            genre7: "documentary",
            genre8: "none",
            genre9: "18+",
            genre10: "scifi",
            genre11: "horor",
            year: 2020,
            rate: 8.9,
            url: "book_files/",
            tppr: "trend",
            msot: "movie"
        },
        {
            id: 29,
            img: "book_img/blue.jpg",
            title: "Blue Umbrella",
            letter: "b",
            genre1: "action",
            genre2: "none",
            genre3: "none",
            genre4: "biography",
            genre5: "animation",
            genre6: "comady",
            genre7: "documentary",
            genre8: "none",
            genre9: "18+",
            genre10: "scifi",
            genre11: "horor",
            year: 2020,
            rate: 8.8,
            url: "book_files/ruskin1.html",
            tppr: "trend",
            msot: "movie"
        },
        {
            id: 28,
            img: "book_img/gopi.jpg",
            title: "Gopi Diaries",
            letter: "b",
            genre1: "action",
            genre2: "none",
            genre3: "none",
            genre4: "biography",
            genre5: "animation",
            genre6: "comady",
            genre7: "documentary",
            genre8: "none",
            genre9: "18+",
            genre10: "scifi",
            genre11: "horor",
            year: 2021,
            rate: 6.8,
            url: "book_files/gopidiaries1.html",
            tppr: "trend",
            msot: "movie"
        },
        {
            id: 27,
            img: "book_img/future.jpg",
            title: "Making Future",
            letter: "a",
            genre1: "action",
            genre2: "none",
            genre3: "none",
            genre4: "biography",
            genre5: "animation",
            genre6: "comady",
            genre7: "documentary",
            genre8: "none",
            genre9: "18+",
            genre10: "scifi",
            genre11: "horor",
            year: 2020,
            rate: 9.7,
            url: "book_files/makingfuture1.html",
            tppr: "trend",
            msot: "movie"
        },
        {
            id: 26,
            img: "book_img/woman.jpg",
            title: "girl women",
            letter: "a",
            genre1: "action",
            genre2: "crime",
            genre3: "adeventure",
            genre4: "biography",
            genre5: "animation",
            genre6: "comady",
            genre7: "documentary",
            genre8: "none",
            genre9: "18+",
            genre10: "scifi",
            genre11: "horor",
            year: 2020,
            rate: 9.6,
            url: "book_files/girlwomen1.html",
            tppr: "trend",
            msot: "movie"
        },
        {
            id: 25,
            img: "book_img/worn.jpeg",
            title: "worn",
            letter: "a",
            genre1: "action",
            genre2: "crime",
            genre3: "adeventure",
            genre4: "biography",
            genre5: "animation",
            genre6: "comady",
            genre7: "documentary",
            genre8: "none",
            genre9: "18+",
            genre10: "scifi",
            genre11: "horor",
            year: 2021,
            rate: 8.8,
            url: "book_files/worn1.html",
            tppr: "trend",
            msot: "movie"
        },
        {
            id: 24,
            img: "book_img/take.jpg",
            title: "Take my mind",
            letter: "a",
            genre1: "action",
            genre2: "crime",
            genre3: "adeventure",
            genre4: "biography",
            genre5: "animation",
            genre6: "comady",
            genre7: "documentary",
            genre8: "none",
            genre9: "18+",
            genre10: "scifi",
            genre11: "horor",
            year: 2021,
            rate: 8.2,
            url: "book_files/takemyhand1.html",
            tppr: "trend",
            msot: "movie"
        },
        {
            id: 23,
            img: "book_img/high.jpg",
            title: "how high",
            letter: "a",
            genre1: "none",
            genre2: "crime",
            genre3: "none",
            genre4: "biography",
            genre5: "animation",
            genre6: "comady",
            genre7: "documentary",
            genre8: "none",
            genre9: "18+",
            genre10: "scifi",
            genre11: "horor",
            year: 2021,
            rate: 9.1,
            url: "book_files/how high we go in the dark 1.html",
            tppr: "trend",
            msot: "movie"
        },
        {
            id: 22,
            img: "book_img/mutual.jpeg",
            title: "Mutual Friend",
            letter: "a",
            genre1: "none",
            genre2: "crime",
            genre3: "adeventure",
            genre4: "biography",
            genre5: "animation",
            genre6: "comady",
            genre7: "documentary",
            genre8: "none",
            genre9: "18+",
            genre10: "scifi",
            genre11: "horor",
            year: 2020,
            rate: 9.9,
            url: "book_files/themutualfriend1.html",
            tppr: "trend",
            msot: "movie"
        },
        {
            id: 21,
            img: "book_img/2022.jpg",
            title: "ALMANAC",
            letter: "a",
            genre1: "none",
            genre2: "crime",
            genre3: "adeventure",
            genre4: "biography",
            genre5: "animation",
            genre6: "comady",
            genre7: "documentary",
            genre8: "none",
            genre9: "18+",
            genre10: "scifi",
            genre11: "horor",
            year: 2020,
            rate: 7.9,
            url: "book_files/theworldalmanac1.html",
            tppr: "trend",
            msot: "movie"
        },
        {
            id: 20,
            img: "book_img/american.jpg",
            title: "An American Marriage",
            letter: "a",
            genre1: "none",
            genre2: "crime",
            genre3: "adeventure",
            genre4: "biography",
            genre5: "animation",
            genre6: "comady",
            genre7: "documentary",
            genre8: "none",
            genre9: "18+",
            genre10: "scifi",
            genre11: "horor",
            year: 2021,
            rate: 6.9,
            url: "book_files/anamericanmarriage1.html",
            tppr: "trend",
            msot: "movie"
        },
        {
            id: 19,
            img: "book_img/dis.jpeg",
            title: "Dismantling india",
            letter: "u",
            genre1: "none",
            genre2: "crime",
            genre3: "adeventure",
            genre4: "biography",
            genre5: "animation",
            genre6: "comady",
            genre7: "documentary",
            genre8: "none",
            genre9: "18+",
            genre10: "scifi",
            genre11: "horor",
            year: 2021,
            rate: 9.2,
            url: "book_files/thedismantalingofindia1.html",
            tppr: "trend",
            msot: "movie"
        },
        {
            id: 18,
            img: "book_img/leader.png",
            title: "Leader",
            letter: "n",
            genre1: "none",
            genre2: "crime",
            genre3: "adeventure",
            genre4: "biography",
            genre5: "animation",
            genre6: "comady",
            genre7: "documentary",
            genre8: "none",
            genre9: "18+",
            genre10: "scifi",
            genre11: "horor",
            year: 2020,
            rate: 8.2,
            url: "book_files/becomleader22.html",
            tppr: "popular",
            msot: "movie"
        },
        {
            id: 17,
            img: "book_img/island.jpeg",
            title: "Island of missing trees",
            letter: "n",
            genre1: "none",
            genre2: "crime",
            genre3: "adeventure",
            genre4: "biography",
            genre5: "animation",
            genre6: "comady",
            genre7: "documentary",
            genre8: "none",
            genre9: "18+",
            genre10: "scifi",
            genre11: "horor",
            year: 2021,
            rate: 8.5,
            url: "book_files/island of mistrees22.html",
            tppr: "trend",
            msot: "movie",
            upload: "latest"
        },
        {
            id: 16,
            img: "book_img/salvage.jpg",
            title: "salvage",
            letter: "o",
            genre1: "none",
            genre2: "crime",
            genre3: "adeventure",
            genre4: "biography",
            genre5: "animation",
            genre6: "comady",
            genre7: "documentary",
            genre8: "none",
            genre9: "18+",
            genre10: "scifi",
            genre11: "horor",
            year: 2021,
            rate: 8.6,
            url: "book_files/salvagethebones22.html",
            tppr: "trend",
            msot: "movie"
        },
        {
            id: 15,
            img: "book_img/crime.jpg",
            title: "Born a crime",
            letter: "p",
            genre1: "none",
            genre2: "crime",
            genre3: "adeventure",
            genre4: "biography",
            genre5: "animation",
            genre6: "comady",
            genre7: "documentary",
            genre8: "none",
            genre9: "18+",
            genre10: "scifi",
            genre11: "horor",
            year: 2021,
            rate: 9.3,
            url: "book_files/bornthecrime22.html",
            tppr: "recent",
            msot: "movie",
            upload: "latest"
        },
        {
            id: 14,
            img: "book_img/house.jpg",
            title: "House of Stones",
            letter: "p",
            genre1: "none",
            genre2: "crime",
            genre3: "adeventure",
            genre4: "biography",
            genre5: "animation",
            genre6: "comady",
            genre7: "documentary",
            genre8: "none",
            genre9: "18+",
            genre10: "scifi",
            genre11: "horor",
            year: 2020,
            rate: 7.3,
            url: "book_files/houseofstone22.html",
            tppr: "popluar",
            msot: "movie"
        },
        {
            id: 13,
            img: "book_img/sea.webp",
            title: "sea of tranquility",
            letter: "q",
            genre1: "none",
            genre2: "crime",
            genre3: "adeventure",
            genre4: "biography",
            genre5: "animation",
            genre6: "comady",
            genre7: "documentary",
            genre8: "none",
            genre9: "18+",
            genre10: "scifi",
            genre11: "horor",
            year: 2020,
            rate: 5.8,
            url: "book_files/sea oftranquility22.html",
            tppr: "recent",
            msot: "movie",
            upload: "latest"
        },
        {
            id: 12,
            img: "book_img/mungo.webp",
            title: "Young Mungo",
            letter: "r",
            genre1: "none",
            genre2: "none",
            genre3: "adeventure",
            genre4: "biography",
            genre5: "animation",
            genre6: "comady",
            genre7: "documentary",
            genre8: "drama",
            genre9: "18+",
            genre10: "scifi",
            genre11: "horor",
            year: 2020,
            rate: 6.8,
            url: "book_files/youngmungo22.html",
            tppr: "recent",
            msot: "movie"
        },
        {
            id: 11,
            img: "book_img/hope.jpg",
            title: "A man of good hope",
            letter: "s",
            genre1: "none",
            genre2: "none",
            genre3: "adeventure",
            genre4: "biography",
            genre5: "animation",
            genre6: "comady",
            genre7: "documentary",
            genre8: "drama",
            genre9: "18+",
            genre10: "scifi",
            genre11: "horor",
            year: 2020,
            rate: 7.8,
            url: "book_files/amanofgoodhope22.html",
            tppr: "recent",
            msot: "series",
            upload: "latest"
        },
        {
            id: 10,
            img: "book_img/time.webp",
            title: "Time is a Mother",
            letter: "s",
            genre1: "none",
            genre2: "none",
            genre3: "adeventure",
            genre4: "biography",
            genre5: "animation",
            genre6: "comady",
            genre7: "documentary",
            genre8: "drama",
            genre9: "18+",
            genre10: "scifi",
            genre11: "horor",
            year: 2020,
            rate: 8.8,
            url: "book_files/time is a mother22.html",
            tppr: "trend",
            msot: "movie"
        },
        {
            id: 9,
            img: "book_img/electric.avif",
            title: "Electric Idol",
            letter: "s",
            genre1: "none",
            genre2: "none",
            genre3: "adeventure",
            genre4: "biography",
            genre5: "animation",
            genre6: "comady",
            genre7: "documentary",
            genre8: "drama",
            genre9: "18+",
            genre10: "scifi",
            genre11: "horor",
            year: 2020,
            rate: 8.9,
            url: "book_files/electricidol22.html",
            tppr: "trend",
            msot: "movie",
            upload: "latest"
        },
        {
            id: 8,
            img: "book_img/booth.jpg",
            title: "Booth",
            letter: "t",
            genre1: "none",
            genre2: "none",
            genre3: "adeventure",
            genre4: "biography",
            genre5: "animation",
            genre6: "comady",
            genre7: "documentary",
            genre8: "drama",
            genre9: "18+",
            genre10: "scifi",
            genre11: "horor",
            year: 2021,
            rate: 9.8,
            url: "book_files/booth22.html",
            tppr: "popular",
            msot: "movie"
        },
        {
            id: 7,
            img: "book_img/body.jpg",
            title: "Body of Water",
            letter: "t",
            genre1: "none",
            genre2: "none",
            genre3: "adeventure",
            genre4: "biography",
            genre5: "animation",
            genre6: "comady",
            genre7: "documentary",
            genre8: "drama",
            genre9: "18+",
            genre10: "scifi",
            genre11: "horor",
            year: 2021,
            rate: 8.8,
            url: "book_files/bodyofwater22.html",
            tppr: "trend",
            msot: "movie",
            upload: "latest"
        },
        {
            id: 6,
            img: "book_img/river.jpg",
            title: "River You Touch",
            letter: "t",
            genre1: "none",
            genre2: "none",
            genre3: "adeventure",
            genre4: "biography",
            genre5: "animation",
            genre6: "comady",
            genre7: "documentary",
            genre8: "drama",
            genre9: "18+",
            genre10: "scifi",
            genre11: "horor",
            year: 2020,
            rate: 8.8,
            url: "book_files/theriverutouch22.html",
            tppr: "recent",
            msot: "series"
        },
        {
            id: 5,
            img: "book_img/dragon.jpg",
            title: "Dragon fly sea",
            letter: "t",
            genre1: "none",
            genre2: "none",
            genre3: "adeventure",
            genre4: "biography",
            genre5: "animation",
            genre6: "comady",
            genre7: "documentary",
            genre8: "drama",
            genre9: "18+",
            genre10: "scifi",
            genre11: "horor",
            year: 2019,
            rate: 5.8,
            url: "book_files/dragonflysea22.html",
            tppr: "recent",
            msot: "series",
            upload: "latest"
        },
        {
            id: 4,
            img: "book_img/drift.jpg",
            title: "The old drift",
            letter: "t",
            genre1: "none",
            genre2: "none",
            genre3: "adeventure",
            genre4: "biography",
            genre5: "animation",
            genre6: "comady",
            genre7: "documentary",
            genre8: "drama",
            genre9: "18+",
            genre10: "scifi",
            genre11: "horor",
            year: 2019,
            rate: 5.8,
            url: "book_files/theolddrift22.html",
            tppr: "popular",
            msot: "movie"
        },
        {
            id: 3,
            img: "book_img/small_country.jpg",
            title: "Small Country",
            letter: "v",
            genre1: "none",
            genre2: "",
            genre3: "adeventure",
            genre4: "biography",
            genre5: "animation",
            genre6: "comady",
            genre7: "documentary",
            genre8: "drama",
            genre9: "18+",
            genre10: "scifi",
            genre11: "horor",
            year: 2021,
            rate: 9.2,
            url: "book_files/smallcountry22.html",
            tppr: "trend",
            msot: "movie",
            upload: "latest"
        },
        {
            id: 2,
            img: "book_img/talking.jpg",
            title: "Talking to Stranger",
            letter: "w",
            genre1: "none",
            genre2: "none",
            genre3: "adeventure",
            genre4: "biography",
            genre5: "animation",
            genre6: "comady",
            genre7: "documentary",
            genre8: "drama",
            genre9: "18+",
            genre10: "scifi",
            genre11: "horor",
            year: 2020,
            rate: 8.6,
            url: "book_files/talking to stramgers22.html",
            tppr: "popular",
            msot: "movie"
        },
        {
            id: 1,
            img: "book_img/pet.jpg",
            title: "Pet",
            letter: "x",
            genre1: "none",
            genre2: "none",
            genre3: "adeventure",
            genre4: "biography",
            genre5: "animation",
            genre6: "comady",
            genre7: "documentary",
            genre8: "drama",
            genre9: "18+",
            genre10: "scifi",
            genre11: "horor",
            year: 2022,
            rate: 6.5,
            url: "book_files/pet22.html",
            tppr: "recent",
            msot: "movie",
            upload: "latest"
        },
    ]
    // all array copyed!

// action button and active box

let action1 = document.getElementById('action1');
let action_bx = document.getElementById('action_bx');

action1.addEventListener('click', () => {
    action1.classList.toggle('cato_button_active');
    action_bx.classList.toggle('movie_box_active');
});

const action_array = movies.filter((e) => {
    return e.genre1 == "action";
});

action_array.forEach(element => {
    const { img, title, year, url, rate } = element;
    let card = document.createElement('div');
    card.classList.add('card');
    card.innerHTML = `
    <a href="${url}">
                <img src="${img}" alt="${title}">
                <div class="content">
                    <h5>${title}</h5>
                    <h6>
                        <span>${year}</span>
                        <div class="rate">
                            <i class="fas fa-heart"></i>
                            <i class="fas fa-eye"></i>
                            <i class="fas fa-star"></i>
                            <h6>${rate}</h6>
                        </div>
                    </h6>
                </div>
            </a>
    `

    action_bx.appendChild(card);
});

// crime button and active box

let crime1 = document.getElementById('crime1');
let crime_bx = document.getElementById('crime_bx');

crime1.addEventListener('click', () => {
    crime1.classList.toggle('cato_button_active');
    crime_bx.classList.toggle('movie_box_active');
});

const crime_array = movies.filter((e) => {
    return e.genre2 == "crime";
});

crime_array.forEach(element => {
    const { img, title, year, url, rate } = element;
    let card = document.createElement('div');
    card.classList.add('card');
    card.innerHTML = `
    <a href="${url}">
                <img src="${img}" alt="${title}">
                <div class="content">
                    <h5>${title}</h5>
                    <h6>
                        <span>${year}</span>
                        <div class="rate">
                            <i class="fas fa-heart"></i>
                            <i class="fas fa-eye"></i>
                            <i class="fas fa-star"></i>
                            <h6>${rate}</h6>
                        </div>
                    </h6>
                </div>
            </a>
    `

    crime_bx.appendChild(card);
});


// drama button and active box

let drama1 = document.getElementById('drama1');
let drama_bx = document.getElementById('drama_bx');

drama1.addEventListener('click', () => {
    drama1.classList.toggle('cato_button_active');
    drama_bx.classList.toggle('movie_box_active');
});

const drama_array = movies.filter((e) => {
    return e.genre8 == "drama";
});

drama_array.forEach(element => {
    const { img, title, year, url, rate } = element;
    let card = document.createElement('div');
    card.classList.add('card');
    card.innerHTML = `
    <a href="${url}">
                <img src="${img}" alt="${title}">
                <div class="content">
                    <h5>${title}</h5>
                    <h6>
                        <span>${year}</span>
                        <div class="rate">
                            <i class="fas fa-heart"></i>
                            <i class="fas fa-eye"></i>
                            <i class="fas fa-star"></i>
                            <h6>${rate}</h6>
                        </div>
                    </h6>
                </div>
            </a>
    `

    drama_bx.appendChild(card);
});

// movies box2 start
// all box start 
let all = document.getElementById('all');

window.addEventListener('load', () => {
        movies.forEach(element => {
            const { img, title, year, url, rate } = element;
            let card = document.createElement('div');
            card.classList.add('card');
            card.innerHTML = `
    <a href="${url}">
                <img src="${img}" alt="${title}">
                <div class="content">
                    <h5>${title}</h5>
                    <h6>
                        <span>${year}</span>
                        <div class="rate">
                            <i class="fas fa-heart"></i>
                            <i class="fas fa-eye"></i>
                            <i class="fas fa-star"></i>
                            <h6>${rate}</h6>
                        </div>
                    </h6>
                </div>
            </a>
    `

            all.appendChild(card);
        });
    })
    // latest box start 
let latest = document.getElementById('latest');

let latest_array = movies.filter((e) => {
    return e.upload == "latest";
})

window.addEventListener('load', () => {
        latest_array.forEach(element => {
            const { img, title, year, url, rate } = element;
            let card = document.createElement('div');
            card.classList.add('card');
            card.innerHTML = `
    <a href="${url}">
                <img src="${img}" alt="${title}">
                <div class="content">
                    <h5>${title}</h5>
                    <h6>
                        <span>${year}</span>
                        <div class="rate">
                            <i class="fas fa-heart"></i>
                            <i class="fas fa-eye"></i>
                            <i class="fas fa-star"></i>
                            <h6>${rate}</h6>
                        </div>
                    </h6>
                </div>
            </a>
    `

            latest.appendChild(card);
        });
    })
    // 2022 box start 
let year_2022 = document.getElementById('year_2022');

let year2022 = movies.filter((e) => {
    return e.year == "2022";
})

window.addEventListener('load', () => {
        year2022.forEach(element => {
            const { img, title, year, url, rate } = element;
            let card = document.createElement('div');
            card.classList.add('card');
            card.innerHTML = `
    <a href="${url}">
                <img src="${img}" alt="${title}">
                <div class="content">
                    <h5>${title}</h5>
                    <h6>
                        <span>${year}</span>
                        <div class="rate">
                            <i class="fas fa-heart"></i>
                            <i class="fas fa-eye"></i>
                            <i class="fas fa-star"></i>
                            <h6>${rate}</h6>
                        </div>
                    </h6>
                </div>
            </a>
    `

            year_2022.appendChild(card);
        });
    })
    // 2021 box start 
let year_2021 = document.getElementById('year_2021');

let year2021 = movies.filter((e) => {
    return e.year == "2021";
})

window.addEventListener('load', () => {
        year2021.forEach(element => {
            const { img, title, year, url, rate } = element;
            let card = document.createElement('div');
            card.classList.add('card');
            card.innerHTML = `
    <a href="${url}">
                <img src="${img}" alt="${title}">
                <div class="content">
                    <h5>${title}</h5>
                    <h6>
                        <span>${year}</span>
                        <div class="rate">
                            <i class="fas fa-heart"></i>
                            <i class="fas fa-eye"></i>
                            <i class="fas fa-star"></i>
                            <h6>${rate}</h6>
                        </div>
                    </h6>
                </div>
            </a>
    `

            year_2021.appendChild(card);
        });
    })
    // 2020 box start 
let year_2020 = document.getElementById('year_2020');

let year2020 = movies.filter((e) => {
    return e.year == "2020";
})

window.addEventListener('load', () => {
    year2020.forEach(element => {
        const { img, title, year, url, rate } = element;
        let card = document.createElement('div');
        card.classList.add('card');
        card.innerHTML = `
    <a href="${url}">
                <img src="${img}" alt="${title}">
                <div class="content">
                    <h5>${title}</h5>
                    <h6>
                        <span>${year}</span>
                        <div class="rate">
                            <i class="fas fa-heart"></i>
                            <i class="fas fa-eye"></i>
                            <i class="fas fa-star"></i>
                            <h6>${rate}</h6>
                        </div>
                    </h6>
                </div>
            </a>
    `

        year_2020.appendChild(card);
    });
})


// letter_a box start 
let letter_a = document.getElementById('letter_a');

let letter_a_array = movies.filter((e) => {
    return e.letter == "a";
})

window.addEventListener('load', () => {
        letter_a_array.forEach(element => {
            const { img, title, year, url, rate } = element;
            let card = document.createElement('div');
            card.classList.add('card');
            card.innerHTML = `
    <a href="${url}">
                <img src="${img}" alt="${title}">
                <div class="content">
                    <h5>${title}</h5>
                    <h6>
                        <span>${year}</span>
                        <div class="rate">
                            <i class="fas fa-heart"></i>
                            <i class="fas fa-eye"></i>
                            <i class="fas fa-star"></i>
                            <h6>${rate}</h6>
                        </div>
                    </h6>
                </div>
            </a>
    `

            letter_a.appendChild(card);
        });
    })
    // letter_b box start 
let letter_b = document.getElementById('letter_b');

let letter_b_array = movies.filter((e) => {
    return e.letter == "b";
})

window.addEventListener('load', () => {
        letter_b_array.forEach(element => {
            const { img, title, year, url, rate } = element;
            let card = document.createElement('div');
            card.classList.add('card');
            card.innerHTML = `
    <a href="${url}">
                <img src="${img}" alt="${title}">
                <div class="content">
                    <h5>${title}</h5>
                    <h6>
                        <span>${year}</span>
                        <div class="rate">
                            <i class="fas fa-heart"></i>
                            <i class="fas fa-eye"></i>
                            <i class="fas fa-star"></i>
                            <h6>${rate}</h6>
                        </div>
                    </h6>
                </div>
            </a>
    `

            letter_b.appendChild(card);
        });
    })
    // letter_t box start 
let letter_t = document.getElementById('letter_t');

let letter_t_array = movies.filter((e) => {
    return e.letter == "t";
})

window.addEventListener('load', () => {
    letter_t_array.forEach(element => {
        const { img, title, year, url, rate } = element;
        let card = document.createElement('div');
        card.classList.add('card');
        card.innerHTML = `
    <a href="${url}">
                <img src="${img}" alt="${title}">
                <div class="content">
                    <h5>${title}</h5>
                    <h6>
                        <span>${year}</span>
                        <div class="rate">
                            <i class="fas fa-heart"></i>
                            <i class="fas fa-eye"></i>
                            <i class="fas fa-star"></i>
                            <h6>${rate}</h6>
                        </div>
                    </h6>
                </div>
            </a>
    `

        letter_t.appendChild(card);
    });
});


// rate8 box start 
let rate8 = document.getElementById('rate8');

let rate8_array = movies.filter((e) => {
    return e.rate >= 8;
})

window.addEventListener('load', () => {
    rate8_array.forEach(element => {
        const { img, title, year, url, rate } = element;
        let card = document.createElement('div');
        card.classList.add('card');
        card.innerHTML = `
    <a href="${url}">
                <img src="${img}" alt="${title}">
                <div class="content">
                    <h5>${title}</h5>
                    <h6>
                        <span>${year}</span>
                        <div class="rate">
                            <i class="fas fa-heart"></i>
                            <i class="fas fa-eye"></i>
                            <i class="fas fa-star"></i>
                            <h6>${rate}</h6>
                        </div>
                    </h6>
                </div>
            </a>
    `

        rate8.appendChild(card);
    });
});
// rate4 box start 
let rate4 = document.getElementById('rate4');

let rate4_array = movies.filter((e) => {
    return e.rate <= 8;
})

window.addEventListener('load', () => {
    rate4_array.forEach(element => {
        const { img, title, year, url, rate } = element;
        let card = document.createElement('div');
        card.classList.add('card');
        card.innerHTML = `
    <a href="${url}">
                <img src="${img}" alt="${title}">
                <div class="content">
                    <h5>${title}</h5>
                    <h6>
                        <span>${year}</span>
                        <div class="rate">
                            <i class="fas fa-heart"></i>
                            <i class="fas fa-eye"></i>
                            <i class="fas fa-star"></i>
                            <h6>${rate}</h6>
                        </div>
                    </h6>
                </div>
            </a>
    `

        rate4.appendChild(card);
    });
});


// movies box2 end


// btns start 

let all_btn = document.getElementById('all_btn');

all_btn.addEventListener('click', () => {
    all_btn.classList.toggle('cato_button_active');
    all.classList.toggle('box2_actives');
});

let latest_btn = document.getElementById('latest_btn');

latest_btn.addEventListener('click', () => {
    latest_btn.classList.toggle('cato_button_active');
    latest.classList.toggle('box2_actives');
});
let year2022__btn = document.getElementById('year2022__btn');

year2022__btn.addEventListener('click', () => {
    year2022__btn.classList.toggle('cato_button_active');
    year_2022.classList.toggle('box2_actives');
});
let year2021__btn = document.getElementById('year2021__btn');

year2021__btn.addEventListener('click', () => {
    year2021__btn.classList.toggle('cato_button_active');
    year_2021.classList.toggle('box2_actives');
});
let year2020__btn = document.getElementById('year2020__btn');

year2020__btn.addEventListener('click', () => {
    year2020__btn.classList.toggle('cato_button_active');
    year_2020.classList.toggle('box2_actives');
});


let letter_a_btn = document.getElementById('letter_a_btn');

letter_a_btn.addEventListener('click', () => {
    letter_a_btn.classList.toggle('cato_button_active');
    letter_a.classList.toggle('box2_actives');
});
let letter_b_btn = document.getElementById('letter_b_btn');

letter_b_btn.addEventListener('click', () => {
    letter_b_btn.classList.toggle('cato_button_active');
    letter_b.classList.toggle('box2_actives');
});
let letter_t_btn = document.getElementById('letter_t_btn');

letter_t_btn.addEventListener('click', () => {
    letter_t_btn.classList.toggle('cato_button_active');
    letter_t.classList.toggle('box2_actives');
});

// rat change 

let change_input = document.getElementById('change_input');

change_input.addEventListener('change', () => {
    if (change_input.value >= 8) {
        rate8.classList.add('box2_actives');
    } else {
        rate8.classList.remove('box2_actives');
    }
    if (change_input.value < 8) {
        rate4.classList.add('box2_actives');
    } else {
        rate4.classList.remove('box2_actives');
    }
});


let search_bx2 = document.getElementsByClassName('search_bx2')[0];


window.addEventListener('load', () => {
    movies.forEach(element => {
        const { img, title, year, url } = element;

        let card = document.createElement('a');
        card.href = url;
        card.innerHTML = ` <img src="${img}" alt="">
        <div class="content2">
            <h6>${title}</h6>
            <p>${year}</p>
        </div>`;
        search_bx2.appendChild(card);
    });
});


search.addEventListener('keyup', () => {
    let filter = search.value.toUpperCase();
    let a = search_bx2.getElementsByTagName('a');
    for (let i = 0; i < a.length; i++) {
        let b = a[i].getElementsByClassName('content2')[0];
        let c = b.getElementsByTagName('h6')[0];

        let TextValue = c.textContent || c.innerText;
        if (TextValue.toUpperCase().indexOf(filter) > -1) {
            a[i].style.display = '';
            search_bx2.style.visibility = "visible";
            search_bx2.style.opacity = 1;
        } else {
            a[i].style.display = 'none';
        }
        if (search.value == 0) {
            search_bx2.style.visibility = "hidden";
            search_bx2.style.opacity = 0;
        }
    }
})
