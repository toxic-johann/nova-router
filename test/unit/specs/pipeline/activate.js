import {test, assertCalls} from '../../lib/pipeline-test-util.js'
import * as routerUtil from '../../../../src/util.js'

describe('activate', function () {
    beforeEach (function(){
        spyOn(routerUtil,'warn')
    })

    it('sync', function(done) {
        test({
            a:{
                activate:function(transition) {
                    transition.next()
                }
            }
        },function(router, calls, emitter){
            router.go('/a')
            expect(router.routerView.children[0].content).toBe('a')
            assertCalls(calls, ['a.activate'])
            expect(routerUtil.warn).not.toHaveBeenCalled()
            done()
        })
    })

    it('sync (no arg)',function(done){
        test({
            a:{
                activate:function(){}
            }
        },function(router,calls,emitter){
            router.go('/a')
            expect(router.routerView.children[0].content).toBe('a')
            assertCalls(calls, ['a.activate'])
            expect(routerUtil.warn).not.toHaveBeenCalled()
            done()
        })
    })

    it('async',function(done){
        test({
            a:{
                activate:function(transition){
                    setTimeout(function(){
                        transition.next()
                    },wait)
                }
            }
        },function(router,calls,emitter){
            router.go('/a')
            expect(router.routerView.children.length).toBe(0)
            setTimeout(function(){
                assertCalls(calls,['a.activate'])
                expect(router.routerView.children[0].content).toBe('a')
                expect(routerUtil.warn).not.toHaveBeenCalled()
                done()
            },wait)
        })
    })

    it('abort sync',function(done){
        test({
            a:{
                activate:function(transition){
                    // abort should have no effect now
                    // it will be next
                    transition.abort()
                    transition.next()
                }
            }
        },function(router,calls,emitter){
            router.go('/a')
            assertCalls(calls, ['a.activate'])
            expect(router.routerView.children[0].content).toBe('a')
            expect(router._currentRoute.path).toBe('/a')
            expect(routerUtil.warn).not.toHaveBeenCalled()
            done()
        })
    })

    it('promise',function(done){
        test({
            a:{
                activate:function(transition){
                    return new Promise((resolve,reject)=>{
                        setTimeout(resolve,wait)
                    })
                }
            }
        },function(router,calls,emitter){
            router.go('/a')
            expect(router.routerView.children.length).toBe(0)
            setTimeout(function(){
                assertCalls(calls,['a.activate'])
                expect(router.routerView.children[0].content).toBe('a')
                expect(routerUtil.warn).not.toHaveBeenCalled()
                done()
            },wait*2)
        })
    })

    it('promise reject',function(done){
        test({
            a:{
                activate:function(transition){
                    return new Promise((resolve,reject)=>{
                        setTimeout(reject,wait)
                        
                    })
                }
            },
        },function(router,calls,emitter){
            router.go('/a')
            assertCalls(calls,['a.activate'])
            expect(router.routerView.children.length).toBe(0)
            expect(router._currentRoute.path).toBe('/a')
            setTimeout(function(){
                // should continue transition
                expect(router._currentRoute.path).toBe('/a')
                expect(router.routerView.children[0].content).toBe('a')
                expect(routerUtil.warn).not.toHaveBeenCalled()
                done()
            },wait*2)
        })
    })

    it('error', function(done){
        test({
            a:{
                activate:function(transition){
                    throw new Error('i throw an error')
                }
            }
        },function(router,calls,emitter){
            var errorThrown = jasmine.createSpy()
            try {
                router.go('/a')
            } catch (e) {
                errorThrown()
            }
            expect(routerUtil.warn).toHaveBeenCalled()
            expect(errorThrown).toHaveBeenCalled()
            // should continue transition
            expect(router._currentRoute.path).toBe('/a')
            expect(router.routerView.children[0].content).toBe('a')
            done()
        })
    })

})