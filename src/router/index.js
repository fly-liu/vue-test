import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import Video from '@/components/VideoDemo'
import KingsMap from '@/components/KingsMap'

Vue.use(Router)

export default new Router({
    mode: 'history',
    routes: [{
            path: '/',
            component: HelloWorld
        },
        {
            path: '/hello',
            component: HelloWorld
        },
        {
            path: '/video',
            component: Video
        },
        {
            path: '/kings',
            component: KingsMap
        },
    ]
})