const filtrosVitrine = document.querySelectorAll("[data-vitrine-filtro]");
const produtosVitrine = document.querySelectorAll("[data-vitrine-categoria]");
const formularioCompatibilidade = document.querySelector("#compatibilidade-form");

const modelosPorMarca = {
	Apple: ["iPhone 15", "iPhone 15 Pro", "iPhone 16", "iPhone 16 Pro"],
	Samsung: ["Galaxy A15", "Galaxy A35", "Galaxy S24", "Galaxy S24 Ultra"],
	Motorola: ["Moto G54", "Moto G84", "Edge 50", "Edge 50 Pro"],
	Xiaomi: ["Redmi Note 13", "Redmi Note 13 Pro", "POCO X6", "Xiaomi 14"]
};

filtrosVitrine.forEach((filtro) => {
	filtro.addEventListener("click", () => {
		const categoriaSelecionada = filtro.dataset.vitrineFiltro;

		filtrosVitrine.forEach((outroFiltro) => {
			const estaAtivo = outroFiltro === filtro;
			outroFiltro.classList.toggle("ativo", estaAtivo);
			outroFiltro.setAttribute("aria-pressed", String(estaAtivo));
		});

		produtosVitrine.forEach((produto) => {
			const mostrarProduto = categoriaSelecionada === "todos"
				|| produto.dataset.vitrineCategoria === categoriaSelecionada;
			produto.hidden = !mostrarProduto;
		});
	});
});

if (formularioCompatibilidade) {
	const marcaCelular = formularioCompatibilidade.querySelector("#marca-celular");
	const modeloCelular = formularioCompatibilidade.querySelector("#modelo-celular");
	const statusCompatibilidade = formularioCompatibilidade.querySelector("#compatibilidade-status");

	marcaCelular.addEventListener("change", () => {
		modeloCelular.replaceChildren(new Option("Selecione o modelo", ""));
		const modelos = modelosPorMarca[marcaCelular.value] || [];

		modelos.forEach((modelo) => {
			modeloCelular.add(new Option(modelo, modelo));
		});

		modeloCelular.disabled = modelos.length === 0;
		statusCompatibilidade.hidden = true;
	});

	formularioCompatibilidade.addEventListener("submit", (evento) => {
		evento.preventDefault();

		const marca = marcaCelular.value;
		const modelo = modeloCelular.value;
		statusCompatibilidade.textContent = `${marca} ${modelo} selecionado. Confira as opções na vitrine e confirme a compatibilidade com a Conexa.`;
		statusCompatibilidade.hidden = false;

		document.querySelector("#vitrine")?.scrollIntoView({ behavior: "smooth", block: "start" });
	});
}
