import { LitElement, html } from "lit-element";
import { connect } from "pwa-helpers/connect-mixin.js";
import "../answer-button";
import questionsWrapperStyles from "./styles";
import { store } from "../../store";
import { isLocationFetched } from "../../reducers/geolocation";

class QuestionsWrapper extends connect(store)(LitElement) {
  constructor() {
    super();
    this.numberCorrect = 0;
    this.numberCurrentQuestion = 0;
    this.data = null;
    this.position = {
      lat: undefined,
      lon: undefined
    };
  }

  static get properties() {
    return {
      data: { type: Array },
      numberCurrentQuestion: { type: Number },
      numberCorrect: { type: Number }
    };
  }

  static get styles() {
    return [questionsWrapperStyles];
  }

  async loadData() {
    const baseUrl = "http://localhost:4000/api/quizzes";
    const url = `${baseUrl}?lat=${this.position.lat.toString()}&lon=${this.position.lon.toString()}`;
    const raw = await fetch(url);
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

  _areCoordsFetched() {
    return this.position.lat && this.position.lon;
  }

  _onClick(e) {
    const isCorrect = e.target.getAttribute("isCorrect");
    if (isCorrect === "true") this.numberCorrect++;
    this.numberCurrentQuestion++;
  }

  _renderAudioElement(songUrl) {
    const audio = document.createElement("audio");
    audio.setAttribute("controls", "true");
    audio.setAttribute("autoplay", "true");
    const source = document.createElement("source");
    source.setAttribute("type", "audio/mp3");
    source.setAttribute("src", songUrl);
    audio.appendChild(source);
    audio.load();
    return audio;
  }

  stateChanged(state) {
    if (isLocationFetched(state)) {
      this.position = {
        lat: state.geolocation.position.lat,
        lon: state.geolocation.position.lon
      };
    }
  }

  render() {
    if (!this._areCoordsFetched()) {
      return html`
        <p>Fetching location...</p>
      `;
    }

    if (this.data === null) {
      this.loadData();
      return html`
        <p>Loading data...</p>
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
