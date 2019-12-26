import BaseComponent, { ComponentConfig } from "../Component";
import Preloader from "../Preloader";

export default class Audio extends BaseComponent {
  url: string;
  _loadingPromise: Promise<void> | null = null;
  loaded: boolean = false;
  data: HTMLAudioElement | null = null;

  constructor(config: Partial<ComponentConfig> & { url: string }) {
    super(config);
    this.url = config.url;

    Preloader.addTask(() => this.load());
  }

  load(): Promise<void> {
    if (this.loaded) return Promise.resolve();
    if (this._loadingPromise) return this._loadingPromise;

    this._loadingPromise = new Promise((resolve, reject) => {
      const image = document.createElement("audio");
      image.oncanplaythrough = () => {
        this.loaded = true;
        this.data = image;
        resolve();
      };
      image.onerror = (event) => {
        const error = new Error("Failed to load audio");
        // @ts-ignore
        error.event = event;
        reject(error);
      };

      image.src = this.url;
    }).then(() => {
      this._loadingPromise = null;
    });

    return this._loadingPromise;
  }

  play(): Promise<void> {
    const data = this.data;
    if (!data) return Promise.resolve();

    return data.play();
  }
}