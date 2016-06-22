let UA = navigator.userAgent.toLowerCase()
window.isIE9 = UA.indexOf('msie 9.0') > 0
window.isIE = UA.indexOf('trident') > 0

// IE has some shaky timer precision issues when using the Promise polyfill...
window.wait = isIE ? 100 : 30

import '../../../example/basic/libs/nova.1.0.1.js'
import '../../../example/basic/libs/nova_polyfills.1.0.1.js'
import '../../../example/basic/component/nova-link/main.js'
// import Router from '../../../dist/nova-router.js'
// import '../../../example/basic/component/nova-view/main.js'
import '../../../example/basic/component/nova-test-view/main.js'

// window.router = new Router();

import './util.js'
import './core.js'
import './history/hash.js'
import './history/html5.js'

import './pipeline/activate.js'
import './pipeline/can-activate.js'
import './pipeline/can-deactivate.js'
import './pipeline/can-reuse.js'
import './pipeline/data.js'
import './pipeline/deactivate.js'
import './pipeline/full.js'