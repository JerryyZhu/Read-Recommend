#!/bin/bash
api_url="http://localhost:9000"

#curl -X POST --data "first_name=first&last_name=last&email=test@email.com&password=password" $api_url/api/v1/user/register
token="$(curl -X POST --data "username=test0@email.com&password=password" $api_url/api/v1/login/ | python3 -c "import sys, json; print(json.load(sys.stdin)['token'])")"
echo $token

while true; do
echo "Test Options
0. Create
1. Get all
2. Get books
3. Mark book as read
4. Get books in current challenge
Enter your choice: "
read choice

if [[ $choice == 0 ]]; then
echo "Create"
echo "target"
read target

curl -X post -d '{"target": '$target'}'  $api_url/api/v1/challenge/create -H "authorization: jwt $token" -H "content-type: application/json"

elif [[ $choice == 1 ]]; then
echo "Get all"

curl -X get  $api_url/api/v1/challenge/get_all -H "authorization: jwt $token"

elif [[ $choice == 2 ]]; then
echo "Get books"
echo "date"
read date

curl -X get $api_url/api/v1/challenge/get_books/$date -H "authorization: jwt $token"

elif [[ $choice == 3 ]]; then
echo "Mark book as read"
echo "book_id"
read book

curl -X POST -d '{"book_id": '$book', "collection_id": "read", "action": "add"}'  $api_url/api/v1/collection/modify_book -H "authorization: jwt $token" -H "content-type: application/json"

elif [[ $choice == 4 ]]; then
echo "Get books in current challenge"

curl -X get $api_url/api/v1/challenge/get_books -H "authorization: jwt $token"

else
exit

fi

done