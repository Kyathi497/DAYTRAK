import { jwtVerify, SignJWT } from "jose";


const SECRET = new TextEncoder().encode(process.env.JWT_SECRET!)

export async function signToken(payload:{id: string; email: string}) {
    return await new SignJWT(payload).setProtectedHeader({alg: 'HS256'}).setIssuedAt().setExpirationTime('7d').sign(SECRET)
}

export async function verifyToken(token:string) {
    try {
        const {payload} = await jwtVerify(token, SECRET)
        return payload as {id: string; email: string}
    } catch (error) {
        return null;
    }
}