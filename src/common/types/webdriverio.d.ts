   declare namespace WebdriverIO {
    interface Browser {
      // Browser methods/properties
      $: (selector: string) => Promise<Element>;
      deleteSession: () => Promise<void>;
      pause: (ms: number) => Promise<void>;
      takeScreenshot: () => Promise<string>;
    }
    
    interface Element {
      click: () => Promise<void>;
      setValue: (value: string) => Promise<void>;
      isDisplayed: () => Promise<boolean>;
      waitForDisplayed: (options: {timeout: number}) => Promise<void>;
    }
  }