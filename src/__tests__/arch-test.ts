import "tsarch/dist/jest";

import { filesOfProject } from "tsarch";

describe("architecture", () => {
  jest.setTimeout(10000);

  it("api should not depend on app state types or domain", async () => {
    const stateRule = filesOfProject()
      .inFolder("api")
      .shouldNot()
      .dependOnFiles()
      .inFolder("state");

    // TS typing are wrong - it's async, "await" is needed
    await expect(stateRule).toPassAsync();

    const domainRule = filesOfProject()
      .inFolder("api")
      .shouldNot()
      .dependOnFiles()
      .inFolder("domain");

    // TS typing are wrong - it's async, "await" is needed
    await expect(domainRule).toPassAsync();
  });

  it("components & hooks should not depend on api", async () => {
    const componentsRule = filesOfProject()
      .inFolder("components")
      .shouldNot()
      .dependOnFiles()
      .inFolder("api");

    await expect(componentsRule).toPassAsync();

    const hooksRule = filesOfProject()
      .inFolder("hooks")
      .shouldNot()
      .dependOnFiles()
      .inFolder("api");

    await expect(hooksRule).toPassAsync();
  });
});
