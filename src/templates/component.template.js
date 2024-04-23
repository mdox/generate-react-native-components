import { Item } from "../types.js";

/** @param {Item} item */
export function componentTemplate(item) {
	// prettier-ignore
	return `import { View } from "react-native";
${item.childNames.map(importTemplate).join("\n")}

export function ${item.name}() {
  return (
    <View>
      ${item.childNames.map(childTemplate).join("\n")}
    </View>
  );
}`;
}

function importTemplate(name) {
	return `import { ${name} } from "./${name}"`;
}

function childTemplate(name) {
	return `<${name} />`;
}
