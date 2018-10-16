import { Observable } from "../util.js";
import DataTable from "../components/data-table.js";
export default class PeoplePage extends HTMLElement {
    constructor() {
        super();
        this._template = document.createElement("template");
        (async () => {
            this.attachShadow({ mode: "open" });
            this.shadowRoot.appendChild((await this.getTemplate()).content.cloneNode(true));
            //@ts-ignore
            window.person = {
                id: 4,
                name: "حسین",
                age: 26
            };
            window.store = {};
            window.store.peopleSchema = {
                id: { title: "شناسه" },
                name: { title: "نام" },
                age: { title: "سن" }
            };
            window.store.people = new Observable([{
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
                }], "people");
        })();
        !customElements.get("data-table") && customElements.define("data-table", DataTable);
    }
    async getTemplate() {
        if (!this._template.innerHTML) {
            const response = await fetch("/pages/people-page.html");
            this._template.innerHTML = await response.text();
        }
        return this._template;
    }
}
//# sourceMappingURL=people-page.js.map