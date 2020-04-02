import Vue from 'vue/dist/vue.js'
import axios from 'axios'

export var ArticleSection = Vue.component('article-section', {
    props: ['articles'],
    data: function () {
      return {
        message: 'Hello Vue!',
        allArticles: this.articles
      }
    },
    template: `
    <div>
        <h1>Articles</h1>
        {{ message }}
        <p v-for="(article, index) in allArticles" @click="markAsRead(article.pk, index)">{{ article.title }} {{ article.read }}</p>
    </div>
    `,
    methods: {
         async markAsRead(article_pk, index){
            var current_article_fields = Object.assign({}, this.allArticles[index]);
            current_article_fields.read = !current_article_fields.read
            
            const response = await axios.put(`http://localhost:8000/viewset/article/${article_pk}/`, current_article_fields)
            if(response.status === 200) {
                this.allArticles[index].read = current_article_fields.read
            }
        },
        async fetchAllArticles() {
            const response = await axios.get(`http://localhost:8000/viewset/article/`)
            if(response.status === 200) {
                this.allArticles = response.data.articles
            }
        }
    }
})