// Генерирует растровые иконки из src/assets/brand/app-icon.svg: `npm run icons`.
import { readFile, writeFile } from 'node:fs/promises';
import sharp from 'sharp';

const source = await readFile(new URL('../src/assets/brand/app-icon.svg', import.meta.url));
const out = (name) => new URL(`../public/${name}`, import.meta.url);
const png = (size) => sharp(source, { density: 384 }).resize(size, size).png({ compressionLevel: 9 }).toBuffer();

await writeFile(out('icon-512.png'), await png(512));
await writeFile(out('icon-192.png'), await png(192));
await writeFile(out('apple-touch-icon.png'), await png(180));

// favicon.ico: контейнер ICO с одним PNG 32×32 внутри (поддерживается всеми браузерами с IE11+).
const ico32 = await png(32);
const header = Buffer.alloc(22);
header.writeUInt16LE(0, 0); // reserved
header.writeUInt16LE(1, 2); // type: icon
header.writeUInt16LE(1, 4); // count
header.writeUInt8(32, 6); // width
header.writeUInt8(32, 7); // height
header.writeUInt8(0, 8); // palette
header.writeUInt8(0, 9); // reserved
header.writeUInt16LE(1, 10); // color planes
header.writeUInt16LE(32, 12); // bits per pixel
header.writeUInt32LE(ico32.length, 14); // image size
header.writeUInt32LE(22, 18); // offset
await writeFile(out('favicon.ico'), Buffer.concat([header, ico32]));

console.log('icons: icon-512.png, icon-192.png, apple-touch-icon.png, favicon.ico');
