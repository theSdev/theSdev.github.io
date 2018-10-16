import { Observable } from "../util.js";
import DataTable from "../components/data-table.js";

export default class ThingsPage extends HTMLElement {
    _template = document.createElement("template");
    constructor() {
        super();
        (async () => {
            this.attachShadow({ mode: "open" });
            this.shadowRoot!.appendChild((await this.getTemplate()).content.cloneNode(true));
            window.store = {};
            window.store.thingsSchema = {
                id: { title: "شناسه" },
                name: { title: "نام" },
                age: { title: "سن" }
            };
            window.store.things = new Observable([{
                id: 1,
                name: "سمیر",
                age: 23
            }, {
                id: 2,
                name: "علیرضا",
                age: 24
            }, {
                id: 3,
                name: "حمید",
                age: 25
            }], "things");
        })();
        !customElements.get("data-table") && customElements.define("data-table", DataTable);
    }

    async getTemplate() {
        if (!this._template.innerHTML) {
            const response = await fetch("/pages/things-page.html");
            this._template.innerHTML = await response.text();
        }
        return this._template;
    }
}
