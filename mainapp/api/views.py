import json
from rest_framework.views import APIView
from rest_framework.response import Response

class Test(APIView):
    def get(self, request):
        test = 'test new'
        return Response(json.dumps(test))