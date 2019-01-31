import { LitElement, html } from "lit-element";
import "../option-button.js";
import xquizzerStyles from "./styles";

class XQuizzer extends LitElement {
  constructor() {
    super();
    this.numberCurrentQuestion = 0;
    this.numberCorrect = 0;
    this.data = null;
  }

  static get properties() {
    return {
      numberCurrentQuestion: { type: Number },
      numberCorrect: { type: Number },
      data: { type: Array }
    };
  }

  static get styles() {
    return [xquizzerStyles];
  }

  async loadData() {
    const raw = await fetch("http://localhost:4000/api/quizzes");
    const { data } = await raw.json();
    this.data = data;
  }

  _numberTotal() {
    return this.data.length;
  }

  _indicatorText() {
    return `Score: ${this.numberCorrect}/${this._numberTotal()}`;
  }

  _isGameOver() {
    return this.numberCurrentQuestion == this._numberTotal();
  }

  _onClick(e) {
    const isCorrect = e.target.getAttribute("isCorrect");
    if (isCorrect === "true") this.numberCorrect++;
    this.numberCurrentQuestion++;
    this.currentQuestion = this.data[this.numberCurrentQuestion];
  }

  render() {
    if (this.data === null) {
      this.loadData();
      return html`
        <p>Loading...</p>
      `;
    }

    if (this._isGameOver()) {
      return html`
        <div class="game-over">
          <p class="proclamation">Game over!</p>
          <p class="score">${this._indicatorText()}</p>
        </div>
      `;
    }

    const currentQuestion = this.data[this.numberCurrentQuestion];
    const answers = Object.values(currentQuestion.answers);
    const songUrl = currentQuestion.songUrl;

    const audio = document.createElement("audio");
    audio.setAttribute("controls", "true");
    audio.setAttribute("autoplay", "true");
    const source = document.createElement("source");
    source.setAttribute("type", "audio/mp3");
    source.setAttribute("src", songUrl);
    audio.appendChild(source);
    audio.load();

    return html`
      <div class="indicator"><p class="count">${this._indicatorText()}</p></div>
      ${audio}
      <div class="options">
        ${
          answers.map(
            ({ commonName, isCorrect }) =>
              html`
                <option-button
                  @click="${this._onClick}"
                  isCorrect="${isCorrect}"
                  text="${commonName}"
                ></option-button>
              `
          )
        }
      </div>
    `;
  }
}

window.customElements.define("x-quizzer", XQuizzer);
