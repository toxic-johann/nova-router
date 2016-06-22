import {test, assertCalls} from '../../lib/pipeline-test-util.js'
import * as routerUtil from '../../../../src/util.js'

describe('canActivate',function () {
    beforeEach (function(){
        spyOn(routerUtil,'warn')
    })

    it('sync allow',function (done) {
        test({
            a: {
                canActivate:function(){
                    return true
                }
            }
        },function(router, calls){
            router.go('/a')
            expect(router.routerView.children[0].content).toBe('a')
            assertCalls(calls,['a.canActivate'])
            expect(routerUtil.warn).not.toHaveBeenCalled()
            done()
        })
    })

    it('sync allow with transition.next',function (done) {
        test({
            a: {
                canActivate:function(transition){
                    transition.next()
                }
            }
        },function(router, calls){
            router.go('/a')
            expect(routerUtil.warn).not.toHaveBeenCalled()
            expect(router.routerView.children[0].content).toBe('a')
            assertCalls(calls,['a.canActivate'])
            done()
        })
    })

    it('async allow with transition.next',function (done) {
        test({
            a: {
                canActivate:function(transition){
                    setTimeout(function () {
                        transition.next(true)
                    }, wait)
                }
            }
        },function(router, calls){
            // i would like that use promise
            // in case i don't know whether the user forget to return boolean
            // so that i will take a warn here
            router.go('/a')
            expect(router.routerView.children.length).toBe(0)
            setTimeout(function() {
                expect(routerUtil.warn).not.toHaveBeenCalled()
                expect(router.routerView.children[0].content).toBe('a')
                assertCalls(calls,['a.canActivate'])
                expect(router._currentRoute.path).toBe('/a')
                done()
            },wait)
                
        })
    })

    it('sync reject',function (done){
        test({
            a: {
                canActivate:function(){
                    return false
                }
            }
        },function(router, calls){
            router.go('/a')
            expect(router.routerView.children.length).toBe(0)
            assertCalls(calls,['a.canActivate'])
            expect(router._currentRoute.path).toBe('/')
            expect(routerUtil.warn).not.toHaveBeenCalled()
            done()
        })
    })

    it('sync reject with transition.abort',function (done){
        test({
            a: {
                canActivate:function(transition){
                    transition.abort()
                }
            }
        },function(router, calls){
            router.go('/a')
            expect(router.routerView.children.length).toBe(0)
            assertCalls(calls,['a.canActivate'])
            expect(router._currentRoute.path).toBe('/')
            expect(routerUtil.warn).not.toHaveBeenCalled()
            done()
        })
    })

    it('async reject with transition',function (done) {
        test({
            a: {
                canActivate:function(transition){
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
            expect(router.routerView.children.length).toBe(0)
            setTimeout(function() {
                expect(routerUtil.warn).not.toHaveBeenCalled()
                expect(router.routerView.children.length).toBe(0)
                assertCalls(calls,['a.canActivate'])
                expect(router._currentRoute.path).toBe('/')
                done()
            },wait)
                
        })
    })

    it('promise allow',function(done){
        test({
            a: {
                canActivate:function(transition){
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
            expect(router.routerView.children.length).toBe(0)
            setTimeout(function() {
                expect(routerUtil.warn).not.toHaveBeenCalled()
                expect(router.routerView.children[0].content).toBe('a')
                assertCalls(calls,['a.canActivate'])
                expect(router._currentRoute.path).toBe('/a')
                done()
            },wait*2)
                
        })
    })

    it('promise resolve false',function(done){
        test({
            a: {
                canActivate:function(transition){
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
            expect(router.routerView.children.length).toBe(0)
            setTimeout(function() {
                expect(routerUtil.warn).not.toHaveBeenCalled()
                expect(router.routerView.children.length).toBe(0)
                assertCalls(calls,['a.canActivate'])
                expect(router._currentRoute.path).toBe('/')
                done()
            },wait*2)
                
        })
    })

    it('promise reject',function(done){
        test({
            a: {
                canActivate:function(transition){
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
            expect(router.routerView.children.length).toBe(0)
            setTimeout(function() {
                expect(routerUtil.warn).not.toHaveBeenCalled()
                expect(router.routerView.children.length).toBe(0)
                assertCalls(calls,['a.canActivate'])
                expect(router._currentRoute.path).toBe('/')
                done()
            },wait*2)
        })
    })

    it('sync with transition but do noting',function (done) {
        test({
            a: {
                canActivate:function(transition){
                    // do nothing
                }
            }
        },function(router, calls){
            router.go('/a')
            expect(routerUtil.warn).not.toHaveBeenCalled()
            expect(router.routerView.children.length).toBe(0)
            assertCalls(calls,['a.canActivate'])
            done()
        })
    })
})