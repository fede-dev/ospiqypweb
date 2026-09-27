/**
 * CAPA 3 — ProvidersTable (cartilla de prestadores, /prestadores).
 *
 * Testeamos el CONTRATO: qué entra (props + interacción del usuario) y qué
 * se ve (conteo, tarjetas, mensaje de vacío). Nada de estado interno ni de
 * clases de Tailwind: la idea es que un refactor de la implementación no
 * rompa estos tests, y que sí los rompa un cambio de comportamiento.
 */
import { describe, it, expect } from "vitest";
import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import { ProvidersTable } from "@/components/shared/ProvidersTable";
import {
  PROVIDERS,
  type Provider,
  type ProviderCategory,
  type ProviderZone,
} from "@/content/providers";

/** El PAGE_SIZE real del componente. Si cambia allá, este test lo delata. */
const PAGE_SIZE = 40;

const ZONES: ProviderZone[] = [
  "Capital Federal",
  "Zona Sur",
  "Zona Oeste",
  "Zona Norte",
  "Provincia de Buenos Aires",
];

const CATEGORIES: ProviderCategory[] = [
  "Clínicas y Sanatorios",
  "Centros de Diagnóstico",
  "Kinesiología",
  "Odontología",
  "Farmacias",
  "Ópticas",
];

/** Monta el componente con los datos REALES de la cartilla. */
function renderReal() {
  return render(
    <ProvidersTable items={PROVIDERS} zones={ZONES} categories={CATEGORIES} />,
  );
}

/** Cantidad de tarjetas de prestador visibles ahora mismo. */
function tarjetasVisibles(): number {
  const lista = screen.queryByRole("list");
  return lista ? within(lista).queryAllByRole("heading", { level: 3 }).length : 0;
}

const buscador = () => screen.getByRole("searchbox", { name: /buscar prestador/i });
const filtroCategoria = () =>
  screen.getByRole("combobox", { name: /filtrar por categoría/i });
const filtroZona = () => screen.getByRole("combobox", { name: /filtrar por zona/i });

