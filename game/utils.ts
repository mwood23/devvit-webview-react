import { WebviewToBlockMessage } from "./shared";

export function sendToDevvit(event: WebviewToBlockMessage) {
  window.parent?.postMessage(event, "*");
}
