Github-api-backend-app

This is a full flegde backend app where we are playing around data of Github api. One can search the user delete the user update the user.

================ Important Routes ================
api=http://localhost:8080/api/github/user/

POST API:{http://localhost:8080/api/github/user/add/:username (username name will be provided by user as param) This api will allow you to search github user data will automatically saved into database}

GET API:{http://localhost:8080/api/github/user/alldata (gives all data from database), http://localhost:8080/api/github/user/alldata?username="" (while passing username as query get data of specific user eg:?username=sudhir410 ),http://localhost:8080/api/github/user/alldata?location=""(while passing location as query get all data of specific location eg:?location=pune ),http://localhost:8080/api/github/user/alldata?sortby=''(while passing sortby as query get will get sorted data eg:?sortby=followers ) }

GET API:{http://localhost:8080/api/github/user/friend/:username (while passing username as params gives all friends list of specific user )}

PATCH API:{http://localhost:8080/api/github/user/update/:username (while passing usename as params and data in BODY will update specific user from database )}

DELETE API:{http://localhost:8080/api/github/user/delete/:username (while passing username as params will delete specific user from database )}
