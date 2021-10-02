import jwt from 'jsonwebtoken'

export const handler = async (event) => {
  const body = JSON.parse(event.body)

  if (body.API_KEY === process.env.API_KEY) {
    return {
      statusCode: 200,
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        'auth-type': 'custom',
        token: jwt.sign(
          { id: body.id, type: 'custom' },
          process.env.CUSTOM_AUTH_SECRET
        ),
      }),
    }
  }

  return {
    statusCode: 401,
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      message: 'You are not authorized',
    }),
  }
}
