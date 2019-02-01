import { LitElement, html } from "lit-element";
import "../answer-button";
import questionsWrapperStyles from "./styles";
import { sampleData } from "./sampleData";

class QuestionsWrapper extends LitElement {
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
    return [questionsWrapperStyles];
  }

  // async loadData() {
  //   const raw = await fetch("http://localhost:4000/api/quizzes");
  //   const { data } = await raw.json();
  //   this.data = data;
  //   console.log(this.data);
  // }

  _numberTotal() {
    // return this.data.length;
    return sampleData.length;
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

  _renderAudioElement(songUrl) {
    const audio = document.createElement("audio");
    audio.setAttribute("controls", "true");
    // audio.setAttribute("autoplay", "true");
    const source = document.createElement("source");
    source.setAttribute("type", "audio/mp3");
    source.setAttribute("src", songUrl);
    audio.appendChild(source);
    audio.load();
    return audio;
  }

  render() {
    // if (this.data === null) {
    //   this.loadData();
    //   return html`
    //     <p>Loading...</p>
    //   `;
    // }

    if (this._isGameOver()) {
      return html`
        <div class="game-over">
          <p class="proclamation">Game over!</p>
          <p class="score">${this._indicatorText()}</p>
        </div>
      `;
    }

    // const currentQuestion = this.data[this.numberCurrentQuestion];
    // const answers = Object.values(currentQuestion.answers);

    const currentQuestion = sampleData[this.numberCurrentQuestion];
    const answers = Object.values(currentQuestion.answers);
    const songUrl = currentQuestion.songUrl;

    return html`
      <div class="indicator"><p class="count">${this._indicatorText()}</p></div>
      <div class="options">
        ${answers.map(
          ({ commonName, isCorrect }) =>
            html`
              <answer-button
                @click="${this._onClick}"
                isCorrect="${isCorrect}"
                text="${commonName}"
              ></answer-button>
            `
        )}
      </div>
      ${this._renderAudioElement(songUrl)}
    `;
  }
}

window.customElements.define("questions-wrapper", QuestionsWrapper);
