[![Open in Visual Studio Code](https://classroom.github.com/assets/open-in-vscode-718a45dd9cf7e7f842a935f5ebbe5719a5e09af4491e668f4dbf3b35d5cca122.svg)](https://classroom.github.com/online_ide?assignment_repo_id=15255689&assignment_repo_type=AssignmentRepo)

# Individual Project Phase 2

1. POST/Register
   Request

- body
  {
  "fullName": "string",
  "username":"string",
  "gender": "string",
  "dob": "date",
  "email": "string",
  "password": "string",
  "imgUrl": "string"
  }
  Response (201-Created)
  {
  "message": "Success Register",
  "id": integer,
  "email": "string"
  }
  Response (400-Bad Request)
  {
  "message": "Email mustbe filled"
  }
  {
  "message": "Email must be unique"
  }
  {
  "message": "Invalid email format"
  }
  {
  "message": "Password must be filled"
  }
  {
  "message": "Full Name must be filled"
  }
  {
  "message": "Gender must be filled"
  }
  {
  "message": "DoB must be filled"
  }
  Response (401-Unauthorized)
  {
  "message": "Please login first"
  }
  Response (403-Forbidden)
  {
  "message": "you dont haveany access"
  }

---

2. POST/Login
   Request

- body
  {
  "email": "string",
  "passwoord": "string",
  }
  Response (200 - OK)
  {
  "token": "string",
  "email": "string",
  }
  Response (401)
  {
  "message": "Invalid email or password"
  }
  Response (404-NotFound)
  {
  "message": "Data not found"
  }

---

3. GET/google-login
   Request

- body
  {
  "fullName": "string",
  "username":"string",
  "gender": "string",
  "dob": "date",
  "email": "string",
  "password": "string",
  "imgUrl": "string"
  }

  Response (200 - OK)
  {
  access_token: "string"
  }
  Response (401)
  {
  "message": "Invalid email or password"
  }

---

4. POST/my-trips
   Request
- headers:
{
  "Authorization": "Bearer <access_token>"
}
- body
  {
  "userId": "integer",
  "locations": "JSON",
  "tripName": "string"
  }
  Response (201 - OK)
  {
  "message": "success save trip",
  }
  {
  userId: integer
  tripName: "string"
  locations: [
    name: "string"
    description: "string"
    coordinates: {
      latitude: "string"
      longitude: "string"
    }
  ]
  }
  Response (401-Unauthorized)
  {
  "message": "Please login first"
  }
  Response (403-Forbidden)
  {
  "message": "you dont haveany access"
  }

---

5. GET/tripList
Request
- headers:
{
  "Authorization": "Bearer <access_token>"
}
Response (200 - OK)
  {
  "message": "success save trip",
  {
  userId: integer
  tripName: "string"
  locations: [
    name: "string"
    description: "string"
    coordinates: {
      latitude: "string"
      longitude: "string"
    }
    ]
  }
  }

  -

6. POST/api/recommendations
Request
- headers:
{
  "Authorization": "Bearer <access_token>"
}
- body
  {
  "destination": "string",
  "startDate":"string",
  "endDate": "string",
  "maxPrice": "integer",
  "tripName": "string",
  }
Response (200 - OK)
  {
  "message": "success save trip",
  {
  tripName: "string"
  locations: [
    name: "string"
    description: "string"
    coordinates: {
      latitude: "string"
      longitude: "string"
    }
  ]
  }
  }

