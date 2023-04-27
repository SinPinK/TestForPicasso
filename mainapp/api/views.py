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

        '''for i in range(len(response['posts'])):
            print(i)
            for key in response['posts'][i]:
                print(key, ': ', response['posts'][i][key])'''

        return Response(json.dumps(response))

    def post(self, request):

        return 'ok'