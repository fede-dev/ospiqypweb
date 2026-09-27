import { describe, expect, it } from "vitest";
import { telHref } from "@/lib/phone";
import { PROVIDERS } from "@/content/providers";

/**
 * Los casos salen de src/content/providers.ts tal como están cargados, no de
 * lo que uno imagina que hay: 115 prestadores tienen dos números separados
 * por "/" y el link tiene que marcar el primero.
 */
describe("telHref", () => {
  it("marca sólo el primer número cuando hay dos separados por barra", () => {
    expect(telHref("4961-4917 / 4962-5949")).toBe("tel:49614917");
    expect(telHref("4943-0183 / 1497")).toBe("tel:49430183");
  });

  it("deja sólo dígitos y el + cuando hay un único número", () => {
    expect(telHref("02226-15-471010")).toBe("tel:0222615471010");
    expect(telHref("(011) 5275-2270")).toBe("tel:01152752270");
    expect(telHref("+54 9 11 4063-7171")).toBe("tel:+5491140637171");
  });

  it("ningún prestador real con dos números termina con los dos pegados", () => {
    const conDosNumeros = PROVIDERS.filter((p) => p.phone?.includes("/"));
    expect(conDosNumeros.length).toBeGreaterThan(100);
    for (const p of conDosNumeros) {
      const digitos = telHref(p.phone!).replace(/\D/g, "");
      const primero = p.phone!.split("/")[0].replace(/\D/g, "");
      expect(digitos).toBe(primero);
    }
  });
});
