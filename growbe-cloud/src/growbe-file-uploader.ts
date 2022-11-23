
import {env} from 'process';
import FormData from 'form-data';
import { client, getHeaders, setToken } from './growbe-api-client';
import {readFileSync} from 'fs';

export async function file_uploader(args: string[]) {

    setToken(env.TOKEN as string);

    const form = new FormData();
    form.append("file", readFileSync(args[0]), 'test.jpg')

    await client.post(`${env.API_URL}/api/containers/release/upload`, form as any, {
        headers: {
            'Content-Type': 'multipart/form-data',
            ...getHeaders(),

        }
    }).catch(e => {
        console.log(e);
    })
}


file_uploader(process.argv).catch(err => {
  process.exit(1);
});
