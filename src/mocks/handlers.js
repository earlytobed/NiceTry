import { rest } from 'msw'

export const handlers = [
  rest.post('/api/token/', (req, res, ctx) => {
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
              "name": "User",
              "color": "#000000",
            },
            "uploaded": "1.14 ZB",
            "downloaded": "5.14 PB",
            "seedtime": 0,
            "leechtime": 0,
            "gender": 3,
            "email": "example@example.com",
          },
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

  rest.get('/api/profile/', (req, res, ctx) => {
    if (req.headers._headers.authorization === 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiYWRtaW4iLCJ1aWQiOjEsImV4cCI6MTY2OTU1MTA2Nn0.dC1an5cYKriJanZLU6nBDLv4aS836er1fIHcGuvb-U4') {
      return res(
        ctx.status(200),
        ctx.json({
          "username": "admin",
          "role": {
            "name": "User",
            "color": "#000000",
          },
          "uploaded": "1.14 ZB",
          "downloaded": "5.14 PB",
          "seedtime": 0,
          "leechtime": 0,
          "gender": 3,
          "email": "example@example.com",
        }),
      )
    } else {
      return res(
        ctx.status(422),
        ctx.json({
          "detail": "...",
        })
      )
    }
  }),

  rest.get('/api/category', (req, res, ctx) => {
    if (req.headers._headers.authorization === 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiYWRtaW4iLCJ1aWQiOjEsImV4cCI6MTY2OTU1MTA2Nn0.dC1an5cYKriJanZLU6nBDLv4aS836er1fIHcGuvb-U4') {
      return res(
        ctx.status(200),
        ctx.json({
          "code": 200,
          "data": [{
            "cid": 1,
            "name": "电影",
            "subcategory": [
              {
                "cid": 2,
                "name": "动作片",
                "subcategory": [
                  {
                    "cid": 4,
                    "name": "战争片",
                    "subcategory": [],
                    "template_id": 0
                  },
                  {
                    "cid": 5,
                    "name": "犯罪片",
                    "subcategory": [],
                    "template_id": 0
                  }
                ],
                "template_id": 0
              },
              {
                "cid": 3,
                "name": "喜剧片",
                "subcategory": [],
                "template_id": 0
              },
              {
                "cid": 6,
                "name": "爱情片",
                "subcategory": [],
                "template_id": 0
              }
            ],
            "template_id": 0
          },
          {
            "cid": 10,
            "name": "软件",
            "subcategory": [
              {
                "cid": 11,
                "name": "Windows",
                "subcategory": [],
                "template_id": 0
              },
              {
                "cid": 12,
                "name": "Windows",
                "subcategory": [],
                "template_id": 0
              }
            ],
            "template_id": 0
          },
          {
            "cid": 20,
            "name": "教育",
            "subcategory": [],
            "template_id": 1
          },
          {
            "cid": 21,
            "name": "学习",
            "subcategory": [],
            "template_id": 20
          }
          ],
          "detail": null
        }),
      )
    }
  }),

  rest.post('/api/torrent/upload_file', (req, res, ctx) => {
    if (req.headers._headers.authorization === 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiYWRtaW4iLCJ1aWQiOjEsImV4cCI6MTY2OTU1MTA2Nn0.dC1an5cYKriJanZLU6nBDLv4aS836er1fIHcGuvb-U4') {
      return res(
        ctx.status(200),
        ctx.json({
          "id": "string",
          "name": "Hao kang de",
          "exp": "2019-08-24T14:15:22Z",
          "size": "string",
          "files": [
            "string"
          ],
          "info_hash": "string",
          "nfo": true
        })
      )
    }
  }),

  rest.get('/api/faq', (req, res, ctx) => {
    if (req.headers._headers.authorization === 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiYWRtaW4iLCJ1aWQiOjEsImV4cCI6MTY2OTU1MTA2Nn0.dC1an5cYKriJanZLU6nBDLv4aS836er1fIHcGuvb-U4') {
      return res(
        ctx.status(200),
        ctx.json({
          "FAQ": '<div>Word of the Day</div><p class="text-h4 text--primary">be•nev•o•lent</p><p>adjective</p><div class="text--primary">well meaning and kindly.<br />"a benevolent smile"</div>'
        })
      )
    }
  }),
]
