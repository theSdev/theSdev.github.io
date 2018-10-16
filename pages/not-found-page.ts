export default class NotFoundPage extends HTMLElement {
    _template = document.createElement("template");
    constructor() {
        super();
        (async () => {
            this.attachShadow({ mode: "open" });
            this.shadowRoot!.appendChild((await this.getTemplate()).content.cloneNode(true));
        })();
    }

    async getTemplate() {
        if (!this._template.innerHTML) {
            const response = await fetch("/pages/not-found-page.html");
            this._template.innerHTML = await response.text();
        }
        return this._template;
    }
}
