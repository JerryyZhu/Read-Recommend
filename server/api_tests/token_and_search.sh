token="$(curl -X POST --data "username=test@email.com&password=password" http://127.0.0.1:9000/api/v1/login/ | python3 -c "import sys, json; print(json.load(sys.stdin)['token'])")"

echo "First search"
curl 'http://127.0.0.1:9000/api/v1/search/filter_by?mode=title&keyword=Harry&limit=10' -H "authorization: jwt $token"

echo "
Second search"
curl 'http://127.0.0.1:9000/api/v1/search/filter_by?mode=author&keyword=author7&limit=10' -H "authorization: jwt $token"

echo "
Third search"
curl 'http://127.0.0.1:9000/api/v1/search/filter_by?mode=recent&limit=10' -H "authorization: jwt $token"

echo "
garbage search"

curl 'http://127.0.0.1:9000/api/v1/search/filter_by?mode=title&keyword=nonexistent&limit=10' -H "authorization: jwt $token"

