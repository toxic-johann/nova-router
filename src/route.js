const internalKeysRegExp = /^(component|subRoutes|fullPath)$/
export default class Route {
    constructor (path,router){
        const matched = router._recognizer.recognize(path)
        if(matched) {
            [].forEach.call(matched,match=>{
                for(let key in match.handler){
                    if(!internalKeysRegExp.test(key)) {
                        this[key] = match.handler[key]
                    }
                }
            })
            // set query and params
            this.query = matched.queryParams
            this.params = [].reduce.call(matched, (prev,cur)=>{
                if(cur.params){
                    for (let key in cur.params){
                        prev[key] =  cur.params[key]
                    }
                }
                return prev
            },{})
        }

        this.path = path
        // set some property for internal use
        this.matched = matched || router._notFoundHandler
        Object.defineProperty(this, 'router', {
            enumeralbe:false,
            value:router
        })
        Object.freeze(this)
    }
}