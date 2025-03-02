import fs from 'fs/promises';
import path from 'path';
import {MemIndex} from "./db/MemIndex.js";

const rootDir = path.resolve(import.meta.dirname, '../');

/**
 *
 * @param {string} name
 * @param {MemIndex} memIndex
 * @returns {Promise<void>}
 */
const readDirectory = async (name, memIndex) => {
	const pathname = path.resolve(rootDir, './photos', `./${name}`);
	const allFiles = await fs.readdir(pathname);

	for (const file of allFiles) {
		const fullPathname = path.resolve(pathname, file);
		const stat = await fs.stat(fullPathname);
		let modified = new Date(0);
		try {
			modified = new Date(stat.mtimeMs);
		} catch (e) {
			console.log('Could not get modified time for', file);
		}


		await memIndex.addFile(file, fullPathname, modified);
	}
}

export const allPhotosIndex = new MemIndex();
export const sharedPhotosIndex = new MemIndex();

export const initIndex = async () => {
	await readDirectory('_All-Photos', allPhotosIndex);
	await readDirectory('_Shared-Photos', sharedPhotosIndex);
}
