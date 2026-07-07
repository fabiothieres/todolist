const inputTarefa = document.querySelector(".input-tarefa");
const inputTitulo = document.querySelector("#titulo");
const btnTarefa = document.querySelector(".btn-tarefa");
const tarefas = document.querySelector(".tarefas");
const cor = document.querySelector("#cor");
const fundo1 = document.querySelector(".tit-data");
const fundo2 = document.querySelector(".nav");
const titulo = document.querySelector("#tit-definido");
const data = document.querySelector("#data");
const dataAlterada = document.querySelector(".dataDef");

// sessão data

data.addEventListener("change", (e) => {
  let dataEscolhida = e.target.value;
  let dataFormatada = dataEscolhida.split("-").reverse().join("/");
  dataAlterada.innerHTML = dataFormatada;
  salvaData();
});

// sessão cor

cor.addEventListener("change", (e) => {
  fundo1.style.backgroundColor = cor.value;
  fundo2.style.backgroundColor = cor.value;
  const corEscolhida = cor.value;
  salvaCor(corEscolhida);
});

function salvaCor(corEscolhida) {
  localStorage.setItem("corSalva", JSON.stringify(corEscolhida));
}

function adcCorSalva() {
  const corSalva = localStorage.getItem("corSalva");

  if (!corSalva) return;

  const corEscolhida = JSON.parse(corSalva);
  fundo1.style.backgroundColor = corEscolhida;
  fundo2.style.backgroundColor = corEscolhida;
  cor.value = corEscolhida;
}

// sessão título

function mudaTitulo(texto) {
  let tituloFinal = texto || inputTitulo.value;
  titulo.innerHTML = tituloFinal;
  inputTitulo.value = "";

  localStorage.setItem("titulo", JSON.stringify(tituloFinal));
}

inputTitulo.addEventListener("keypress", (e) => {
  if (e.key == "Enter") {
    e.preventDefault();
    mudaTitulo();
  }
});

document.querySelector(".def").addEventListener("click", () => {
  if (!inputTitulo.value) return;
  mudaTitulo();
});

// sessão criar

function criaTarefa(texto) {
  const li = criaLi();
  li.innerText = texto;
  apagar(li);
  tarefas.appendChild(li);
  limpaInput();
  salvarTarefas();
}

function criaLi() {
  const li = document.createElement("li");
  return li;
}

function limpaInput() {
  inputTarefa.value = "";
  inputTarefa.focus();
}

inputTarefa.addEventListener("keypress", (e) => {
  if (e.key === "Enter") {
    if (!inputTarefa.value) return;
    criaTarefa(inputTarefa.value);
  }
});

btnTarefa.addEventListener("click", () => {
  if (!inputTarefa.value) return;
  criaTarefa(inputTarefa.value);
});

// sessão apagar

function apagar(li) {
  li.innerText += " ";
  const btnApagar = document.createElement("button");
  btnApagar.innerText = "Apagar";
  btnApagar.setAttribute("class", "apagar");
  li.appendChild(btnApagar);
}

document.addEventListener("click", (e) => {
  const el = e.target;
  if (el.classList.contains("apagar")) {
    el.parentElement.remove();
    salvarTarefas();
  }
});

// sessão salvar

function salvarTarefas() {
  const liTarefas = tarefas.querySelectorAll("li");
  const listaDeTarefas = [];

  for (let tarefa of liTarefas) {
    let tarefaTexto = tarefa.innerText;
    tarefaTexto = tarefaTexto.replace("Apagar", "").trim();
    listaDeTarefas.push(tarefaTexto);
  }

  const tarefasJSON = JSON.stringify(listaDeTarefas);
  localStorage.setItem("tarefas", tarefasJSON);
}

function adcTarefasSalvas() {
  const tarefasSalvas = localStorage.getItem("tarefas");
  if (!tarefasSalvas) return;
  let listaDeTarefas = JSON.parse(tarefasSalvas);

  for (let tarefa of listaDeTarefas) {
    criaTarefa(tarefa);
  }
}

function salvaData() {
  const dataJSON = JSON.stringify(dataAlterada.innerHTML);
  localStorage.setItem("datas", dataJSON);
}

function adcData() {
  const dataS = localStorage.getItem("datas");

  if (!dataS) return;
  const dataNaTela = JSON.parse(dataS);

  dataAlterada.innerHTML = dataNaTela;
}

function adcTituloSalvo() {
  const tituloS = localStorage.getItem("titulo");

  if (!tituloS) return;

  const tituloNaTela = JSON.parse(tituloS);

  mudaTitulo(tituloNaTela);
}

adcData();
adcTituloSalvo();
adcTarefasSalvas();
adcCorSalva();
