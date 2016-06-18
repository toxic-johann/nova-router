import Router from '../../../src/index.js'

describe('Core',function () {
    let router,el

    beforeEach(function(){
        el = document.createElement('router-view')
        document.body.appendChild(el)
        spyOn(console,'error')
    })

    afterEach(function(){
        let el = router && router.routerView
        if(el && document.body.contains(el)){
            document.body.removeChild(el)
        }
    })
})