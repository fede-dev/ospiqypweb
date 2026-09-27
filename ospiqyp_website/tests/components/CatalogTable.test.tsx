/**
 * CAPA 3 — CatalogTable (Anexo II del PMOE, /programa-medico-obligatorio).
 *
 * Es la tabla más pesada del sitio (miles de códigos), así que el paginado no
 * es cosmético: sin él la página no renderiza. Testeamos el contrato de
 * búsqueda + filtro + paginado con los datos reales del catálogo.
 */
import { describe, it, expect } from "vitest";
import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import { CatalogTable } from "@/components/shared/CatalogTable";
import {
  PMO_CATALOGO,
  PMO_CATALOGO_CATEGORIAS,
  type CatalogoItem,
} from "@/content/pmo-catalogo";

/** El PAGE_SIZE real del componente. */
const PAGE_SIZE = 60;

function renderReal() {
  return render(
    <CatalogTable items={PMO_CATALOGO} categories={PMO_CATALOGO_CATEGORIAS} />,
  );
}

/** Filas de datos visibles (excluye la del <thead>). */
function filasVisibles(): number {
  const tabla = screen.queryByRole("table");
  if (!tabla) return 0;
  const cuerpo = within(tabla).getAllByRole("rowgroup")[1];
  return within(cuerpo).queryAllByRole("row").length;
}

const buscador = () =>
  screen.getByRole("searchbox", { name: /buscar en el catálogo/i });
const filtroCategoria = () =>
  screen.getByRole("combobox", { name: /filtrar por categoría/i });

/**
 * Matcher del conteo tolerante a la ortografía del plural.
 *
 * ⚠️ BUG REAL EN src/ (ver el `it.fail` del final de este archivo): el
 * componente arma el plural como `prestación` + `es` y escupe
 * "684 prestaciónes", con la tilde que en el plural NO va. Como acá lo que
 * nos importa es el NÚMERO (el contrato de filtrado), matcheamos el stem
 * "prestaci…" y dejamos el problema de copy a su propio test.
 */
const conteo = (n: number, sufijo = "") =>
  new RegExp(`^${n} prestaci\\S* ${sufijo}`.trim());

