/**
 * CAPA 3 — SearchDialog (buscador global del header).
 *
 * Es el único componente que puede mandar al usuario a cualquier parte del
 * sitio, y corre 100% en el cliente (Fuse.js sobre un índice estático). El
 * contrato que testeamos: qué tipea el usuario → qué resultados ve y a dónde
 * lo llevan.
 *
 * No testeamos el ranking de Fuse (es implementación de la librería), sí que
 * los términos que el propio placeholder sugiere devuelvan algo: si el índice
 * se rompe, el buscador queda mudo sin que nada falle en el build.
 */
import { describe, it, expect } from "vitest";
import { useState } from "react";
import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import { SearchDialog } from "@/components/search/SearchDialog";

/**
 * Padre controlado, igual a como lo usa `SearchTrigger` en la app: el estado
 * `open` es del padre y sólo cambia a través de `onOpenChange`.
 */
function Harness() {
  const [open, setOpen] = useState(false);
  return (
    <>
      <button type="button" onClick={() => setOpen(true)}>
        Abrir
      </button>
      <SearchDialog open={open} onOpenChange={setOpen} />
    </>
  );
}

function renderAbierto() {
  return render(<SearchDialog open onOpenChange={() => {}} />);
}

const input = () => screen.getByRole("textbox", { name: /término de búsqueda/i });

/** Links de resultado dentro del diálogo. */
function resultados(): HTMLAnchorElement[] {
  const dialogo = screen.getByRole("dialog");
  return within(dialogo).queryAllByRole("link") as HTMLAnchorElement[];
}

describe("SearchDialog", () => {
  it("cerrado no renderiza nada", () => {
    render(<SearchDialog open={false} onOpenChange={() => {}} />);
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
  });

  it("abierto y vacío muestra el estado inicial, sin resultados", () => {
    renderAbierto();

    expect(
      screen.getByText(/empezá a tipear para buscar en el sitio/i),
    ).toBeInTheDocument();
    expect(resultados()).toHaveLength(0);
  });

  it("tipear filtra los resultados", async () => {
    const user = userEvent.setup();
    renderAbierto();

    await user.type(input(), "credencial");

    const links = resultados();
    expect(links.length).toBeGreaterThan(0);
    expect(
      screen.queryByText(/empezá a tipear para buscar en el sitio/i),
    ).not.toBeInTheDocument();
  });

  /**
   * Los tres términos que el propio diálogo sugiere ("credencial", "Córdoba",
   * "discapacidad"). Si alguno deja de devolver resultados, el sitio le está
   * proponiendo al afiliado una búsqueda que no encuentra nada.
   */
  it.each(["credencial", "Córdoba", "discapacidad"])(
    "el término sugerido %s devuelve resultados",
    async (termino) => {
      const user = userEvent.setup();
      renderAbierto();

      await user.type(input(), termino);

      expect(resultados().length).toBeGreaterThan(0);
    },
  );

  it("los resultados apuntan a URLs internas o https, nunca vacías", async () => {
    const user = userEvent.setup();
    renderAbierto();

    await user.type(input(), "delegación");

    const hrefs = resultados().map((a) => a.getAttribute("href") ?? "");
    expect(hrefs.length).toBeGreaterThan(0);
    for (const href of hrefs) {
      expect(href).toMatch(/^(\/|https:\/\/)/);
    }
  });

  it("agrupa los resultados bajo su categoría", async () => {
    const user = userEvent.setup();
    renderAbierto();

    // "Formulario" tiene que traer items de la categoría Formularios.
    await user.type(input(), "formulario");

    expect(resultados().length).toBeGreaterThan(0);
    const dialogo = screen.getByRole("dialog");
    // getAllByText: "Formularios" también aparece como título de algún item,
    // no sólo como encabezado de grupo. Nos alcanza con que el grupo exista.
    expect(within(dialogo).getAllByText("Formularios").length).toBeGreaterThan(0);
  });

  it("sin resultados muestra el mensaje correcto con el término buscado", async () => {
    const user = userEvent.setup();
    renderAbierto();

    await user.type(input(), "xqzwv");

    expect(screen.getByText(/no encontramos resultados para/i)).toBeInTheDocument();
    expect(screen.getByText('"xqzwv"')).toBeInTheDocument();
    expect(resultados()).toHaveLength(0);
  });

  it("borrar el término vuelve al estado inicial", async () => {
    const user = userEvent.setup();
    renderAbierto();

    await user.type(input(), "credencial");
    expect(resultados().length).toBeGreaterThan(0);

    await user.clear(input());

    expect(
      screen.getByText(/empezá a tipear para buscar en el sitio/i),
    ).toBeInTheDocument();
    expect(resultados()).toHaveLength(0);
  });

  it("un término de sólo espacios se trata como búsqueda vacía", async () => {
    const user = userEvent.setup();
    renderAbierto();

    await user.type(input(), "   ");

    // No queremos "No encontramos resultados para '   '": eso sería ruido.
    expect(
      screen.getByText(/empezá a tipear para buscar en el sitio/i),
    ).toBeInTheDocument();
  });

  it("hacer click en un resultado cierra el diálogo", async () => {
    const user = userEvent.setup();
    let abierto = true;
    const onOpenChange = (next: boolean) => {
      abierto = next;
    };

    render(<SearchDialog open onOpenChange={onOpenChange} />);
    await user.type(input(), "credencial");
    await user.click(resultados()[0]);

    expect(abierto).toBe(false);
  });

  it("el botón de cerrar avisa al padre", async () => {
    const user = userEvent.setup();
    let abierto = true;
    render(
      <SearchDialog
        open
        onOpenChange={(next) => {
          abierto = next;
        }}
      />,
    );

    await user.click(screen.getByRole("button", { name: /cerrar buscador/i }));

    expect(abierto).toBe(false);
  });

  it("reabrir el diálogo no arrastra la búsqueda anterior", async () => {
    // El diálogo limpia el query al cerrarse: si no lo hiciera, el afiliado
    // reabre el buscador y se encuentra con los resultados de la vez pasada.
    // Lo ejercitamos por el camino real (SearchTrigger es el único dueño del
    // estado `open` en la app, y siempre lo cambia vía `onOpenChange`).
    const user = userEvent.setup();
    render(<Harness />);

    await user.click(screen.getByRole("button", { name: /abrir/i }));
    await user.type(input(), "credencial");
    expect(resultados().length).toBeGreaterThan(0);

    await user.click(screen.getByRole("button", { name: /cerrar buscador/i }));
    await user.click(screen.getByRole("button", { name: /abrir/i }));

    expect(input()).toHaveValue("");
    expect(
      screen.getByText(/empezá a tipear para buscar en el sitio/i),
    ).toBeInTheDocument();
  });

  it("limita la cantidad de resultados para no volcar el índice entero", async () => {
    // El componente corta en 30: un término muy genérico no puede pintar
    // cientos de links en un panel scrolleable.
    const user = userEvent.setup();
    renderAbierto();

    await user.type(input(), "a");

    expect(resultados().length).toBeLessThanOrEqual(30);
  });
});
