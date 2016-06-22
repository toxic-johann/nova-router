import {test, assertCalls} from '../../lib/pipeline-test-util.js'
import * as routerUtil from '../../../../src/util.js'

describe('canReuse',function () {
    beforeEach (function(){
        spyOn(routerUtil,'warn')
    })

    it('allow',function (done) {
        test({
            a:{
                canReuse: true,
                activate:function(transition){
                    // just for loggin
                    transition.next()
                }
            }
        },function(router, calls){
            router.go('/a/b')
            expect(router.routerView.children[0].content + router.routerView.children[0].children[0].content).toBe('ab')
            assertCalls(calls, ['a.activate'])
            let a = router.routerView.children[0]
            router.go('/a/e')
            assertCalls(calls, ['a.activate', 'a.canReuse'])
            expect(router.routerView.children[0].content + router.routerView.children[0].children[0].content).toBe('ae')
            expect(router.routerView.children[0]).toBe(a)
            done()
        })
    })

    it('not set',function (done) {
        test({
            a:{
                canReuse: '',
                activate:function(transition){
                    // just for loggin
                    transition.next()
                }
            }
        },function(router, calls){
            router.go('/a/b')
            expect(router.routerView.children[0].content + router.routerView.children[0].children[0].content).toBe('ab')
            assertCalls(calls, ['a.activate'])
            let a = router.routerView.children[0]
            router.go('/a/e')
            assertCalls(calls, ['a.activate', 'a.canReuse'])
            expect(router.routerView.children[0].content + router.routerView.children[0].children[0].content).toBe('ae')
            expect(router.routerView.children[0]).toBe(a)
            done()
        })
    })

    it('deny',function (done) {
        test({
            a:{
                canReuse: false,
                activate:function(transition){
                    // just for loggin
                    transition.next()
                }
            }
        },function(router, calls){
            router.go('/a/b')
            expect(router.routerView.children[0].content + router.routerView.children[0].children[0].content).toBe('ab')
            // assertCalls(calls, ['a.activate'])
            let a = router.routerView.children[0]
            router.go('/a/e')
            assertCalls(calls, ['a.activate', 'a.canReuse','a.activate'])
            expect(router.routerView.children[0].content + router.routerView.children[0].children[0].content).toBe('ae')
            // actually though i detach and attach
            // it still that component
            expect(router.routerView.children[0]).toBe(a)
            done()
        })
    })

    it('function allow',function (done) {
        test({
            a:{
                canReuse: function(){
                    return true
                },
                activate:function(transition){
                    // just for loggin
                    transition.next()
                }
            }
        },function(router, calls){
            router.go('/a/b')
            expect(router.routerView.children[0].content + router.routerView.children[0].children[0].content).toBe('ab')
            assertCalls(calls, ['a.activate'])
            let a = router.routerView.children[0]
            router.go('/a/e')
            assertCalls(calls, ['a.activate', 'a.canReuse'])
            expect(router.routerView.children[0].content + router.routerView.children[0].children[0].content).toBe('ae')
            expect(router.routerView.children[0]).toBe(a)
            done()
        })
    })

    it('function deny',function (done) {
        test({
            a:{
                canReuse: function(){
                    return false
                },
                activate:function(transition){
                    // just for loggin
                    transition.next()
                }
            }
        },function(router, calls){
            router.go('/a/b')
            expect(router.routerView.children[0].content + router.routerView.children[0].children[0].content).toBe('ab')
            // assertCalls(calls, ['a.activate'])
            let a = router.routerView.children[0]
            router.go('/a/e')
            assertCalls(calls, ['a.activate', 'a.canReuse','a.activate'])
            expect(router.routerView.children[0].content + router.routerView.children[0].children[0].content).toBe('ae')
            // actually though i detach and attach
            // it still that component
            expect(router.routerView.children[0]).toBe(a)
            done()
        })
    })
});