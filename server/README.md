# Backend Docs
## API Testing Commands
__Recommended__ to use the DRF UI to test endpoints. `http://localhost:<port>/<endpoint>`

You can also find some curl scripts in the server/api_tests folder

__/api/v1/user/login__
supply HTTP auth username and password, returns a web token

## Default Parameter Notes
__Admin/Superuser__ - default should be admin/securepassword!@#
`python manage.py createsuperuser`

## Viewing and editing the database
If you navigate to `http://localhost:<port>/admin` and enter the superuser details above, you can view/add/edit the contents of the database with a nice interface