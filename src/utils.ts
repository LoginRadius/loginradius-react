import { PopupConfigOptions, TokenInfo } from "./LRClient";

export const openPopup = (url: string) => {
  const width = 400;
  const height = 600;
  const left = window.screenX + (window.innerWidth - width) / 2;
  const top = window.screenY + (window.innerHeight - height) / 2;

  return window.open(
    url,
    "loginradius:authorize:popup",
    `left=${left},top=${top},width=${width},height=${height},resizable,scrollbars=yes,status=1`
  );
};

export const runPopup = (config: PopupConfigOptions) => {
  return new Promise<TokenInfo>((resolve, reject) => {
    // eslint-disable-next-line prefer-const
    let popupEventListener: EventListenerOrEventListenerObject;

    const popupTimer = setInterval(() => {
      if (config.popup && config.popup.closed) {
        clearInterval(popupTimer);
        clearTimeout(timeoutId);
        window.removeEventListener("message", popupEventListener, false);
        reject(new Error("Cancelled"));
      }
    }, 1000);

    const timeoutId = setTimeout(() => {
      clearInterval(popupTimer);
      reject(new Error("Timeout"));
      window.removeEventListener("message", popupEventListener, false);
    }, (config.timeoutInSeconds || 60) * 1000);

    popupEventListener = function (e: MessageEvent) {
      if (!e.data && e.data.type !== "authorization_response") {
        return;
      }

      clearInterval(popupTimer);
      clearTimeout(timeoutId);
      window.removeEventListener("message", popupEventListener, false);
      config.popup.close();

      resolve({
        isauthenticated: !!e.data.token,
      });
    };

    window.addEventListener("message", popupEventListener);
  });
};
