export function loadPage(title, path, host) {
    if (path && !customElements.get(path + "-page") && path != "not-found") {
        loadPage("404", "not-found", host);
        return;
    }
    const page = document.createElement((path || "home") + "-page");
    while (host.firstChild)
        host.removeChild(host.firstChild);
    host.appendChild(page);
    document.title = title.trim() == "پروژه" ? title : title + " - پروژه";
    history.pushState(null, title, path || "/");
}
export class KeyValuePair {
    constructor(key, value) {
        this.key = key;
        this.value = value;
    }
}
export class Observable {
    constructor(obj, objectName) {
        return new Proxy(obj, {
            set(target, key, value) {
                Reflect.set(target, key, value);
                if (Object.keys(target).includes(key.toString()))
                    window.dispatchEvent(new CustomEvent(objectName + "change", {
                        detail: {
                            type: "set",
                            data: new KeyValuePair(key, value)
                        }
                    }));
                return true;
            },
            deleteProperty(target, key) {
                Reflect.deleteProperty(target, key);
                window.dispatchEvent(new CustomEvent(objectName + "change", {
                    detail: {
                        type: "delete",
                        data: key
                    }
                }));
                return true;
            }
        });
    }
}
//# sourceMappingURL=util.js.map