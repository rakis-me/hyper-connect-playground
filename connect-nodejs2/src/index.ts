import fetch from 'node-fetch'
import { SignJWT } from 'jose'

export async function fork (url : string, options?: any) {
  const crypto = await import("crypto");
  const key = crypto.createSecretKey('foobar', 'utf-8');
  const token = await new SignJWT({'sub': '1234'})
    .setProtectedHeader({ alg: "HS256" })
    .setExpirationTime("10m")

    .sign(key)

  return fetch(url, {
    headers: {
      authorization: `Bearer ${token}`
    }
  })
}