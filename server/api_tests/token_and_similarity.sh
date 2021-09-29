token="$(curl -X POST --data "username=test0@email.com&password=password" http://127.0.0.1:9000/api/v1/login/ | python3 -c "import sys, json; print(json.load(sys.stdin)['token'])")"

curl 'http://127.0.0.1:9000/api/v1/search/find_similar?bookId=1&keys=popularity' -H "authorization: jwt $token"