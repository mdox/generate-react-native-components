import { Component, Item } from "../types.js";

/**
 * @param {Component} target
 */
export function getItems(target) {
	/** @type {Item[]} */
	const items = [];

	const getItemsRecursively = (target, ancestorPath) => {
		for (const [name, children] of Object.entries(target)) {
			const fullPath = `${ancestorPath}/${name}`;
			
			const childNames = Object.keys(children);

			items.push({ name, fullPath, childNames });

			if (childNames.length > 0) {
				getItemsRecursively(children, fullPath);
			}
		}
	};

	getItemsRecursively(target, "");

  return items;
}
