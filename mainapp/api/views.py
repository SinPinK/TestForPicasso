import json
import requests
from rest_framework.views import APIView
from rest_framework.response import Response


class PostsView(APIView):
    # метод для формирования items для Select'a
    def do_user_items(self, list):
        items = [
            {
                'label': '-//-',
                'id': 0,
                'disabled': False
            }
        ]
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

        #posts_with_username = []
        for i in range(len(posts)):
            for j in range(len(users)):
                if posts[i]['userId'] == users[j]['id']:
                    posts[i]['username'] = users[j]['name']
                    posts[i]['email'] = users[j]['email']

        user_items = a.do_user_items(users)
        response['user_items'] = user_items

        users_with_posts = []
        for i in range(len(users)):
            users_post = []
            for j in range(len(posts)):
                if users[i]['id'] == posts[j]['userId']:
                    users_post.append(posts[j])
            user_posts = {
                'user': users[i],
                'posts': users_post
            }
            users_with_posts.append(user_posts)

        response['users_with_posts'] = users_with_posts

        '''for i in range(len(user_items)):
            for key in user_items[i]:
                print(key, ': ', user_items[i][key])'''


        '''for i in range(len(posts_with_users)):
            for key in posts_with_users[i]:
                print(key, ': ', posts_with_users[i][key])'''

        return Response(json.dumps(response))

    def post(self, request):
        a = PostsView()
        id_req = ''
        for key in request.data:
            id_req = key
            print(id_req)

        id = id_req
        print(id)
        posts_comments = a.request_json('posts/' + str(id) + '/comments')
        #print(posts_comments)
        post = a.request_json('posts/' + str(id))
        #print(post)
        author = a.request_json('users/' + str(post['userId']))
        #print(author)
        response = {
            'post': post,
            'author': author,
            'comments': posts_comments,
            'comments_count': len(posts_comments)
        }

        test = 'test'
        return Response(json.dumps(response))
