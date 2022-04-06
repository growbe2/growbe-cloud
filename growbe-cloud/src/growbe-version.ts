import {env} from 'process';
import FormData from 'form-data';
import { login, client, getHeaders } from './growbe-api-client';
import {readFileSync} from 'fs';

export async function version(args: string[]) {
  const version = args[2];

  if (version === 'latest' || version[0] === 'v') {
    await login(env.EMAIL as string, env.PASSWORD as string);
    await client.post(`${env.API_URL}/growbe-mainboard/version`, { name: version  }, {
        headers: {
            ...getHeaders(),
        }
    });

  	process.exit(0);
  } else {
	console.error("Invalid version argument must be 'latest' or v*.*.* was " + version)
  	process.exit(1);
  }
}

version(process.argv).catch(err => {
  process.exit(1);
});
