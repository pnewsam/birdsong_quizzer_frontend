import { html, css } from "lit-element";
import { PageViewElement } from "./page-view-element.js";
import "./x-quizzer";

class MyView1 extends PageViewElement {
  static get styles() {
    return [css``];
  }

  render() {
    return html`
      <section><x-quizzer></x-quizzer></section>
    `;
  }
}

window.customElements.define("my-view1", MyView1);
