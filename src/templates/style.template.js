import { Item } from "../types.js";

/** @param {Item} item */
export function styleTemplate(item) {
	return `import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {}
});`;
}
