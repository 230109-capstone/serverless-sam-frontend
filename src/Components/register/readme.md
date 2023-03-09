# Register Component
Request
- HTTP Method
    - Post
- URL
    - /register
- Headers
    - Content-Type: application/json
- Body
    ```json
    {
        "username": "username1",
        "password": "password1!",
    }
    ```

Response Scenarios

1. Successful Registragion
- Status Code
    - 200 Successful
- Body
    ```json
    {
        "message": "User Successfully Registered"
    }
    ```
- Headers
    - Content-Type: application/json

2. Unsuccessful registration because username is too short
- Status Code
    - 400 Bad Request
- Body
    ```json
    {
        "errors": "Username must be between 8 and 20 (inclusive)"
    }
    ```
- Headers
    - Content-Type: application/json

3. Unsuccessful registration because password is too short
- Status Code
    - 400 Bad Request
- Body
    ```json
    {
        "errors": "Password must be between 8 and 20 (inclusive)"
    }
    ```
- Headers
    - Content-Type: application/json

4. Unsuccessful registration because password does not contain special character
- Status Code
    - 400 Bad Request
- Body
    ```json
    {
        "errors": "Password must contain a special character"
    }
    ```
- Headers
    - Content-Type: application/json

5. Unsuccessful registration no input for username
- Status Code
    - 500 Internal Server Error
- Body
    ```json
    {
        "errors": "Username and/or password not provided"
    }
    ```
- Headers
    - Content-Type: application/json

6. Unsuccessful registration no input for password
- Status Code
    - 500 Internal Server Error
- Body
    ```json
    {
        "errors": "Username and/or password not provided"
    }
    ```
- Headers
    - Content-Type: application/json

7. Unsuccessful registration due to unknown error
- Status Code
    - 500 Internal Server Error
- Body
    ```json
    {
        "errors": [err.message]
    }
    ```
- Headers
    - Content-Type: application/json


## Functions
### registerSubmit

```typescript
    async function registerSubmit() {
        const response = await axios.post(remoteUrl + '/users', data, config);
        try{
            if (response.status === 200) {
              alert('Successfully Registered');
              navigate('/');
          }
        }catch(error) {
            alert(error);
          };
        };
```
- Description
    - Function called within a mounted component to take in the data passed in from the register page and await a response from the serverless backend.
- Parameters
    - There are no parameters input directly into the function but data takes the state of username and password of the page and the default configurations we set for the request to send in the post.
- What the function returns
    - It will display an alert message that the registration was successful and navigate to the login page so the user can access the rest of the application with their credentials, otherwise the alert will display an error.