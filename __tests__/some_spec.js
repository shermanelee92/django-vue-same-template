import { ArticleSection } from '../static/ArticleSection'
import { mount } from '@vue/test-utils'
import moxios from 'moxios'
import Axios from 'axios'

// Now mount the component and you have the wrapper
jest.mock("axios", () => ({
  put: (_url, _body) => { 
    return new Promise((resolve) => {
      resolve({status: 200})
    })
  },
  get: () => {
    return new Promise((resolve) => {
      resolve({status: 200, data: { articles: [] }})
    })
  }
}))

describe('testing ArticleSection', () => {
  const wrapper = mount(ArticleSection)
  
  const articlesArray = [
    {"pk": 1, "title": "aaawwwa2222", "author": "changed author", "read": true, "email": "awdawd@awfawf.com"}, 
    {"pk": 2, "title": "aaaa", "author": "changed author", "read": true, "email": "awda2wd@awfawf.com"}, 
    {"pk": 3, "title": "aaaa", "author": "changed author", "read": true, "email": "2222@afawf.com"}
   ] 

  wrapper.setData({ allArticles: articlesArray});
  
  //testing number of elements
  it('has the correct number of article rows', () => {
    expect(wrapper.findAll('p')).toHaveLength(3)
  })

  //testing for axios
  it('markAsRead', async () => {
    const expectValue = articlesArray[0].title + ' false'

    await wrapper.vm.markAsRead(1,0)
    expect(wrapper.find('p').text()).toEqual(expectValue)

  })

  it('method is called', () => {
    wrapper.vm.markAsRead  = jest.fn();
    wrapper.find('p').trigger('click')
    
    expect(wrapper.vm.markAsRead).toHaveBeenCalled();
  });

  it('fetchAllArticles', async () => {
    await wrapper.vm.fetchAllArticles()
    expect(wrapper.contains('p')).toBe(false)
  })
});

