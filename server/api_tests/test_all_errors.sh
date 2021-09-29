#make sure the backend returns some error codes
curl -X POST --data "first_name=first&last_name=last&email=test@email.com&password=password" http://127.0.0.1:9000/api/v1/user/register
token="$(curl -X POST --data "username=test@email.com&password=password" http://127.0.0.1:9000/api/v1/login/ | python3 -c "import sys, json; print(json.load(sys.stdin)['token'])")"
echo "Getting details on book 1"
curl -v -X GET http://127.0.0.1:9000/api/v1/book/5000 -H "Authorization: JWT $token"
echo "\nIncrementing the number of reads on book 1"
curl -v -X POST http://127.0.0.1:9000/api/v1/inc_book_reads/5000 -H "Authorization: JWT $token"
echo "\nCreating a review of book 1"
curl -v -X POST -d '{"book":1}'  http://127.0.0.1:9000/api/v1/create_or_edit_review -H "Authorization: JWT $token" -H "Content-Type: application/json"
echo "\nCreating a another review"
curl -v -X POST -d '{"rating": 1}'  http://127.0.0.1:9000/api/v1/create_or_edit_review -H "Authorization: JWT $token" -H "Content-Type: application/json"