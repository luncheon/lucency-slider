const clamp_0_100 = v => v < 0 ? 0 : v > 100 ? 100 : v;
const inlineStyle = CSS.supports("x", "attr(x %)") ? null : (el, prop, value) => el.style.setProperty(prop, value);

export default class LucencySlider extends HTMLElement {
  static formAssociated = true;
  static observedAttributes = ["disabled", "max", "min", "step", "value"];

  #range;
  #internals = this.attachInternals();

  constructor() {
    super();
    this.#internals.role = "slider";
    this.attachShadow({ clonable: true, delegatesFocus: true, mode: "open" }).innerHTML =
      "<div part=thumb></div><input part=range type=range>";
    this.#range = this.shadowRoot.lastElementChild;
  }

  get disabled() { return this.#range.disabled; }
  set disabled(v) { this.toggleAttribute("disabled", this.#range.disabled = !!v || v === ""); }

  get max() { return this.#range.max; }
  set max(v) { this.#limit("max", v); this.#sync(); }
  
  get min() { return this.#range.min; }
  set min(v) { this.#limit("min", v); this.#sync(); }

  get name() { return this.getAttribute("name"); }
  set name(v) { this.setAttribute("name", v); }

  get step() { return this.#range.step; }
  set step(v) { this.setAttribute("step", this.#range.step = v); this.#sync(); }

  get value() { return this.#range.value; }
  set value(v) { this.#range.value = clamp_0_100(v); this.#sync(); }

  get valueAsNumber() { return this.#range.valueAsNumber; }
  set valueAsNumber(v) { this.#range.valueAsNumber = clamp_0_100(v); this.#sync(); }

  get vertical() { return this.hasAttribute("vertical"); }
  set vertical(v) { this.toggleAttribute("vertical", !!v || v === ""); }

  #limit(minOrMax, v) {
    this.setAttribute(minOrMax, this.#range[minOrMax] = v = clamp_0_100(v));
    inlineStyle?.(this, "--" + minOrMax, v);
    inlineStyle?.(this, `--${minOrMax}%`, v + "%");
  }

  attributeChangedCallback(name, oldValue, newValue) {
    oldValue !== newValue && (this[name] = newValue);
  }

  connectedCallback() {
    const range = this.#range;
    const thumb = this.shadowRoot.firstElementChild;
    range.addEventListener("input", this.#sync);
    range.addEventListener("change", this.#redispatch);
    range.disabled = this.hasAttribute("disabled");
    range.step = this.getAttribute("step") || 1;
    range.value = this.getAttribute("value") || this.max;
    this.setAttribute("thumb-thick", this.vertical ? thumb.offsetHeight : thumb.offsetWidth); // ResizeObserver seems overkill
    this.#limit("max", this.getAttribute("max") || 100);
    this.min = this.getAttribute("min") || 0; // #sync()
  }

  disconnectedCallback() {
    this.#range.removeEventListener("input", this.#sync);
    this.#range.removeEventListener("change", this.#redispatch);
  }

  #sync = () => {
    this.setAttribute("value", this.value);
    this.#internals.setFormValue(this.valueAsNumber);
    this.#internals.setValidity(this.#range.validity, this.#range.validationMessage);
    const thumb = this.shadowRoot.firstElementChild;
    inlineStyle?.(this, "--thumb-offset", (this.vertical ? this.offsetHeight - thumb.offsetHeight : this.offsetWidth - thumb.offsetWidth) * (this.valueAsNumber - this.min) / (this.max - this.min) + "px");
  }

  #redispatch = event => this.dispatchEvent(new event.constructor(event.type, event));
}

customElements.define("lucency-slider", LucencySlider);
