import { rest } from 'msw'

export const handlers = [
  rest.post('http://localhost:8080/api/token/', (req, res, ctx) => {
    if (req.body.username === 'admin' && req.body.password === 'admin') {
      return res(
        ctx.status(200),
        ctx.json({
          "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiYWRtaW4iLCJ1aWQiOjEsImV4cCI6MTY2OTU1MTA2Nn0.dC1an5cYKriJanZLU6nBDLv4aS836er1fIHcGuvb-U4",
          "token_type": "bearer",
          "userid": 1,
          "user": {
            "username": "admin",
            "role": {
              "name": "User", "color": "#000000"
            },
            "uploaded": "1.14 ZB",
            "downloaded": "5.14 PB",
            "seedtime": 0,
            "leechtime": 0,
            "gender": 3,
            "email": "example@example.com"
          }
        }),
      )
    } else {
      return res(
        ctx.status(401),
        ctx.json({
          "detail": "User doesn't exist or password is wrong.",
        })
      )
    }
  }),
]
