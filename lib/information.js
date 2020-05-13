// todas as notas foram calculadas à parte usando REGEXP

// textos à parte foram removidos manualmente (um no começo e outro no final)

// REGEX

// para remover número de páginas
// /^\d+$/gm

// para remover linhas vazias
// /^(?:[\t ]*(?:\r?\n|\r))+/gm

// para juntar todas as linhas (troque por: ' ' [um espaço])
// (?:[\t ]*(?:\r?\n|\r))+

// para contar quantas pessoas (depois divida pela quantidade de notas por pessoa) (count ou match)
// /\d+\.\d+/g

// adicione um espaço no final e utilize


// DEFINITIVO (5 NOTAS)
// para conseguir nota da redação
// /\d+, \w+[ \w]+, \d+\.\d+, \d+\.\d+, \d+\.\d+, \d+\.\d+, /g

// para conseguir nota das questões de tipo D
// /\d+, \w+[ \w]+, \d+\.\d+, \d+\.\d+, \d+\.\d+, /g
// /, \d+\.\d+/g

// para conseguir nota das questões da segunda parte
// /\d+, \w+[ \w]+, \d+\.\d+, /g
// /, \d+\.\d+/g

// para conseguir nota das questões da primeira parte
// /\d+, \w+[ \w]+, /g
// /, \d+\.\d+/g

// PROVISÓRIO (2 NOTAS)
// para conseguir nota da redação
// /\d+, \w+[ \w]+, \d+\.\d+, /g

// para conseguir nota das questões de tipo D
// /\d+, \w+[ \w]+, /g
// /, \d+\.\d+/g

// cuidado por eventuais pontos (troque por ' + ') (/\. /g)
// troque as barras por '+' para calcular em javascript no console de um navegador


let resultado;

// carregar elemento 'resultado' assim que a página carregar
function start() {
  resultado = document.getElementById('resultado');
}

// calcular media e arredondar para 3 decimais
function media(nota, pessoas, roundNumber = 1000) {
  return Math.round(((nota / pessoas) + Number.EPSILON) * roundNumber) / roundNumber;
}

// organizar notas para ficarem mais organizadas na página
function organizeNotes(notas, pessoas) {
  // notas sempre em array [it1, it2, it3...]
  // 0ª = redação
  // 1ª = tipo D
  // 2ª = parte 1 
  // 3ª = parte 2
  // 4ª = partes
  // tirar media aritmética de cada nota
  notas = notas.map(nota => {
    nota = media(nota, pessoas);
    nota = nota.toString();
    while (nota.length < 16) nota = ` ${nota}`;
    return nota;
  });
  //const de = `<span class="inf">de</span>`;
  let output = `<span class="name"> Redação:</span> ${notas[0]}`;
  output = `${output}\n<span class="name"> Tipo D:</span> ${notas[1]}`;
  // se for definitivo
  if (notas.length === 5) {
    output = `${output}\n<span class="name"> Parte 1:</span> ${notas[2]}`;
    output = `${output}\n<span class="name"> Parte 2:</span> ${notas[3]}`;
    output = `${output}\n<span class="name"> Partes Juntas:</span> ${notas[4]}`;
  }
  return output;
}

// arquivos para o cálculo
function arquivos() {
  resultado.innerHTML = `<a download href="./lib/pdfs/ED_5_PAS_1_2019-2021_prov_itens_tipo_D_e_redacao.pdf">PDF Provisório 2019</a>
    <a download href="./lib/pdfs/ED_6_PAS_1_2019-2021_fin_itens_tipo_D_e_redacao.pdf">PDF Definitivo 2019</a>`
}

// provisório 2019
function p2019() {
  const p = 23806;

  // soma de notas
  const redacao = 149254.35399999868;
  const tipoD = 20905.00200000013;

  resultado.innerHTML = organizeNotes([redacao, tipoD], p);
}

// definitivo 2019
function d2019() {
  const p = 23806;

  // soma de notas
  const redacao = 149334.71699999872;
  const tipoD = 20928.42800000015;
  const parte1 = 86177.7229999991;
  const parte2 = 549003.2630000036;
  const partes = parte1 + parte2;

  resultado.innerHTML = organizeNotes([redacao, tipoD, parte1, parte2, partes], p);
}