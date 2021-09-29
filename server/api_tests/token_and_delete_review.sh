token="$(curl -X POST --data "username=test@email.com&password=password" http://127.0.0.1:9000/api/v1/login/ | python3 -c "import sys, json; print(json.load(sys.stdin)['token'])")"
curl -X POST -d '{"book":1}'  http://127.0.0.1:9000/api/v1/delete_review -H "Authorization: JWT $token" -H "Content-Type: application/json"
