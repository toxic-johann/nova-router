import {test, assertCalls} from '../../lib/pipeline-test-util.js'
import * as routerUtil from '../../../../src/util.js'

describe('canDeactivate',function () {
    beforeEach (function(){
        spyOn(routerUtil,'warn')
    })

    it('sync allow',function (done) {
        test({
            a: {
                canDeactivate:function(){
                    return true
                }
            }
        },function(router, calls){
            router.go('/a')
            expect(router.routerView.children[0].content).toBe('a')
            router.go('/c')
            assertCalls(calls,['a.canDeactivate'])
            expect(router.routerView.children[0].content).toBe('c')
            expect(routerUtil.warn).not.toHaveBeenCalled()
            done()
        })
    })

    it('sync allow with transition',function (done) {
        test({
            a: {
                canDeactivate:function(transition){
                    transition.next()
                }
            }
        },function(router, calls){
            router.go('/a')
            expect(router.routerView.children[0].content).toBe('a')
            router.go('/c')
            expect(router.routerView.children[0].content).toBe('c')
            assertCalls(calls,['a.canDeactivate'])
            expect(routerUtil.warn).not.toHaveBeenCalled()
            done()
        })
    })


    it('async allow with transition',function (done) {
        test({
            a: {
                canDeactivate:function(transition){
                    setTimeout(function () {
                        transition.next()
                    }, wait)
                }
            }
        },function(router, calls){
            // i would like that use promise
            // in case i don't know whether the user forget to return boolean
            // so that i will take a warn here
            router.go('/a')
            expect(router.routerView.children[0].content).toBe('a')
            expect(router._currentRoute.path).toBe('/a')
            router.go('/c')
            setTimeout(function() {
                assertCalls(calls,['a.canDeactivate'])
                expect(router.routerView.children[0].content).toBe('c')
                expect(routerUtil.warn).not.toHaveBeenCalled()
                done()
            },wait)
                
        })
    })


    it('sync reject',function (done){
        test({
            a: {
                canDeactivate:function(){
                    return false
                }
            }
        },function(router, calls){
            router.go('/a')
            expect(router.routerView.children[0].content).toBe('a')
            expect(router._currentRoute.path).toBe('/a')
            router.go('/c')
            assertCalls(calls,['a.canDeactivate'])
            expect(router._currentRoute.path).toBe('/a')
            expect(router.routerView.children[0].content).toBe('a')
            expect(routerUtil.warn).not.toHaveBeenCalled()
            done()
        })
    })

    it('sync reject with transition.abort',function (done){
        test({
            a: {
                canDeactivate:function(transition){
                    transition.abort()
                }
            }
        },function(router, calls){
            router.go('/a')
            expect(router.routerView.children[0].content).toBe('a')
            router.go('/c')
            assertCalls(calls,['a.canDeactivate'])
            expect(router._currentRoute.path).toBe('/a')
            expect(router.routerView.children[0].content).toBe('a')
            expect(routerUtil.warn).not.toHaveBeenCalled()
            done()
        })
    })

    it('async reject with transition.abort',function (done) {
        test({
            a: {
                canDeactivate:function(transition){
                    setTimeout(function () {
                        transition.abort()
                    }, wait)
                }
            }
        },function(router, calls){
            // i would like that use promise
            // in case i don't know whether the user forget to return boolean
            // so that i will take a warn here
            router.go('/a')
            expect(router.routerView.children[0].content).toBe('a')
            expect(router._currentRoute.path).toBe('/a')
            router.go('/c')
            setTimeout(function() {
                assertCalls(calls,['a.canDeactivate'])
                expect(router.routerView.children[0].content).toBe('a')
                expect(router._currentRoute.path).toBe('/a')
                expect(routerUtil.warn).not.toHaveBeenCalled()
                done()
            },wait)
        })
    })

    it('promise allow',function(done){
        test({
            a: {
                canDeactivate:function(transition){
                    return new Promise((resolve,reject)=>{
                        setTimeout(function () {
                            resolve(true)
                        }, wait)
                    })
                        
                }
            }
        },function(router, calls){
            // i would like that use promise
            // in case i don't know whether the user forget to return boolean
            // so that i will take a warn here
            router.go('/a')
            expect(router.routerView.children[0].content).toBe('a')
            expect(router._currentRoute.path).toBe('/a')
            router.go('/c')
            setTimeout(function() {
                assertCalls(calls,['a.canDeactivate'])
                expect(router.routerView.children[0].content).toBe('c')
                expect(routerUtil.warn).not.toHaveBeenCalled()
                done()
            },wait * 2)
        })
    })

    it('promise resolve false',function(done){
        test({
            a: {
                canDeactivate:function(transition){
                    return new Promise((resolve,reject)=>{
                        setTimeout(function () {
                            resolve(false)
                        }, wait)
                    })
                        
                }
            }
        },function(router, calls){
            // i would like that use promise
            // in case i don't know whether the user forget to return boolean
            // so that i will take a warn here
            router.go('/a')
            expect(router.routerView.children[0].content).toBe('a')
            expect(router._currentRoute.path).toBe('/a')
            router.go('/c')
            setTimeout(function() {
                assertCalls(calls,['a.canDeactivate'])
                expect(router.routerView.children[0].content).toBe('a')
                expect(router._currentRoute.path).toBe('/a')
                expect(routerUtil.warn).not.toHaveBeenCalled()
                done()
            },wait * 2)
        })
    })

    it('promise reject',function(done){
        test({
            a: {
                canDeactivate:function(transition){
                    return new Promise((resolve,reject)=>{
                        setTimeout(function () {
                            reject()
                        }, wait)
                    })
                        
                }
            }
        },function(router, calls){
            // i would like that use promise
            // in case i don't know whether the user forget to return boolean
            // so that i will take a warn here
            router.go('/a')
            expect(router.routerView.children[0].content).toBe('a')
            expect(router._currentRoute.path).toBe('/a')
            router.go('/c')
            setTimeout(function() {
                assertCalls(calls,['a.canDeactivate'])
                expect(router.routerView.children[0].content).toBe('a')
                expect(router._currentRoute.path).toBe('/a')
                expect(routerUtil.warn).not.toHaveBeenCalled()
                done()
            },wait * 2)
        })
    })

    it('sync with transition but do nothing',function (done) {
        test({
            a: {
                canDeactivate:function(transition){
                    // transition.next(true)
                }
            }
        },function(router, calls){
            router.go('/a')
            expect(routerUtil.warn).not.toHaveBeenCalled()
            expect(router.routerView.children[0].content).toBe('a')
            router.go('/c')
            expect(routerUtil.warn).not.toHaveBeenCalled()
            expect(router.routerView.children[0].content).toBe('a')
            assertCalls(calls,['a.canDeactivate'])
            done()
        })
    })
})