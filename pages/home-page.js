export default class NotFoundPage extends HTMLElement {
    constructor() {
        super();
        this._template = document.createElement("template");
        (async () => {
            this.attachShadow({ mode: "open" });
            this.shadowRoot.appendChild((await this.getTemplate()).content.cloneNode(true));
        })();
    }
    async getTemplate() {
        if (!this._template.innerHTML) {
            const response = await fetch("/pages/home-page.html");
            this._template.innerHTML = await response.text();
        }
        return this._template;
    }
}
//# sourceMappingURL=home-page.js.map