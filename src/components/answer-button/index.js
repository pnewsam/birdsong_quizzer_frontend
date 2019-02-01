import { LitElement, html } from "lit-element";
import answerButtonStyles from "./styles";

class AnswerButton extends LitElement {
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
    return [answerButtonStyles];
  }

  render() {
    return html`
      <button isCorrect="${this.isCorrect}">${this.text}</button>
    `;
  }
}

window.customElements.define("answer-button", AnswerButton);
