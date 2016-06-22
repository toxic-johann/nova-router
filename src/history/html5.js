import {resolvePath} from '../util.js'
const hashRegExp = /#.*$/

export default class HTML5History {
    constructor ({root,onChange}) {
        if(root && root !== '/'){
            // make sure the startting
            if(root.charAt(0) !== '/'){
                root = '/' + root
            }
            // remove trailing
            this.root = root.replace(/\/$/,'')
            this.rootRegExp = new RegExp('^\\'+this.root)
        } else {
            this.root = null
        }
        this.onChange = onChange
        // check the base
        const baseEl = document.querySelector('base')
        this.base = baseEl && baseEl.getAttribute('href')
    }

    start () {
        this.listener = e => {
            let url = location.pathname + location.search
            if (this.root) {
                url = url.replace(this.rootRegExp,'') || '/'
            }
            this.onChange(url, e && e.state, location.hash)
        }
        window.addEventListener('popstate', this.listener)
        this.listener()
    }

    stop () {
        window.removeEventListener('popstate', this.listener)
    }

    go (path, replace, append) {
        const url = this.formatPath(path, append)
        if (replace) {
            history.replaceState({}, '', url)
        } else {
            // record scroll position by replacing current state
            history.replaceState({
                pos: {
                    x:window.pageXOffset,
                    y:window.pageYOffset,
                }
            },'',location.href)
            // then push new state
            history.pushState({}, '', url)
        }

        const hashMatch = path.match(hashRegExp)
        const hash = hashMatch && hashMatch[0]
        path = url
            // strip hash so it doesn't mess up params
            .replace(hashRegExp, '')
            // remove root before matching
            .replace(this.rootRegExp, '')
        this.onChange(path, null, hash)
    }

    formatPath (path, append) {
        return path.charAt(0) === '/'
            ? this.root
                ? this.root +'/' + path.replace(/^\//,'')
                : path
            : resolvePath(this.base || location.pathname, path, append)
    }
}