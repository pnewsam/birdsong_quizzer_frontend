import { LitElement, html, css } from "lit-element";

class OptionButton extends LitElement {
  constructor() {
    super();
    this.text = "";
    this.isCorrect = undefined;
  }

  static get properties() {
    return {
      text: { type: String }
    };
  }

  static get styles() {
    return [
      css`
        button {
          background-color: #3399ff;
          border: none;
          color: white;
          font-size: 24px;
          height: 100%;
          width: 100%;
        }
      `
    ];
  }

  render() {
    return html`
      <button isCorrect="${this.isCorrect}">${this.text}</button>
    `;
  }
}

window.customElements.define("option-button", OptionButton);
