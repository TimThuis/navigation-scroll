// elements
const doc = document.body;
const windowHeight = window.innerHeight;
const windowWidth = window.innerWidth;
const windowMid = windowHeight / 2;
const docHeight = doc.clientHeight;
const pages = doc.querySelectorAll('.page');
const pagesList = [...pages];
const activeTl = doc.querySelector('.active-tl');
const buttons = doc.querySelectorAll('.nav li')
const buttonsList = [...buttons];
const timeline = doc.querySelectorAll('.range-tl')

// global variables
let windowLocation;
let currentPage;
let activeButton;

// timelines
const IntroTl = new TimelineMax({
  pause: true,
})

IntroTl
  .staggerFrom('.page', 2, {
    height: '0vh'
  })
  .staggerFrom('.btn', 0.5, {
    y: '-100%',
  }, 0.25, '-=1')

// eventlisteners
window.addEventListener('scroll', function(event) {
  windowLocation = event.target.body.scrollTop;
  pageInFrame();
  tlPosition(windowLocation);
})

// functions
function tlPosition(location) {
  let percent = Math.round((location / (docHeight - windowHeight) * 100));
  activeTl.style.width = `${percent}%`
}

function pageInFrame() {
  pagesList.forEach(function(page, index) {
    const pageMid = page.offsetTop + windowMid;

    if (pageMid > windowLocation && pageMid < (windowLocation + windowHeight)) {
      if (currentPage !== page) {
        currentPage = page;
        buttonActive();
      }
    }
  });
}

function buttonActive() {
  buttonsList.forEach(function(button, index) {
    if (button.dataset.value === currentPage.dataset.value) {
      button.className = 'active-btn btn';
    } else {
      button.className = 'btn';
    }
  })
}

function moveTo(event) {
  pagesList.forEach(function(page, index) {
    if (event.target.dataset.value === page.dataset.value) {
      TweenMax.to(doc, 0.5, {
        scrollTop: page.offsetTop,
      })
    }
  })
}

function scrollTl(event) {
  if (event.buttons === 1) {
    let position = (docHeight - windowHeight) * (event.clientX / windowWidth);
    TweenMax.to(doc, 0.1, {
      scrollTop: position,
    })
  }
}
