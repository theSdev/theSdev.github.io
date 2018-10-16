export function loadPage(title: string, path: string, host: HTMLElement) {
    if (path && !customElements.get(path + "-page") && path != "not-found") {
        loadPage("404", "not-found", host);
        return;
    }
    const page = document.createElement((path || "home") + "-page");
    while (host.firstChild) host.removeChild(host.firstChild);
    host.appendChild(page);
    document.title = title.trim() == "پروژه" ? title : title + " - پروژه";
    history.pushState(null, title, path || "/");
}

export class KeyValuePair {
    constructor(public key: any, public value: any) { }
}

export class Observable {
    constructor(obj: Object, objectName: string) {
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
