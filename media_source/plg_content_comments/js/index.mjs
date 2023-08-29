/**
 * MIT License
 *
 * utterance Code from Jeremy Danyow
 *
 * A simple Custom Element wrapper for https://github.com/utterance/utterances/blob/master/src/client.ts
 *
 */
class UtterancesComments extends HTMLElement {
  constructor() {
    super();

    this.remoteUrl = 'https://utteranc.es';
    this.currentUrl = new URL(location.href);
    this.resizeContainer = this.resizeContainer.bind(this);
    this.session = url.searchParams.get('utterances');
    this.handleIntersection = this.handleIntersection.bind(this);
    if (this.session) {
      localStorage.setItem('utterances-session', this.session);
      this.currentUrl.searchParams.delete('utterances');
      history.replaceState(undefined, document.title, this.currentUrl.href);
    }
  }

  resizeContainer(event) {
    if (event.origin !== utterancesOrigin) return;
    const {data} = event;
    if (data && data.type === 'resize' && data.height)
      this.container.style.height = `${data.height}px`;
  }

  connectedCallback() {
    this.observer = new IntersectionObserver(this.handleIntersection);
    this.observer.observe(this);
    if (this.container) document.addEventListener('message', this.resizeContainer);
  }

  disconnectedCallback() {
    document.removeEventListener('message', this.resizeContainer);
  }

  render() {
    const options = getOptions();
    if (!options) return; // silence

    const container = this.querySelector('.utterances');
    const iframe = this.querySelector('.utterances-frame');
    if (container) this.remove(container);
    if (iframe) this.remove(container);

    this.container = document.createElement('div');
    this.container.classList.add('utterances');
    this.append(this.container);
    this.iframe = document.createElement('div');
    this.iframe.classList.add('utterances-frame');
    this.iframe.setAttribute('title', 'Comments');
    this.iframe.setAttribute('scrolling', 'no');
    this.iframe.setAttribute('loading', 'lazy');
    this.iframe.setAttribute('src', `${remoteUrl}/utterances.html?${new URLSearchParams(options)}`);
    this.append(this.iframe);
  }

  getOptions() {
    const raw = this.getAttribute('reference');
    if (!raw) return;

    let options;
    const decodedData = atob(raw);
    try {
      JSON.parse(decodedData);
    } catch (e) { return; }
    if (!options) return;

    options.theme="preferred-color-scheme"
    const canonicalLink = document.querySelector(`link[rel='canonical']`);
    options.url = canonicalLink ? canonicalLink.href : url.origin + url.pathname + url.search;
    options.origin = url.origin;
    options.pathname = url.pathname.length < 2 ? 'index' : url.pathname.substr(1).replace(/\.\w+$/, '');
    options.title = document.title;

    const descriptionMeta = document.querySelector(`meta[name='description']`);
    options.description = descriptionMeta ? descriptionMeta.content : '';
    const len = encodeURIComponent(options.description).length;
    if (len > 1000) options.description = options.description.substr(0, Math.floor(options.description.length * 1000 / len));

    const ogtitleMeta = document.querySelector(`meta[property='og:title'],meta[name='og:title']`);
    options['og:title'] = ogtitleMeta ? ogtitleMeta.content : '';
    options.session = this.session || localStorage.getItem('utterances-session') || '';

    return options;
  }

  handleIntersection(entries) {
    entries.map((entry) => {
      if (entry.isIntersecting) {
        this.render();
        document.addEventListener('message', this.resizeContainer);
        this.observer.unobserve(entry.target);
      }
    });
  }
}

customElements.define('utterances-comments', UtterancesComments);
