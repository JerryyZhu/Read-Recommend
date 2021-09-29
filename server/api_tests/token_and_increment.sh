token="$(curl -X POST --data "username=test0@email.com&password=password" http://127.0.0.1:9000/api/v1/login/ | python3 -c "import sys, json; print(json.load(sys.stdin)['token'])")"
curl -X post -d '{"action": "add", "collection_id": "read", "book_id": "1"}'  http://127.0.0.1:9000/api/v1/collection/modify_book -H "authorization: jwt $token" -H "content-type: application/json"

echo "press anything to decrement now"
read line
curl -X post -d '{"action": "remove", "collection_id": "read", "book_id": "1"}'  http://127.0.0.1:9000/api/v1/collection/modify_book -H "authorization: jwt $token" -H "content-type: application/json"
