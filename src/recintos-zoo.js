class RecintosZoo {
    constructor() {
      this.recintos = [
        { numero: 1, bioma: "savana", tamanhoTotal: 10, animaisExistentes: [{ especie: "macaco", quantidade: 3 }] },
        { numero: 2, bioma: "floresta", tamanhoTotal: 5, animaisExistentes: [] },
        { numero: 3, bioma: "savana e rio", tamanhoTotal: 7, animaisExistentes: [{ especie: "gazela", quantidade: 1 }] },
        { numero: 4, bioma: "rio", tamanhoTotal: 8, animaisExistentes: [] },
        { numero: 5, bioma: "savana", tamanhoTotal: 9, animaisExistentes: [{ especie: "leao", quantidade: 1 }] }
      ];
  
      this.animais = {
        leao: { tamanho: 3, biomas: ["savana"] },
        leopardo: { tamanho: 2, biomas: ["savana"] },
        crocodilo: { tamanho: 3, biomas: ["rio"] },
        macaco: { tamanho: 1, biomas: ["savana", "floresta"] },
        gazela: { tamanho: 2, biomas: ["savana"] },
        hipopotamo: { tamanho: 4, biomas: ["savana", "rio"] }
      };
    }
  
    analisaRecintos(tipoAnimal, quantidade) {
      // Validação de entradas
      const especie = tipoAnimal.toLowerCase();
      if (!this.animais[especie]) {
        return { erro: "Animal inválido" };
      }
      if (isNaN(quantidade) || quantidade <= 0) {
        return { erro: "Quantidade inválida" };
      }
  
      const animal = this.animais[especie];
      const recintosViaveis = [];
  
      // Iteração sobre os recintos existentes
      this.recintos.forEach(recinto => {
        const biomaAdequado = animal.biomas.includes(recinto.bioma) ||
          (animal.biomas.length > 1 && recinto.bioma === "savana e rio");
        
        if (!biomaAdequado) return;
  
        let totalEspacoOcupado = 0;
        let especieCarnivora = ["leao", "leopardo", "crocodilo"].includes(especie);
        let possuiEspecieCarnivora = false;
        let possuiHipopotamo = false;
  
        recinto.animaisExistentes.forEach(a => {
          totalEspacoOcupado += this.animais[a.especie].tamanho * a.quantidade;
          if (["leao", "leopardo", "crocodilo"].includes(a.especie)) possuiEspecieCarnivora = true;
          if (a.especie === "hipopotamo") possuiHipopotamo = true;
        });
  
        if (especieCarnivora && recinto.animaisExistentes.length > 0) return;
        if (possuiEspecieCarnivora && especie !== recinto.animaisExistentes[0].especie) return;
        if (possuiHipopotamo && animal.biomas.length === 1) return;
  
        let espacoNecessario = animal.tamanho * quantidade;
        if (recinto.animaisExistentes.length > 0) espacoNecessario++;
  
        if (totalEspacoOcupado + espacoNecessario <= recinto.tamanhoTotal) {
          recintosViaveis.push({
            numero: recinto.numero,
            espacoLivre: recinto.tamanhoTotal - (totalEspacoOcupado + espacoNecessario),
            tamanhoTotal: recinto.tamanhoTotal
          });
        }
      });
  
      if (recintosViaveis.length === 0) return { erro: "Não há recinto viável" };
  
      recintosViaveis.sort((a, b) => a.numero - b.numero);
  
      return {
        recintosViaveis: recintosViaveis.map(r => `Recinto ${r.numero} (espaço livre: ${r.espacoLivre} total: ${r.tamanhoTotal})`)
      };
    }
  }
  