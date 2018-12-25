this.touchManager = new TouchManager();

document.addEventListener(
  'touchstart',
  function(event) {
    event.preventDefault();
    window.touchManager.handleTouchStart(event);
  },
  false
);

document.addEventListener(
  'touchmove',
  function(event) {
    window.touchManager.handleTouchMove(event);
  },
  false
);

function TouchManager() {
  this.touchStartPoint = null;

  this.onSwipeLeft = null;
  this.onSwipeRight = null;
  this.onSwipeUp = null;
  this.onSwipeDown = null;
}

TouchManager.prototype.handleTouchStart = function(event) {
  window.touchManager.touchStartPoint = {};
  window.touchManager.touchStartPoint.x = event.touches[0].clientX;
  window.touchManager.touchStartPoint.y = event.touches[0].clientY;
};

TouchManager.prototype.handleTouchMove = function(event) {
  if (!window.touchManager.touchStartPoint) return;
  xDiff = window.touchManager.touchStartPoint.x - event.touches[0].clientX;
  yDiff = window.touchManager.touchStartPoint.y - event.touches[0].clientY;

  if (Math.abs(xDiff) >= Math.abs(yDiff)) {
    if (xDiff > 0) {
      if (window.touchManager.onSwipeLeft) window.touchManager.onSwipeLeft();
    } else {
      if (window.touchManager.onSwipeRight) window.touchManager.onSwipeRight();
    }
  } else {
    if (yDiff > 0) {
      if (window.touchManager.onSwipeUp) window.touchManager.onSwipeUp();
    } else {
      if (window.touchManager.onSwipeDown) window.touchManager.onSwipeDown();
    }
  }
};
