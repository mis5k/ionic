import {Platform} from './platform';


Platform.register({
  name: 'core',
  settings: {
    mode: 'core'
  }
});
Platform.setDefault('core');


Platform.register({
  name: 'mobile'
});


Platform.register({
  name: 'phablet',
  isMatch(p) {
    let smallest = Math.min(p.width(), p.height());
    let largest = Math.max(p.width(), p.height());
    // http://www.mydevice.io/devices/
    return (smallest > 390 && smallest < 520) &&
           (largest > 620 && largest < 800);
  }
});


Platform.register({
  name: 'tablet',
  isMatch(p) {
    let smallest = Math.min(p.width(), p.height());
    let largest = Math.max(p.width(), p.height());
    // http://www.mydevice.io/devices/
    return (smallest > 460 && smallest < 820) &&
           (largest > 780 && largest < 1400);
  }
});


Platform.register({
  name: 'android',
  superset: 'mobile',
  subsets: [
    'phablet',
    'tablet'
  ],
  settings: {
    mode: 'md'
  },
  isMatch(p) {
    // "silk" is kindle fire
    let re = 'android| silk';
    return p.isPlatform('android', re);
  }
});



Platform.register({
  name: 'ios',
  superset: 'mobile',
  subsets: [
    'ipad',
    'iphone'
  ],
  settings: {
    mode: 'ios'
  },
  isMatch(p) {
    // SLEDGEHAMMER OVERRIDE FOR NOW
    return true;

    return p.isPlatform('ios', 'iphone|ipad|ipod');
  },
  versionParser(p) {
    let val = p.matchUserAgent('OS (\d+)_(\d+)?');
    console.log(val);
  }
});


Platform.register({
  name: 'ipad',
  superset: 'tablet',
  isMatch(p) {
    return p.isPlatform('ipad');
  }
});


Platform.register({
  name: 'iphone',
  subsets: [
    'phablet'
  ],
  isMatch(p) {
    return p.isPlatform('iphone');
  }
});


Platform.register({
  name: 'windowsphone',
  superset: 'mobile',
  subsets: [
    'phablet',
    'tablet'
  ],
  settings: {
    mode: 'wp'
  },
  isMatch(p) {
    return p.isPlatform('windowsphone', 'windows phone');
  }
});


Platform.register({
  name: 'cordova',
  isEngine: true,
  methods: {
    onReady: function() {
      return new Promise(resolve => {
        setTimeout(function() {
          resolve();
        }, 1000);
      });
    }
  },
  isMatch(p) {
    return true;
    return !!(window.cordova || window.PhoneGap || window.phonegap);
  }
});