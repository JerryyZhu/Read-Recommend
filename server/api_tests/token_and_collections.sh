#!/bin/bash
api_url="http://localhost:9000"

#curl -X POST --data "first_name=first&last_name=last&email=test@email.com&password=password" $api_url/api/v1/user/register
token="$(curl -X POST --data "username=test0@email.com&password=password" $api_url/api/v1/login/ | python3 -c "import sys, json; print(json.load(sys.stdin)['token'])")"
echo $token

while true; do
echo "Test Options
1. TEST ALL
2. Test Make Collection
3. Test Getby ID
4. Test Add Book
5. Test Delete Book
6. Test Delete 
7. test Get All
8. Test Edit COllection details
Enter your choice: "
read choice

if [[ $choice =~ [12] ]]; then
echo "make collection"
echo "collection name"
read name
echo "description"
read desc
curl -X post -d '{"name": "'$name'", "description": "'$desc'", "action": "create"}'  $api_url/api/v1/collection/modify_collection -H "authorization: jwt $token" -H "content-type: application/json"

elif [[ $choice =~ [13] ]]; then
echo "Get by id"
echo "Collection id"
read c
curl -X GET $api_url/api/v1/collection/get?collection_id=$c -H "Authorization: JWT $token"

elif [[ $choice =~ [14] ]]; then
echo "add book"
echo "collection_id"
read c
echo "book_id"
read b

curl -X POST -d '{"book_id": '$b', "collection_id": '$c', "action": "add"}'  $api_url/api/v1/collection/modify_book -H "authorization: jwt $token" -H "content-type: application/json"
curl -X GET $api_url/api/v1/collection/get?collection_id=$c -H "Authorization: JWT $token"

elif [[ $choice =~ [15] ]]; then
echo "Delete book"
echo "collection_id"
read c
echo "book_id"
read b
curl -X POST -d '{"book_id": '$b', "collection_id": '$c', "action": "remove"}'  $api_url/api/v1/collection/modify_book -H "authorization: jwt $token" -H "content-type: application/json"
curl -X GET $api_url/api/v1/collection/get?collection_id=$c -H "Authorization: JWT $token"

elif [[ $choice =~ [16] ]]; then
echo "Delete Collection"
echo "collection_id"
read c
curl -X POST -d '{"collection_id": '$c', "action": "delete"}'  $api_url/api/v1/collection/modify_collection -H "authorization: jwt $token" -H "content-type: application/json"
curl -X GET $api_url/api/v1/collection/get_all_ids -H "Authorization: JWT $token"

elif [[ $choice =~ [17] ]]; then
echo "Test get All"
curl -X GET $api_url/api/v1/collection/get_all_ids -H "Authorization: JWT $token"

elif [[ $choice =~ [18] ]]; then
echo "edit"
echo "id"
read c
echo "collection name"
read name
echo "description"
read desc
curl -X post -d '{"collection_id": '$c', "name": "'$name'", "description": "'$desc'", "action": "modify"}'  $api_url/api/v1/collection/modify_collection -H "authorization: jwt $token" -H "content-type: application/json"

else
exit

fi

done