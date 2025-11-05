export default class LucencySlider extends HTMLElement {
  disabled: boolean;
  get max(): string;
  set max(max: string | number);
  get min(): string;
  set min(min: string | number);
  name: string;
  get step(): string;
  set step(step: string | number);
  value: string;
  valueAsNumber: number;
  vertical: boolean;
}

declare global {
  interface HTMLElementTagNameMap {
    "lucency-slider": LucencySlider;
  }
}
