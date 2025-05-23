import { readdir, readFile, rm, writeFile } from 'node:fs/promises';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));

const basePath = './src/features/translations';
const tempDir = resolve(__dirname, `${basePath}/temp`);
const targetDir = resolve(__dirname, basePath);

// list all files in temp folder
const allTempFiles = await readdir(tempDir);

// collect files for each locale
const filesByLocales = allTempFiles.reduce((map, file) => {
    const [, locale] = file.split('.');
    if (!map.has(locale)) {
        map.set(locale, []);
    }
    map.get(locale).push(file);
    return map;
}, new Map());

// merge all files belonging to the same locale
for (const [locale, files] of filesByLocales) {
    const promises = files.map(async file => JSON.parse(await readFile(`${tempDir}/${file}`, 'utf-8')));
    const contents = await Promise.all(promises);

    const mergedContent = contents.reduce((outgoingFile, content) => {
        // find duplicates
        for (const key of Object.keys(content)) {
            if (outgoingFile[key]) {
                console.warn(`Duplicate key '${key}' found in locale ${locale}`);
            }
        }
        Object.assign(outgoingFile, content);
        return outgoingFile;
    }, {});

    const targetFile = `${targetDir}/${locale}.json`;
    console.log(`Writing ${targetFile}`);

    await writeFile(targetFile, JSON.stringify(mergedContent, null, 4), 'utf-8');
}

// delete temp folder
await rm(tempDir, { recursive: true });
