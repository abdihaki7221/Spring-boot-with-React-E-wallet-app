this registration endpoint : localhost:9090/auth/api/register

returns the jwt token of sample : {
    "token": "eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJtb2hhejU0ZUBnbWFpbC5jb20iLCJpYXQiOjE2ODYxMzk4OTQsImV4cCI6MTY4NjE0MDAxNH0.H1qadEWayVqRRgKtz0v3ko6iNHFBxeblV3sTRwoPYEc"
}

the login endpoint localhost:9090/auth/api/login also returns like : {
    "token": "eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJtb2hhejU0ZUBnbWFpbC5jb20iLCJpYXQiOjE2ODYxNDAyNDUsImV4cCI6MTY4NjE0MDM2NX0.6zA2CZjzfPeNpGT3BAxNeRDGMN1u3fMXp0JXHq8BS4c"
} 

i have react client side using tsx. it has registration and login form. i also have a home a react page that is the dashboard. 

this are question:
 1: is there way you can use the info above to authorize the user.
  2. the home dashboard knows which user is logged by displaying hello username
 3. if the user session is on, he is directed to the dashboard without logging in again
 4. if the user session is out , he cannot access the home page, he is redirected to home page
 