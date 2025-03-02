import { allPhotosIndex, sharedPhotosIndex } from "../../fileindex.js";
import {getTemplate, renderHtml} from "../sso-render.js";

const indexTemplate = getTemplate(import.meta.dirname, './index.template.html');

export const indexController = async (req, res) => {
	const allPhotosExcerpts = []
	for (const [key, value] of allPhotosIndex.indexMonthAndYearExcerpt) {
		allPhotosExcerpts.push({
			key,
			files: value,
		});
	}

	const viewProps = {
		allPhotosExcerpts,
	}

	const html = await renderHtml(indexTemplate, viewProps);
	res.send(html);
}
