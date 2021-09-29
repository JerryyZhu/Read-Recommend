#!/bin/bash
api_url="http://localhost:9000"

#curl -X POST --data "first_name=first&last_name=last&email=test@email.com&password=password" $api_url/api/v1/user/register
token="$(curl -X POST --data "username=test0@email.com&password=password" $api_url/api/v1/login/ | python3 -c "import sys, json; print(json.load(sys.stdin)['token'])")"
echo $token

while true; do
echo "Test Options
0. Create or edit
1. Delete
2. Get
Enter your choice: "
read choice

if [[ $choice == 0 ]]; then
echo "Create or edit"
echo "origin"
read origin
echo "target"
read target
echo "reason"
read reason

curl -X post -d '{"origin": '$origin', "target": '$target', "reason": "'$reason'"}'  $api_url/api/v1/recommendation/create_or_edit -H "authorization: jwt $token" -H "content-type: application/json"

elif [[ $choice == 1 ]]; then
echo "Delete"
echo "origin"
read origin

curl -X post -d '{"origin": '$origin'}'  $api_url/api/v1/recommendation/delete -H "authorization: jwt $token" -H "content-type: application/json"

elif [[ $choice == 2 ]]; then
echo "Get"
echo "book"
read book

curl -X get $api_url/api/v1/recommendation/get/$book -H "authorization: jwt $token"


else
exit

fi

done