describe("ProvidersTable", () => {
  it("al montar muestra el total de prestadores y la primera página", () => {
    renderReal();

    expect(
      screen.getByText(`${PROVIDERS.length} prestadores`),
    ).toBeInTheDocument();
    expect(tarjetasVisibles()).toBe(PAGE_SIZE);
  });

  it("tipear en el buscador filtra los resultados", async () => {
    const user = userEvent.setup();
    renderReal();

    await user.type(buscador(), "Climédica");

    const esperados = PROVIDERS.filter((p) =>
      p.name.toLowerCase().includes("climédica"),
    ).length;

    expect(esperados).toBeGreaterThan(0);
    expect(tarjetasVisibles()).toBe(esperados);
    expect(screen.getByRole("heading", { name: "Climédica" })).toBeInTheDocument();
  });

  it("la búsqueda también matchea por localidad y por dirección", async () => {
    const user = userEvent.setup();
    renderReal();

    await user.type(buscador(), "Belgrano");

    const esperados = PROVIDERS.filter((p) => {
      const q = "belgrano";
      return (
        p.name.toLowerCase().includes(q) ||
        (p.locality?.toLowerCase().includes(q) ?? false) ||
        (p.address?.toLowerCase().includes(q) ?? false) ||
        (p.specialties?.some((s) => s.toLowerCase().includes(q)) ?? false)
      );
    }).length;

    expect(esperados).toBeGreaterThan(0);
    expect(screen.getByText(new RegExp(`^${esperados} prestador`))).toBeInTheDocument();
  });

  /**
   * La búsqueda por especialidad se agregó junto con las especialidades de
   * odontología (campo `specialties`). Sin este test, un refactor del filtro
   * que se olvide de `specialties` no rompería nada visible: el resto de la
   * búsqueda seguiría andando.
   */
  it("busca por especialidad: 'endodoncia' encuentra a Rubini Leonardo", async () => {
    const user = userEvent.setup();
    renderReal();

    await user.type(buscador(), "endodoncia");

    expect(tarjetasVisibles()).toBeGreaterThan(0);
    expect(
      screen.getByRole("heading", { name: "Rubini Leonardo" }),
    ).toBeInTheDocument();
  });

  it("filtrar por categoría 'Odontología' da 15 prestadores", async () => {
    const user = userEvent.setup();
    renderReal();

    await user.selectOptions(filtroCategoria(), "Odontología");

    // 15 es el dato real de la cartilla 2026. Si mañana se suman odontólogos
    // hay que actualizar el número a conciencia — el test es el recordatorio
    // de que el conteo que ve el afiliado cambió.
    expect(screen.getByText("15 prestadores")).toBeInTheDocument();
    expect(tarjetasVisibles()).toBe(15);
  });

  it("los filtros de zona y categoría se combinan (AND, no OR)", async () => {
    const user = userEvent.setup();
    renderReal();

    await user.selectOptions(filtroCategoria(), "Farmacias");
    await user.selectOptions(filtroZona(), "Capital Federal");

    const esperados = PROVIDERS.filter(
      (p) => p.category === "Farmacias" && p.zone === "Capital Federal",
    ).length;

    expect(esperados).toBeGreaterThan(0);
    expect(esperados).toBeLessThan(
      PROVIDERS.filter((p) => p.category === "Farmacias").length,
    );
    expect(screen.getByText(`${esperados} prestadores`)).toBeInTheDocument();
  });

  it("sin resultados muestra el mensaje correcto y ninguna tarjeta", async () => {
    const user = userEvent.setup();
    renderReal();

    await user.type(buscador(), "zzzzz-no-existe");

    expect(
      screen.getByText("No se encontraron prestadores para tu búsqueda."),
    ).toBeInTheDocument();
    expect(tarjetasVisibles()).toBe(0);
    expect(
      screen.queryByRole("button", { name: /ver más prestadores/i }),
    ).not.toBeInTheDocument();
  });

  it("'Ver más' suma PAGE_SIZE resultados", async () => {
    const user = userEvent.setup();
    renderReal();

    expect(tarjetasVisibles()).toBe(PAGE_SIZE);

    await user.click(screen.getByRole("button", { name: /ver más prestadores/i }));

    expect(tarjetasVisibles()).toBe(PAGE_SIZE * 2);
  });

  it("el botón 'Ver más' informa cuántos faltan y desaparece al llegar al final", async () => {
    const user = userEvent.setup();
    const pocos: Provider[] = PROVIDERS.slice(0, PAGE_SIZE + 3);

    render(
      <ProvidersTable items={pocos} zones={ZONES} categories={CATEGORIES} />,
    );

    expect(
      screen.getByRole("button", { name: /ver más prestadores \(3 restantes\)/i }),
    ).toBeInTheDocument();

    await user.click(screen.getByRole("button", { name: /ver más prestadores/i }));

    expect(tarjetasVisibles()).toBe(pocos.length);
    expect(
      screen.queryByRole("button", { name: /ver más prestadores/i }),
    ).not.toBeInTheDocument();
  });

  /**
   * El paginado tiene que resetearse al cambiar el filtro: si el usuario hizo
   * "Ver más" tres veces y después busca otra cosa, no queremos que vea 160
   * resultados de golpe (ni que el "Ver más" cuente mal).
   */
  it("cambiar la búsqueda resetea el paginado a PAGE_SIZE", async () => {
    const user = userEvent.setup();
    renderReal();

    await user.click(screen.getByRole("button", { name: /ver más prestadores/i }));
    expect(tarjetasVisibles()).toBe(PAGE_SIZE * 2);

    await user.type(buscador(), "a");

    expect(tarjetasVisibles()).toBeLessThanOrEqual(PAGE_SIZE);
  });

  it("cambiar el filtro de categoría también resetea el paginado", async () => {
    const user = userEvent.setup();
    renderReal();

    await user.click(screen.getByRole("button", { name: /ver más prestadores/i }));
    expect(tarjetasVisibles()).toBe(PAGE_SIZE * 2);

    await user.selectOptions(filtroCategoria(), "Farmacias");

    expect(tarjetasVisibles()).toBe(PAGE_SIZE);
  });

  it("el botón limpiar resetea la búsqueda Y el paginado", async () => {
    const user = userEvent.setup();
    renderReal();

    // Buscamos algo con muchos resultados y paginamos.
    await user.type(buscador(), "farmacia");
    const limpiar = screen.getByRole("button", { name: /limpiar búsqueda/i });

    await user.click(limpiar);

    expect(buscador()).toHaveValue("");
    expect(
      screen.getByText(`${PROVIDERS.length} prestadores`),
    ).toBeInTheDocument();
    // Y volvió a la primera página, no al estado paginado de antes.
    expect(tarjetasVisibles()).toBe(PAGE_SIZE);
    // El botón de limpiar sólo existe si hay texto: al limpiar, se va.
    expect(
      screen.queryByRole("button", { name: /limpiar búsqueda/i }),
    ).not.toBeInTheDocument();
  });

  it("el conteo usa singular cuando hay un solo resultado", async () => {
    const user = userEvent.setup();
    renderReal();

    await user.type(buscador(), "Rubini Leonardo");

    expect(screen.getByText("1 prestador")).toBeInTheDocument();
  });

  it("cada tarjeta con teléfono ofrece un link tel: marcable", async () => {
    const user = userEvent.setup();
    renderReal();

    await user.type(buscador(), "Rubini Leonardo");

    const link = screen.getByRole("link", { name: /02226-15-471010/ });
    // El componente arma el tel: con el PRIMER número (antes de la "/").
    expect(link).toHaveAttribute("href", "tel:0222615471010");
  });
});
