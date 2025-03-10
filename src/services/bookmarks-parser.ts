/**
 * Parser for netscape html bookmarks
 * Based on code for bookmarks parser
 * Github: https://github.com/calibr/node-bookmarks-parser
 */

type NodeData = {
  type: string;
  url: string | null;
  title: string | null;
  add_date: string;
  icon: string;
  last_modified: string;
  ns_root: string | null;
  __dir_dl?: Element | HTMLElement;
  children: (NodeData | MenuRoot)[];
};

type MenuRoot = {
  title: string;
  children: unknown[];
  ns_root: string;
};

type Callback = (e: Error | null, data?: (MenuRoot | NodeData)[]) => void;

type Parse = (html: string, cb: Callback) => void;

/**
 * @private
 */
function getNodeData(node: ChildNode) {
  const data = {} as NodeData;

  for (let i = 0; i != node.childNodes.length; i++) {
    const currentChildnode = node.childNodes[i] as HTMLElement;
    if (currentChildnode.tagName == "A") {
      // is bookmark
      data.type = "bookmark";
      data.url = currentChildnode.getAttribute("href");
      data.title = currentChildnode.textContent;

      const add_date = currentChildnode.getAttribute("add_date");
      if (add_date) {
        data.add_date = add_date;
      }

      const icon = currentChildnode.getAttribute("icon");
      if (icon) {
        data.icon = icon;
      }
    } else if (currentChildnode.tagName == "H3") {
      // is folder
      data.type = "folder";
      data.title = currentChildnode.textContent;

      const add_date = currentChildnode.getAttribute("add_date");
      const last_modified = currentChildnode.getAttribute("last_modified");

      if (add_date) {
        data.add_date = add_date;
      }

      if (last_modified) {
        data.last_modified = last_modified;
      }
      data.ns_root = null;
      if (currentChildnode.hasAttribute("personal_toolbar_folder")) {
        data.ns_root = "toolbar";
      }
      if (currentChildnode.hasAttribute("unfiled_bookmarks_folder")) {
        data.ns_root = "unsorted";
      }
    } else if (currentChildnode.tagName == "DL") {
      // store DL element reference for further processing the child nodes
      data.__dir_dl = currentChildnode;
    }
  }

  // if current item is a folder, but we haven't found DL element for it inside the DT element - check if the next sibling is DD
  // and if so check if it has DL element if yes - we just found the DL element for the folder
  if (data.type === "folder" && !data.__dir_dl) {
    const nextSibling = node.nextSibling as HTMLElement;
    if (nextSibling && nextSibling.tagName === "DD") {
      const dls = nextSibling.getElementsByTagName("DL");

      if (dls.length) {
        data.__dir_dl = dls[0];
      }
    }
  }

  return data;
}

/**
 * @private
 */
function processDir(dir: HTMLElement | Element, level: number) {
  const children = dir.childNodes;
  let menuRoot: MenuRoot | null = null;

  const items = [];

  for (let i = 0; i != children.length; i++) {
    const child = children[i] as HTMLElement;
    if (!child.tagName) {
      continue;
    }
    if (child.tagName != "DT") {
      continue;
    }

    const itemData = getNodeData(child);

    if (itemData.type) {
      if (level === 0 && !itemData.ns_root) {
        // create menu root if need
        if (!menuRoot) {
          menuRoot = {
            title: "Menu",
            children: [],
            ns_root: "menu",
          };
        }
        if (itemData.type == "folder" && itemData.__dir_dl) {
          itemData.children = processDir(itemData.__dir_dl, level + 1);
          delete itemData.__dir_dl;
        }
        menuRoot.children.push(itemData);
      } else {
        if (itemData.type == "folder" && itemData.__dir_dl) {
          itemData.children = processDir(itemData.__dir_dl, level + 1);
          delete itemData.__dir_dl;
        }
        items.push(itemData);
      }
    }
  }
  if (menuRoot) {
    items.push(menuRoot);
  }
  return items;
}

/** @public */
const parse: Parse = (html, callback) => {
  try {
    const parser = new DOMParser();
    const doc = parser.parseFromString(html, "text/html");
    const dls = doc.getElementsByTagName("DL");

    if (dls.length > 0) {
      const dir = processDir(dls[0], 0);
      callback(null, dir);
    } else {
      throw new Error("Bookmarks are malformed");
    }
  } catch (error) {
    return callback(error as Error);
  }
};

export { parse };
