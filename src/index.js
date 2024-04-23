import fs from "node:fs";
import path from "node:path";
import prompt from "prompt";
import { components } from "./schema/components.schema.js";
import { componentTemplate } from "./templates/component.template.js";
import { styleTemplate } from "./templates/style.template.js";
import { getItems } from "./utils/get-items.util.js";

const root = path.join(process.cwd(), "output", "Root");

async function main() {
	await check();

	fs.mkdirSync(root, { recursive: true });

	const items = getItems(components);

	for (const item of items) {
		const componentPath = path.join(root, item.fullPath);
		fs.mkdirSync(componentPath);
		/* prettier-ignore */ fs.writeFileSync(path.join(componentPath, "index.tsx"), componentTemplate(item));
		/* prettier-ignore */ fs.writeFileSync(path.join(componentPath, "style.ts"), styleTemplate(item));
	}

	console.log("");
	console.log("Success");
	console.log("");
	console.log("Components created.", items.length);
	console.log("");
}

main();

////

async function check() {
	if (fs.existsSync(root)) {
		console.log("");
		console.log("Ooops");
		console.log("");
		console.log("There are generated components.");
		console.log("");

		prompt.start();

		const { deleting } = await prompt.get(
			{
				properties: {
					deleting: {
						type: "string",
						pattern: /^y[es]?|^n(o)?/i,
						description: "Would you like to delete them? (y/n)",
						required: true,
					},
				},
			},
			["deleting"]
		);

		if (/^y[es]?/i.test(deleting)) {
			fs.rmSync(root, { recursive: true });
		} else {
			process.exit(1);
		}
	}
}
