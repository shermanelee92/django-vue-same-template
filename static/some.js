import Vue from 'vue/dist/vue.js'
import ArticleSection from './ArticleSection'

export var app = new Vue({
    el: '#app',
    data: {
        articles: articles_json
    },
    template: `
    <div>
        <article-section :articles='articles'></article-section>
    </div>
    `,
})

