import Router from '../../../src/index.js'

describe('Core',function () {
    let router,el

    beforeEach(function(){
        el = document.createElement('router-view')
        document.body.appendChild(el)
        spyOn(console,'error')
        spyOn(window, 'scrollTo')
    })

    afterEach(function(){
        let el = router && router.routerView
        if(el && document.body.contains(el)){
            document.body.removeChild(el)
        }
        router = null
    })

    it('try to create a nova-view',function(){
        expect(function(){
            document.createElement('nova-view')
        }).not.toThrow()
    })

    it('matching views', function(done){
        router = new Router({abstract: true})
        let guide = assertRoutes([
            ['/a', 'a'],
            ['/b', 'b'],
            // relative
            ['a', 'a'],
            ['b', 'b'],
            // relative with traversal
            ['../a', 'a', '/a'],
            ['./../b', 'b', '/b'],
            // no match
            ['/c', '']
        ],done,matches=>{
            let content = router.routerView.children.length > 0?router.routerView.children[0].content:''
            expect(content).toBe(matches[0][1])
        })
        let aView = createNovaView({content:'a'})
        let bView = createNovaView({content:'b'})
        router.map({
            '/a':{
                component:aView,
            },
            '/b':{
                component:bView,
            }
        })
        var cb = jasmine.createSpy()
        router.afterEach(function(){
            guide.check()
            guide.next()
        })
        router.start(el,function() {
            expect(router.routerView).toBeTruthy()
            cb()
        })
        expect(cb).toHaveBeenCalled()
    })

    it('go() with object',function(done){
        router = new Router({abstract:true})
        let aView = createNovaView({content:'a'})
        let bView = createNovaView({content:'b'})
        let cView = createNovaView({content:'c'})
        let guide = assertRoutes([
            [{ path: '/a/A' }, 'aA'],
            [{ path: '/b/B' }, 'bB'],
            // relative
            [{ path: '../a/A' }, 'aA'],
            [{ path: '../b/B' }, 'bB'],
            // relative with append: true
            [{ path: 'c', append: true }, 'bBc'],
            // named routes
            [{ name: 'a', params: {msg: 'A'}}, 'aA'],
            [{ name: 'b', params: {msg: 'B'}, query: {msg: 'B'}}, 'bBB']
        ],done,matches=>{
            let parent = router.routerView.children[0]
            if(parent){
                let content = parent.content || ''
                content += parent.$route.params.msg || ''
                content += parent.$route.query.msg || ''
                content += parent.children.length>0 ? parent.children[0].content : ''
                expect(content).toBe(matches[0][1])
            }
        })
        router.map({
            '/a/:msg':{
                name:'a',
                component:aView
            },
            '/b/:msg':{
                name:'b',
                component:bView,
                subRoutes:{
                    '/c':{
                        component:cView
                    }
                }
            }
        })
        router.afterEach(function(){
            guide.check()
            guide.next()
        })
        router.start(el)
    })

    it('go() querystring code',function(done) {
        router = new Router({abstract:true})
        let aView = createNovaView({content:'a'})
        let bView = createNovaView({content:'b'})
        let cView = createNovaView({content:'c'})
        let query = {msg: 'https://www.google.com/#q=novajs'}
        let guide = assertRoutes([
            // object with path
            [{ path: '/a', query: query }, 'a' + query.msg],
            // object with named route
            [{ name: 'b', query: query }, 'b' + query.msg],
            // special char
            ['/c?msg=%!!!', 'c%!!!']
        ],done,matches=>{
            let parent = router.routerView.children[0]
            if(parent){
                let content = parent.content || ''
                // content += parent.$route.params.msg || ''
                content += parent.$route.query.msg || ''
                // content += parent.children.length>0 ? parent.children[0].content : ''
                expect(content).toBe(matches[0][1])
            }
        })
        router.map({
            '/a':{
                component:aView,
            },
            '/b':{
                component:bView,
                name:'b'
            },
            "/c":{
                component:cView
            }
        })
        router.afterEach(function(){
            guide.check()
            guide.next()
        })
        router.start(el)
    })
    
    it('matching nested views', function(done) {
        let aView = createNovaView({content:'a'})
        let adView = createNovaView({content:'ad'})
        let a1View = createNovaView({content:'a1'})
        let a2View = createNovaView({content:'a2'})
        let bView = createNovaView({content:'b'})
        let b1View = createNovaView({content:'b1'})
        router = new Router({abstract:true})
        let guide = assertRoutes([
            ['/a', 'aad'],
            ['/a/sub-a', 'aa1'],
            ['/a/sub-a-2', 'aa2'],
            ['/b/sub-b', 'bb1'],
            ['/b', 'b'],
            // no match
            ['/b/sub-a', '']
        ],done,matches=>{
            let parent = router.routerView.children[0]
            if(parent){
                let content = parent.content || ''
                // content += parent.$route.params.msg || ''
                // content += parent.$route.query.msg || ''
                content += parent.children.length>0 ? parent.children[0].content : ''
                expect(content).toBe(matches[0][1])
            }
        })
        router.map({
            '/a':{
                component:aView,
                subRoutes:{
                    '/':{
                        component:adView
                    },
                    "/sub-a":{
                        component:a1View
                    },
                    "/sub-a-2":{
                        component:a2View
                    }
                }
            },
            '/b':{
                component:bView,
                subRoutes: {
                    '/sub-b':{
                        component:b1View
                    }
                }
            },
        })
        router.afterEach(function(){
            guide.check()
            guide.next()
        })
        router.start(el)
    })

    it('matching nested views and canReuse', function(done) {
        router = new Router({abstract:true})
        let aView = createNovaView({content:'a'})
        let spya = jasmine.createSpy()
        aView.attachedHandler = spya
        let adView = createNovaView({content:'ad'})
        let a1View = createNovaView({content:'a1'})
        let a2View = createNovaView({content:'a2'})
        let spya2 = jasmine.createSpy()
        a2View.attachedHandler = spya2
        let bView = createNovaView({content:'b'})
        let b1View = createNovaView({content:'b1'})
        let guide = assertRoutes([
            ['/a', 'aad'],
            ['/a/sub-a', 'aa1'],
            ['/a/sub-a-2', 'aa2'],
            ['/b/sub-b', 'bb1'],
            ['/b', 'b'],
            // no match
            ['/b/sub-a', '']
        ],()=>{
            expect(spya.calls.count()).toBe(1)
            expect(spya2.calls.count()).toBe(1)
            done()
        },matches=>{
            let parent = router.routerView.children[0]
            if(parent){
                let content = parent.content || ''
                // content += parent.$route.params.msg || ''
                // content += parent.$route.query.msg || ''
                content += parent.children.length>0 ? parent.children[0].content : ''
                expect(content).toBe(matches[0][1])
            }
        })
        router.map({
            '/a':{
                component:aView,
                subRoutes:{
                    '/':{
                        component:adView
                    },
                    "/sub-a":{
                        component:a1View
                    },
                    "/sub-a-2":{
                        component:a2View
                    }
                }
            },
            '/b':{
                component:bView,
                subRoutes: {
                    '/sub-b':{
                        component:b1View
                    }
                }
            },
        })
        router.afterEach(function(){
            guide.check()
            guide.next()
        })
        router.start(el)
    })

    it('route context',function(done){
        router = new Router({abstract:true})
        let aView = createNovaView({content:"a"})
        router.map({
            '/a/:id' :{
                customeField:'custom',
                component:aView
            }
        })
        let guide = assertRoutes([
            // no param, no match (only view-b)
            ['/a', '/a,,,|'],
            // params only
            ['/a/123', '/a/123,123,,custom|/a/123,123,,custom'],
            // params + query
            ['/a/123?id=234', '/a/123?id=234,123,234,custom|/a/123?id=234,123,234,custom'],
            // relative query
            ['?id=345', '/a/123?id=345,123,345,custom|/a/123?id=345,123,345,custom']
        ],done,matches=>{
            let parent = router.routerView.children[0]
            let content = (router.routerView.$route.path || '') + ','
            content += (router.routerView.$route.params && router.routerView.$route.params.id || '') + ','
            content += (router.routerView.$route.query && router.routerView.$route.query.id || '' )+ ','
            content += (router.routerView.$route.customeField || '' )+ '|'
            if(parent){
                content += (parent.$route.path || '' )+ ','
                content += (parent.$route.params.id || '' )+ ','
                content += (parent.$route.query.id || '' )+ ','
                content += parent.$route.customeField || ''
                // content += parent.children.length>0 ? parent.children[0].content : ''
            }
            expect(content).toBe(matches[0][1])
        },{defaultMatch:'/,,,|'})
        router.afterEach(function(){
            guide.check()
            guide.next()
        })
        router.start(el)
    })

    it('notfound',function(done) {
        router = new Router({abstract:true})
        let aView = createNovaView({content:"a"})
        router.map({
            '*':{
                component:aView
            }
        })
        let guide = assertRoutes([
            ['/notfound', 'a'],
            ['/notagain', 'a']
        ],done,matches=>{
            let content = router.routerView.children[0].content
            expect(content).toBe(matches[0][1])
        },{defaultMatch:'a'})
        router.afterEach(function(){
            guide.check()
            guide.next()
        })
        router.start(el)
    })

    it('global before', function(done){
        router = new Router({abstract:true})
        let noView = createNovaView({content:'no'})
        let redirectView = createNovaView({content:'redirect'})
        let toView = createNovaView({content:'to'})
        let notFoundView = createNovaView({content:'notfound'})
        router.map({
            '/no':{
                component:noView
            },
            '/redirect/:id':{
                component:redirectView
            },
            '/to/:id':{
                component:toView
            },
            '*': {
                component:notFoundView
            }
        })

        let spy1 = jasmine.createSpy('before hook 1')
        router.beforeEach(function(transition) {
            spy1()
            setTimeout(function(){
                transition.next()
            },wait)
        })

        let spy2 = jasmine.createSpy('before hook 2')
        router.beforeEach(function (transition) {
            spy2()
            if (transition.to.path === '/no'){
                setTimeout(function(){
                    transition.abort()
                    next()
                },wait)
            } else if(transition.to.path.indexOf('/redirect') > -1) {
                setTimeout(function(){
                    transition.redirect('/to/:id')
                    next2()
                },wait)
            } else {
                transition.next()
            }
        })

        let spy3 = jasmine.createSpy('before hook 3')
        router.beforeEach(function(){
            spy3()
        })

        router.start(el)
        expect(spy1).toHaveBeenCalled()
        expect(spy2).not.toHaveBeenCalled()
        expect(spy3).not.toHaveBeenCalled()
        expect(router.routerView.children.length).toBe(0)

        setTimeout(function(){
            expect(spy2).toHaveBeenCalled()
            expect(spy3).toHaveBeenCalled()
            expect(router.routerView.children[0].content).toBe('notfound')
            router.go('/no')
        },wait * 2)

        function next () {
            expect(spy1.calls.count()).toBe(2)
            expect(spy2.calls.count()).toBe(2)
            expect(spy3.calls.count()).toBe(1) // aborted at 2
            expect(router.routerView.children[0].content).toBe('notfound')
            router.go('/redirect/12345')
        }

        function next2 (){
            expect(spy1.calls.count()).toBe(4) // go + redirect
            expect(spy2.calls.count()).toBe(3) // only go at this moment
            expect(spy3.calls.count()).toBe(1) // still 1
            setTimeout(function () {
                expect(spy1.calls.count()).toBe(4)
                expect(spy2.calls.count()).toBe(4)
                expect(spy3.calls.count()).toBe(2) // after redirect
                expect(router.routerView.children[0].content).toBe('to')
                done()
            },wait * 2)
        }
    })

    it('global after',function(done) {
        router = new Router({abstract: true})
        let aView = createNovaView({content:"a"})
        router.map({
            '/a':{
                component:aView
            }
        })
        var callCount = 0
        router.afterEach(function(transition){
            if(callCount === 0){
                expect(transition.from.path).toBeUndefined()
                expect(transition.to.path).toBe('/')
            } else {
                expect(transition.from.path).toBe('/')
                expect(transition.to.path).toBe('/a')
                done()
            }
            callCount++
        })
        router.start(el)
        router.go('/a')
    })

    if(!window.isIE9) {
        it('saveScrollPosition',function(done) {
            router = new Router({
                history:true,
                saveScrollPosition: true
            })
            let aView = createNovaView({content:"a"})
            router.map({
                '/a':{
                    component:aView
                },
                '*':{
                    component:aView
                }
            })

            router.start(el)
            let x = window.pageXOffset
            let y = window.pageYOffset
            router.go('/a')
            window.addEventListener('popstate',function onPop(){
                setTimeout(()=>{
                    expect(window.scrollTo.calls.count()).toBe(1)
                    expect(window.scrollTo).toHaveBeenCalledWith(x, y)
                    window.removeEventListener('popstate', onPop)
                    router.stop()
                    done()
                },0)
            })
            history.back()
        })
    }

    function assertRoutes (routes=[],done=(()=>true),check = (()=>true),{defaultMatch = ''}={}){
        let matches = routes
        // default start from none
        matches.unshift(['/',defaultMatch])
        return {
            next:function(){
                if(matches.length){
                    router.go(matches[0][0])
                } else {
                    done()
                }
            },
            check:function(){
                check(matches)
                matches.shift()
            }
        }
    }

    function createNovaView({content,next,method}){
        let tmp = document.createElement('nova-test-view')
        tmp.content = content
        return tmp
    }
})
describe('Stringify Path', function () {

    let router
    beforeEach(function () {
        router = new Router({ abstract: true })
    })

    it('plain string', function () {
        expect(router.stringifyPath('a')).toBe('a')
    })

    it('object path', function () {
        expect(router.stringifyPath({ path: '/hi' })).toBe('/hi')
        expect(router.stringifyPath({ path: '/hi', query: { a: 1 }})).toBe('/hi?a=1')
        expect(router.stringifyPath({ path: '/hi', query: { a: 1, b: 2 }})).toBe('/hi?a=1&b=2')
        expect(router.stringifyPath({ path: '/hi?c=3', query: { a: 1, b: 2 }})).toBe('/hi?c=3&a=1&b=2')
        expect(router.stringifyPath({ path: '/hi', query: { a: '/c' }})).toBe('/hi?a=%2Fc')
    })

    it('named route', function () {
        router.map({
            '/test/:id': {
                name: 'a',
                component: {}
            }
        })
        expect(router.stringifyPath({ name: 'a' })).toBe('/test/undefined')
        expect(router.stringifyPath({ name: 'a', params: { id: 0 }})).toBe('/test/0')
        expect(router.stringifyPath({ name: 'a', params: { id: 'hi' }})).toBe('/test/hi')
        expect(router.stringifyPath({ name: 'a', params: { id: '你好' }})).toBe('/test/' + encodeURIComponent('你好'))
        expect(router.stringifyPath({ name: 'a', params: { id: 'hi' }, query: { b: '/c' }})).toBe('/test/hi?b=%2Fc')
    })

    it('named route not found should throw error', function () {
        expect(function () {
            router.stringifyPath({
                name: 'a'
            })
        }).toThrow()
    })

    it('encodeURI', function () {
        router.map({
            '/test/:id': {
                name: 'a',
                component: {}
            }
        })
        expect(router.stringifyPath('/hi/你好')).toBe(encodeURI('/hi/你好'))
        expect(router.stringifyPath({ path: '/hi/你好' })).toBe(encodeURI('/hi/你好'))
        expect(router.stringifyPath({ name: 'a', params: { id: '你好' }})).toBe(encodeURI('/test/你好'))
    })

})
