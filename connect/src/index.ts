import fetch from 'node-fetch'
import { SignJWT } from 'jose'
import crypto from 'crypto'
import { assoc } from 'ramda'

export async function fork (url : string, options?: any) {
  const key = crypto.createSecretKey('foobar', 'utf-8');
  const token = await new SignJWT({'sub': '1234'})
    .setProtectedHeader({ alg: "HS256" })
    .setExpirationTime("10m")

    .sign(key)

  const headers = assoc('authorization', `Bearer ${token}`, {})

  return fetch(url, {headers})
  
}