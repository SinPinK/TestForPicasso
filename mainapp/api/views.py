import json
import requests
from rest_framework.views import APIView
from rest_framework.response import Response


class PostsView(APIView):
    # метод для формирования items для Select'a
    def do_user_items(self, list):
        items = []
        for i in range(len(list)):
            item = {
                'label': list[i]['name'],
                'id': list[i]['id'],
                'disabled': False
            }
            items.append(item)
        return items

    # метод для запроса API
    def request_json(self, req):
        c = requests.get('https://jsonplaceholder.typicode.com/' + req)
        content = json.loads(c.__getattribute__('_content').decode())
        return content

    def get(self, request):
        a = PostsView()
        posts = a.request_json('posts')
        users = a.request_json('users')
        comments = a.request_json('comments')

        response = {}
        response['posts'] = posts
        response['users'] = users
        response['comments'] = comments

        '''for i in range(len(response['users'])):
            print(i)
            for key in response['users'][i]:
                print(key, ': ', response['users'][i][key])'''

        posts_with_users = []
        for i in range(len(posts)):
            for j in range(len(users)):
                if posts[i]['userId'] == users[j]['id']:
                    post = {
                        'post': posts[i],
                        'user': users[j]
                    }
                    posts_with_users.append(post)

        user_items = a.do_user_items(users)
        response['user_items'] = user_items
        '''for i in range(len(user_items)):
            for key in user_items[i]:
                print(key, ': ', user_items[i][key])'''


        '''for i in range(len(posts_with_users)):
            for key in posts_with_users[i]:
                print(key, ': ', posts_with_users[i][key])'''

        return Response(json.dumps(response))
