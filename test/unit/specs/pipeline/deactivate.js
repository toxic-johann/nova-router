import {test, assertCalls} from '../../lib/pipeline-test-util.js'
import * as routerUtil from '../../../../src/util.js'

describe('deactivate', function () {
    beforeEach (function(){
        spyOn(routerUtil,'warn')
    })

    it('sync', function(done) {
        test({
            a:{
                deactivate:function(transition) {
                    transition.next()
                }
            }
        },function(router, calls, emitter){
            router.go('/a')
            expect(router.routerView.children[0].content).toBe('a')
            router.go('/b')
            expect(router.routerView.children.length).toBe(0)
            assertCalls(calls, ['a.deactivate'])
            expect(routerUtil.warn).not.toHaveBeenCalled()
            done()
        })
    })

    it('sync (no arg)',function(done){
        test({
            a:{
                deactivate:function(){}
            }
        },function(router,calls,emitter){
            router.go('/a')
            expect(router.routerView.children[0].content).toBe('a')
            router.go('/b')
            expect(router.routerView.children.length).toBe(0)
            assertCalls(calls, ['a.deactivate'])
            expect(routerUtil.warn).not.toHaveBeenCalled()
            done()
        })
    })

    it('async',function(done){
        test({
            a:{
                deactivate:function(transition){
                    setTimeout(function(){
                        transition.next()
                    },wait)
                }
            }
        },function(router,calls,emitter){
            router.go('/a')
            expect(router.routerView.children[0].content).toBe('a')
            router.go('/b')
            expect(router.routerView.children[0].content).toBe('a')
            setTimeout(function(){
                assertCalls(calls,['a.deactivate'])
                expect(router.routerView.children.length).toBe(0)
                expect(routerUtil.warn).not.toHaveBeenCalled()
                done()
            },wait)
        })
    })

    it('abort sync',function(done){
        test({
            a:{
                deactivate:function(transition){
                    // abort should have no effect now
                    // it will be next
                    transition.abort()
                    transition.next()
                }
            }
        },function(router,calls,emitter){
            router.go('/a')
            expect(router.routerView.children[0].content).toBe('a')
            router.go('/b')
            expect(router.routerView.children.length).toBe(0)
            assertCalls(calls, ['a.deactivate'])
            expect(routerUtil.warn).not.toHaveBeenCalled()
            done()
        })
    })

    it('promise',function(done){
        test({
            a:{
                deactivate:function(transition){
                    return new Promise((resolve,reject)=>{
                        setTimeout(resolve,wait)
                    })
                }
            }
        },function(router,calls,emitter){
            router.go('/a')
            expect(router.routerView.children[0].content).toBe('a')
            expect(router._currentRoute.path).toBe('/a')
            router.go('/b')
            expect(router.routerView.children[0].content).toBe('a')
            expect(router._currentRoute.path).toBe('/b')
            setTimeout(function(){
                assertCalls(calls,['a.deactivate'])
                expect(router.routerView.children.length).toBe(0)
                expect(routerUtil.warn).not.toHaveBeenCalled()
                done()
            },wait*2)
        })
    })

    it('promise reject',function(done){
        test({
            a:{
                deactivate:function(transition){
                    return new Promise((resolve,reject)=>{
                        setTimeout(reject,wait)
                        
                    })
                }
            },
        },function(router,calls,emitter){
            router.go('/a')
            expect(router.routerView.children[0].content).toBe('a')
            expect(router._currentRoute.path).toBe('/a')
            router.go('/b')
            expect(router.routerView.children[0].content).toBe('a')
            expect(router._currentRoute.path).toBe('/b')
            setTimeout(function(){
                assertCalls(calls,['a.deactivate'])
                expect(router.routerView.children.length).toBe(0)
                expect(routerUtil.warn).not.toHaveBeenCalled()
                done()
            },wait*2)
        })
    })

    it('error', function(done){
        test({
            a:{
                deactivate:function(transition){
                    throw new Error('i throw an error')
                }
            }
        },function(router,calls,emitter){
            var errorThrown = jasmine.createSpy()
            router.go('/a')
            expect(router.routerView.children[0].content).toBe('a')
            expect(router._currentRoute.path).toBe('/a')
            try {
                router.go('/b')
            } catch (e) {
                errorThrown()
            }
            expect(router._currentRoute.path).toBe('/b')
            assertCalls(calls,['a.deactivate'])
            expect(router.routerView.children.length).toBe(0)
            expect(routerUtil.warn).toHaveBeenCalled()
            done()
        })
    })

})