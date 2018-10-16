export default class DataTable extends HTMLElement {
    constructor() {
        super();
        this._itemsAttribute = this.getAttribute("items") || "";
        this._items = [];
        this._template = document.createElement("template");
        (async () => {
            this.attachShadow({ mode: "open" });
            this.shadowRoot.appendChild((await this.getTemplate()).content.cloneNode(true));
            const thead = this.shadowRoot.querySelector("thead");
            const itemsSchema = window.store[this._itemsAttribute + "Schema"];
            const tr = document.createElement("tr");
            for (const key of Object.keys(itemsSchema)) {
                const th = document.createElement("th");
                th.innerHTML = itemsSchema[key].title;
                tr.appendChild(th);
            }
            thead.appendChild(tr);
            const items = window.store[this._itemsAttribute];
            items.forEach((value, key) => {
                this.generateRow({ key, value });
                this._items.splice(key, 1, value);
            });
        })();
    }
    connectedCallback() {
        window.addEventListener(this._itemsAttribute + "change", ((e) => {
            switch (e.detail.type) {
                case "set":
                    this.generateRow(e.detail.data);
                    this._items.splice(e.detail.data.key, 1, e.detail.data.value);
                    break;
                case "delete":
                    this.deleteRow(e.detail.data);
                    this._items.splice(e.detail.data, 1);
                    break;
            }
        }));
    }
    generateRow(item) {
        const tr = document.createElement("tr");
        tr.classList.add("item-row");
        while (tr.firstChild)
            tr.removeChild(tr.firstChild);
        for (const key of Object.keys(item.value)) {
            const td = document.createElement("td");
            td.innerHTML = item.value[key];
            tr.appendChild(td);
        }
        if (this._items.length - 1 < item.key) {
            this.shadowRoot.querySelector("tbody").appendChild(tr);
        }
        else {
            this.shadowRoot.querySelector(`tr.item-row:nth-child(${Number(item.key) + 1})`).replaceWith(tr);
        }
    }
    deleteRow(key) {
        this.shadowRoot.querySelector(`tr.item-row:nth-child(${Number(key) + 1})`).remove();
    }
    async getTemplate() {
        if (!this._template.innerHTML) {
            const response = await fetch("/components/data-table.html");
            this._template.innerHTML = await response.text();
        }
        return this._template;
    }
}
//# sourceMappingURL=data-table.js.map