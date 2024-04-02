export default async function findHash(pass:string):Promise<string> {
	const myText = new TextEncoder().encode(pass);

const myDigest = await crypto.subtle.digest(
  {
    name: 'SHA-256',
  },
  myText // The data you want to hash as an ArrayBuffer
);

const hasp = Array.from(new Uint8Array(myDigest))
  .map((byte) => byte.toString(16).padStart(2, '0'))
  .join('');

return hasp;
}