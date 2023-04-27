import json
import requests
from rest_framework.views import APIView
from rest_framework.response import Response

class PostsView(APIView):
    def get(self, request):
        test = 'test new'
        response = {}
        c_posts = requests.get('https://jsonplaceholder.typicode.com/posts')
        posts = json.loads(c_posts.__getattribute__('_content').decode())
        response['posts'] = posts

        c_users = requests.get('https://jsonplaceholder.typicode.com/users')
        users = json.loads(c_users.__getattribute__('_content').decode())
        response['users'] = users

        c_comments = requests.get('https://jsonplaceholder.typicode.com/comments')
        comments = json.loads(c_comments.__getattribute__('_content').decode())
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

        '''for i in range(len(posts_with_users)):
            for key in posts_with_users[i]:
                print(key, ': ', posts_with_users[i][key])'''

        return Response(json.dumps(response))
