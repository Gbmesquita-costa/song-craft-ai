// @vitest-environment jsdom
import { cleanup, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it } from "vitest";

import { ErrorForm } from "./error-form";
import { SuccessForm } from "./success-form";

afterEach(cleanup);

describe.each([
  ["ErrorForm", ErrorForm],
  ["SuccessForm", SuccessForm],
])("%s", (_name, Component) => {
  it("renders the message it receives", () => {
    render(<Component message="Credenciais inválidas!" />);

    expect(screen.getByText("Credenciais inválidas!")).toBeInTheDocument();
  });

  it.each([undefined, ""])("renders nothing for %j", (message) => {
    const { container } = render(<Component message={message} />);

    expect(container).toBeEmptyDOMElement();
  });
});