describe("CatalogTable", () => {
  it("al montar muestra el total y sólo la primera página de filas", () => {
    renderReal();

    expect(PMO_CATALOGO.length).toBeGreaterThan(PAGE_SIZE);
    expect(
      screen.getByText(conteo(PMO_CATALOGO.length, "en total")),
    ).toBeInTheDocument();
    expect(filasVisibles()).toBe(PAGE_SIZE);
  });

  it("tipear en el buscador filtra por descripción", async () => {
    const user = userEvent.setup();
    renderReal();

    await user.type(buscador(), "biopsia");

    const esperados = PMO_CATALOGO.filter(
      (i) =>
        i.code.includes("biopsia") ||
        i.description.toLowerCase().includes("biopsia") ||
        (i.note?.toLowerCase().includes("biopsia") ?? false),
    ).length;

    expect(esperados).toBeGreaterThan(0);
    expect(
      screen.getByText(new RegExp(`^${esperados} prestaci`)),
    ).toBeInTheDocument();
  });

  it("tipear un código encuentra la práctica exacta", async () => {
    const user = userEvent.setup();
    renderReal();

    const alguno = PMO_CATALOGO[10];
    await user.type(buscador(), alguno.code);

    expect(screen.getByText(alguno.code)).toBeInTheDocument();
  });

  it("filtrar por categoría deja sólo esa categoría", async () => {
    const user = userEvent.setup();
    renderReal();

    const categoria = PMO_CATALOGO_CATEGORIAS[0];
    await user.selectOptions(filtroCategoria(), categoria);

    const esperados = PMO_CATALOGO.filter((i) => i.category === categoria).length;
    expect(esperados).toBeGreaterThan(0);
    expect(esperados).toBeLessThan(PMO_CATALOGO.length);
    expect(
      screen.getByText(new RegExp(`^${esperados} prestaci`)),
    ).toBeInTheDocument();
  });

  it("sin resultados muestra el mensaje correcto y ninguna tabla", async () => {
    const user = userEvent.setup();
    renderReal();

    await user.type(buscador(), "zzzzz-no-existe");

    expect(
      screen.getByText("No se encontraron prestaciones para tu búsqueda."),
    ).toBeInTheDocument();
    expect(screen.queryByRole("table")).not.toBeInTheDocument();
    expect(
      screen.queryByRole("button", { name: /ver más prestaciones/i }),
    ).not.toBeInTheDocument();
  });

  it("'Ver más' suma PAGE_SIZE filas", async () => {
    const user = userEvent.setup();
    renderReal();

    expect(filasVisibles()).toBe(PAGE_SIZE);

    await user.click(screen.getByRole("button", { name: /ver más prestaciones/i }));

    expect(filasVisibles()).toBe(PAGE_SIZE * 2);
  });

  it("el 'Ver más' informa cuántas faltan y desaparece al llegar al final", async () => {
    const user = userEvent.setup();
    const pocos: CatalogoItem[] = PMO_CATALOGO.slice(0, PAGE_SIZE + 2);

    render(<CatalogTable items={pocos} categories={PMO_CATALOGO_CATEGORIAS} />);

    expect(
      screen.getByRole("button", { name: /ver más prestaciones \(2 restantes\)/i }),
    ).toBeInTheDocument();

    await user.click(screen.getByRole("button", { name: /ver más prestaciones/i }));

    expect(filasVisibles()).toBe(pocos.length);
    expect(
      screen.queryByRole("button", { name: /ver más prestaciones/i }),
    ).not.toBeInTheDocument();
  });

  it("cambiar la búsqueda resetea el paginado", async () => {
    const user = userEvent.setup();
    renderReal();

    await user.click(screen.getByRole("button", { name: /ver más prestaciones/i }));
    expect(filasVisibles()).toBe(PAGE_SIZE * 2);

    await user.type(buscador(), "de");

    expect(filasVisibles()).toBeLessThanOrEqual(PAGE_SIZE);
  });

  it("el botón limpiar resetea la búsqueda Y el paginado", async () => {
    const user = userEvent.setup();
    renderReal();

    await user.type(buscador(), "de");
    await user.click(screen.getByRole("button", { name: /ver más prestaciones/i }));

    await user.click(screen.getByRole("button", { name: /limpiar búsqueda/i }));

    expect(buscador()).toHaveValue("");
    expect(
      screen.getByText(conteo(PMO_CATALOGO.length, "en total")),
    ).toBeInTheDocument();
    expect(filasVisibles()).toBe(PAGE_SIZE);
    expect(
      screen.queryByRole("button", { name: /limpiar búsqueda/i }),
    ).not.toBeInTheDocument();
  });

  it("el conteo dice 'en total' sin filtros y 'encontradas' con filtros", async () => {
    const user = userEvent.setup();
    renderReal();

    expect(screen.getByText(/prestaci\S* en total$/)).toBeInTheDocument();

    await user.type(buscador(), "biopsia");

    expect(screen.getByText(/prestaci\S* encontrada/)).toBeInTheDocument();
  });

  /**
   * Regresión de un bug que estuvo en producción: el plural se armaba
   * concatenando `prestación${n === 1 ? "" : "es"}`, y daba "prestaciónes".
   * Al pluralizar, la palabra pasa de aguda a grave y pierde la tilde.
   * Se leía en TODA visita a /programa-medico-obligatorio/, en el conteo de
   * arriba de la tabla: "684 prestaciónes en total".
   *
   * Lo encontró este mismo test antes de que existiera el arreglo.
   */
  it("pluraliza 'prestaciones' sin la tilde de la forma singular", () => {
    renderReal();
    expect(
      screen.getByText(`${PMO_CATALOGO.length} prestaciones en total`),
    ).toBeInTheDocument();
    expect(screen.queryByText(/prestaciónes/)).not.toBeInTheDocument();
  });
});
