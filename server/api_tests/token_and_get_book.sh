token="$(curl -X POST --data "username=test@email.com&password=password" http://127.0.0.1:9000/api/v1/login/ | python3 -c "import sys, json; print(json.load(sys.stdin)['token'])")"
curl -X GET http://127.0.0.1:9000/api/v1/book/1 -H "Authorization: JWT $token"
