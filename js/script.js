let sliderphotos = document.querySelectorAll('.comments__photos');

(function () {
    const header = document.querySelector('.header')
    window.onscroll = () => {
        if (window.pageYOffset > 50) {
            header.classList.add('header_active')
        }
        else {
            header.classList.remove('header_active')
        }
    };


}());

//////////////////////Youtube iFrame control

var scriptUrl = 'https:\/\/www.youtube.com\/s\/player\/b555ee94\/www-widgetapi.vflset\/www-widgetapi.js'; try { var ttPolicy = window.trustedTypes.createPolicy("youtube-widget-api", { createScriptURL: function (x) { return x } }); scriptUrl = ttPolicy.createScriptURL(scriptUrl) } catch (e) { } if (!window["YT"]) var YT = { loading: 0, loaded: 0 }; if (!window["YTConfig"]) var YTConfig = { "host": "https://www.youtube.com" };
if (!YT.loading) {
    YT.loading = 1; (function () {
        var l = []; YT.ready = function (f) { if (YT.loaded) f(); else l.push(f) }; window.onYTReady = function () { YT.loaded = 1; for (var i = 0; i < l.length; i++)try { l[i]() } catch (e$0) { } }; YT.setConfig = function (c) { for (var k in c) if (c.hasOwnProperty(k)) YTConfig[k] = c[k] }; var a = document.createElement("script"); a.type = "text/javascript"; a.id = "www-widgetapi-script"; a.src = scriptUrl; a.async = true; var c = document.currentScript; if (c) { var n = c.nonce || c.getAttribute("nonce"); if (n) a.setAttribute("nonce", n) } var b =
            document.getElementsByTagName("script")[0]; b.parentNode.insertBefore(a, b)
    })()
};

var player;
function onYouTubeIframeAPIReady() {
    player = new YT.Player('youtube-iframe', {
        events: {
            'onReady': onPlayerReady
        }
    });
}
function onPlayerReady(event) {
    console.log('video start');
}
function onPlayerStateChange(event) {
    player.pauseVideo();
}




/////////////////////////////////////// intro swiper


new Swiper('.intro__container', {
    pagination: {
        el: '.intro__pagination',
        clickable: true,
    },
    grabCursor: true,
    autoHeight: true,
    loop: true,
    autoplay: {
        delay: 5000,
        pauseOnMouseEnter: true,
    },
    speed: 800,
});


//////////// video modal strat

const popupLinks = document.querySelectorAll('.popup-link');
const body = document.querySelector('body');
const lockPadding = document.querySelectorAll('.lock-padding');
const headerHiding = document.querySelector('header');
console.log('popupLinks', popupLinks);
console.log('lockPadding', lockPadding);


let unlock = true;

const timeout = 800;

if (popupLinks.length > 0) {
    for (let index = 0; index < popupLinks.length; index++) {
        const popupLink = popupLinks[index];
        popupLink.addEventListener('click', function (e) {
            const popupName = popupLink.getAttribute('href').replace('#', '');
            const currentPopup = document.getElementById(popupName);
            popupOpen(currentPopup);
            e.preventDefault();
        });
    }
}


const popupCloseIcon = document.querySelectorAll('.close-popup');
if (popupCloseIcon.length > 0) {
    for (let i = 0; i < popupCloseIcon.length; i++) {
        const el = popupCloseIcon[i];
        el.addEventListener('click', function (e) {
            popupClose(el.closest('.popup'));
            e.preventDefault();
        });
    }
}

function popupOpen(currentPopup) {
    if (currentPopup && unlock) {
        const popupActive = document.querySelector('.popup.open');
        if (popupActive) {
            popupClose(popupActive, false);
        }
        else {
            bodyLock();
        }
        currentPopup.classList.add('open');
        headerHiding.classList.add('hidden');
        currentPopup.addEventListener('click', function (e) {
            if (!e.target.closest('.popup__content')) {
                popupClose(e.target.closest('.popup'));
            }
        });
    }
}

function popupClose(popupActive, doUnlock = true) {
    if (unlock) {
        popupActive.classList.remove('open');
        headerHiding.classList.remove('hidden');
        if (doUnlock) {
            bodyUnlock();
        }
        onPlayerStateChange();
    }
}

function bodyLock() {
    const lockPaddingValue = window.innerWidth - document.querySelector('body').offsetWidth + 'px';
    console.log('lockPaddingValue', lockPaddingValue);

    if (lockPadding > 0) {
        for (let i = 0; i < lockPadding.length; i++) {
            const el = lockPadding[i];
            el.style.paddingRight = lockPaddingValue;
        }
    }
    body.style.paddingRight = lockPaddingValue;
    body.classList.add('lock');

    unlock = false;
    setTimeout(() => {
        unlock = true;
    }, timeout);
}

