#!/bin/bash
api_url="http://localhost:9000"

#curl -X POST --data "first_name=first&last_name=last&email=test@email.com&password=password" $api_url/api/v1/user/register
token="$(curl -X POST --data "username=test0@email.com&password=password" $api_url/api/v1/login/ | python3 -c "import sys, json; print(json.load(sys.stdin)['token'])")"
echo $token

while true; do
echo "Test Options
1. 
Enter your choice: "
read choice

if [[ $choice == 0 ]]; then

curl $api_url/api/v1/smart_recommendations/1 -H "authorization: jwt $token"

else
exit

fi

done