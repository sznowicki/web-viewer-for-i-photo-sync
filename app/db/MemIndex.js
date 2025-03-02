export class MemIndex {
	constructor() {
		this.indexPerFileName = new Map()
		this.indexPerFullPath = new Map()
		this.indexPerMonthAndYear = new Map()
		this.indexMonthAndYearExcerpt = new Map();
		this.uniqueMonths = new Set()
	}

	/**
	 *
	 * @param {string} fileName
	 * @param {string} fullPath
	 * @param {Date} mDate
	 * @returns {Promise<void>}
	 */
	async addFile(fileName, fullPath, mDate) {
		const file = {
			fileName,
			fullPath,
			mDate
		};
		this.indexPerFileName.set(fileName, file);
		this.indexPerFullPath.set(fullPath, file);

		const dateKey = `${mDate.getFullYear()}-${String(mDate.getMonth() + 1).padStart(2, '0')}`
		const dateKeyAsNumber = parseInt(dateKey.replace('-', ''));
		this.uniqueMonths.add(dateKeyAsNumber);
		this.indexPerMonthAndYear.set(dateKey, file);

		if (!this.indexMonthAndYearExcerpt.get(dateKey)) {
			this.indexMonthAndYearExcerpt.set(dateKey, []);
		}
		const monthAndYearExcerpt = this.indexMonthAndYearExcerpt.get(dateKey);
		if (monthAndYearExcerpt.length < 10) {
			monthAndYearExcerpt.push(file);
		}
	}
}
