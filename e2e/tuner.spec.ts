import { tmpdir } from "node:os";
import { join } from "node:path";

import { expect, test } from "@playwright/test";

import { signInWithSessionCookie } from "./support/session";
import { writeToneWav } from "./support/tone";

// Chromium loops this file as the microphone, so the test runs the real
// getUserMedia -> Web Audio -> YIN pipeline end to end. It has to exist
// before the browser launches, hence the module-level write.
const tones = {
  inTune: { path: join(tmpdir(), "songcraft-e2e-g3.wav"), frequency: 196 },
};
writeToneWav(tones.inTune.path, tones.inTune.frequency);

test.use({
  permissions: ["microphone"],
  launchOptions: {
    args: [
      "--use-fake-ui-for-media-stream",
      "--use-fake-device-for-media-stream",
      `--use-file-for-fake-audio-capture=${tones.inTune.path}`,
    ],
  },
});

test.beforeEach(async ({ context, baseURL }) => {
  await signInWithSessionCookie(context, baseURL!);
});

test("the practice tuner detects the note played into the microphone", async ({
  page,
}) => {
  await page.goto("/dashboard/practice");

  const tuner = page.locator("[data-slot=card]", { hasText: "Afinador" });
  await tuner.getByRole("button", { name: "Ativar microfone" }).click();

  await expect(tuner.getByTestId("tuner-note")).toHaveText("G3");
  await expect(tuner.getByText(/^196\.\d Hz · [+-]\d cents$/)).toBeVisible();
  await expect(tuner.getByText("Afinado", { exact: true })).toBeVisible();

  await tuner.getByRole("button", { name: "Parar afinador" }).click();

  await expect(tuner.getByTestId("tuner-note")).toHaveText("—");
  await expect(
    tuner.getByRole("button", { name: "Ativar microfone" })
  ).toBeVisible();
});