function bodyUnlock() {
    setTimeout(() => {
        for (let i = 0; i < lockPadding.length; i++) {
            const el = lockPadding[i];
            el.style.paddingRight = '0px';
        }
        body.style.paddingRight = '0px';
        body.classList.remove('lock');
    }, timeout);

    unlock = false;
    setTimeout(() => {
        unlock = true;
    }, timeout);
};

document.addEventListener('keydown', function (e) {
    if (e.key === "Escape") {
        const popupActive = document.querySelector('.popup.open');
        popupClose(popupActive);
    }
});



(function () {
    if (!Element.prototype.closest) {
        Element.prototype.closest = function (css) {
            var node = this;
            while (node) {
                if (node.matches(css)) return node;
                else node = node.parentElemeny;
            }
            return null;
        };
    }
})();
(function () {
    if (!Element.prototype.matches) {
        Element.prototype.matches = Element.prototype.matchesSelector ||
            Element.prototype.webkitMatchesSelector ||
            Element.prototype.mozMatchesSelector ||
            Element.prototype.msMatchesSelector;
    }
})();



//////////// video modal end


new Swiper('.comments__slider', {
    pagination: {
        el: '.comments__pagination',
        clickable: true,
        dynamicBullets: true,
        renderBullet: function (index, className) {
            return '<div class="' + className + '">' + (sliderphotos[index].outerHTML) + '</div>';
        },
    },
    navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
    },
    grabCursor: true,
    autoHeight: true,
    loop: true,
    autoplay: {
        delay: 5000,
        pauseOnMouseEnter: true,
    },
    speed: 800,
});



///////////////////////////// burger

const menuBurger = document.querySelector('.menu__burger');
const headerNav = document.querySelector('.header__nav');
if (menuBurger) {
    menuBurger.addEventListener('click', function (e) {
        document.body.classList.toggle('_lock')
        menuBurger.classList.toggle('_active');
        headerNav.classList.toggle('_active');
    });

};


// Scroll to anchors
(function () {

    const smoothScroll = function (targetEl, duration) {
        const headerElHeight = document.querySelector('.header').clientHeight;
        let target = document.querySelector(targetEl);
        let targetPosition = target.getBoundingClientRect().top - headerElHeight;
        let startPosition = window.pageYOffset;
        let startTime = null;

        const ease = function (t, b, c, d) {
            t /= d / 2;
            if (t < 1) return c / 2 * t * t + b;
            t--;
            return -c / 2 * (t * (t - 2) - 1) + b;
        };

        const animation = function (currentTime) {
            if (startTime === null) startTime = currentTime;
            const timeElapsed = currentTime - startTime;
            const run = ease(timeElapsed, startPosition, targetPosition, duration);
            window.scrollTo(0, run);
            if (timeElapsed < duration) requestAnimationFrame(animation);
        };
        requestAnimationFrame(animation);

        if (menuBurger.classList.contains('_active')) {
            document.body.classList.remove('_lock')
            menuBurger.classList.remove('_active');
            headerNav.classList.remove('_active');
        }

    };

    const scrollTo = function () {
        const links = document.querySelectorAll('.js-scroll');
        links.forEach(each => {
            each.addEventListener('click', function () {
                const currentTarget = this.getAttribute('href');
                smoothScroll(currentTarget, 1000);
            });
        });
    };
    scrollTo();
}());


//////////////////////////// Animation

let animItems = document.querySelectorAll('._anim-items');
if (animItems.length > 0) {
    window.addEventListener('scroll', animOnScroll);
    function animOnScroll() {
        for (let i = 0; i < animItems.length; i++) {
            const animItem = animItems[i];
            let animItemHeight = animItem.offsetHeight;
            console.log('animItemHeight', animItemHeight);
            const animItemOffset = offset(animItem).top;
            const animStart = 4;

            let animItemPoint = window.innerHeight - animItemHeight / animStart;

            if (animItemHeight > window.innerHeight) {
                animItemPoint = window.innerHeight - window.innerHeight / animStart;
            }

            if ((pageYOffset > animItemOffset - animItemPoint) && pageYOffset < (animItemOffset + animItemHeight)) {
                animItem.classList.add("_active");
            }
            else {
                animItem.classList.remove("_active");
            }

        }
    }
    function offset(el) {
        const rect = el.getBoundingClientRect(),
            scrollLeft = window.pageXOffset || document.documentElement.scrollLeft,
            scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        return { top: rect.top + scrollTop, left: rect.left + scrollLeft }
    }
    setTimeout(() => {
        animOnScroll();
    }, 800);
}

