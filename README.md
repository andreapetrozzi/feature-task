# Trafficlab Workbench

Ambiente per test di implementazioni

Il progetto è strutturato come monorepo full-stack che utilizza [pnpm](https://pnpm.io/) sia come gestore di pacchetti per node.js che per gestione workspace.

### Requirements:
- Aver installato  [git](https://git-scm.com/book/en/v2/Getting-Started-Installing-Git)
- Aver installato pnpm, per l'installazione, basta usare npm ```npm install -g pnpm``` oppure seguire la [guida](https://pnpm.io/installation) per modalità alternative

#### Struttura

Il monorepo è strutturato nel seguente modo: Un backend scritto in node.js che serve dati auto-generati all'indirizzo [http://127.0.0.1:8080](http://127.0.0.1:8080), un front-end (SPA) sviluppato in React.js e Vite che viene servito all'indirizzo [http://127.0.0.1:5173](http://127.0.0.1:5173), una library di componenti UI e una libreria di utilities.
la cartella e2e invece contiene codice per fare test end-to-end.
```
├── apps
│   ├── back-end
│   ├── front-end
├── packages
│   ├── ui
│   ├── utils
├── e2e(test)
```

Per installare tutte le dipendenze:

```
pnpm install
```
Per Lanciare entrambi i server di dev (BE e FE):

```
pnpm --stream -r dev
```
Aprire infine il browser alla pagina [http://127.0.0.1:5173]( http://127.0.0.1:5173)
Eventualmente controllare il payload all'indirizzo del back-end  [http://127.0.0.1:8080/data](http://127.0.0.1:8080/data)
