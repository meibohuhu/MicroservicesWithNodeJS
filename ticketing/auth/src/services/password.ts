import { scrypt, randomBytes } from 'crypto';
import { promisify } from 'util';

const scryptAsync = promisify(scrypt);

export class Password {
  static async toHash(password: string) {
    const salt = randomBytes(8).toString('hex');
    const buf = (await scryptAsync(password, salt, 64)) as Buffer;     // need to define its name

    return `${buf.toString('hex')}.${salt}`;    // generate a hashpassword, also concatenating on there at the end
  }

  static async compare(storedPassword: string, suppliedPassword: string) {       // hash suppliedPassword and compare with storedPassword hash value
    const [hashedPassword, salt] = storedPassword.split('.');
    const buf = (await scryptAsync(suppliedPassword, salt, 64)) as Buffer;

    return buf.toString('hex') === hashedPassword;
  }
}
