### ASSUMPTION

- The intervals are only integers. Not undefined or null values.
- The intervals are NOT sorted.
- The intervals are arrays where the first value (start) is lower then the second value (end). for ex. [1, 2] and not [2, 1]

### INSTALLATION

- Install node (currently I'm using v15.3.0)
- Install yarn or npm 

Now you can clone, install and run the project 

```
git clone git@github.com:fabriziobertoglio1987/code-challenge-dm.git
cd code-challenge-dm
```
If you use yarn run:

```
yarn setup
```
If you use npm run: 

```
npm run setup
```

### TESTS

You can run the test suite with

```
yarn test
```
or 

```
npm test
```
You can edit the test with:
```
vim tests/index.test.js
```
The solution is included in `src/index.js`.

### QUESTIONS

> Wie ist die Laufzeit Ihres Programms ?

Das Feld ist nicht sortiert.
Die Programmlaufzeit ist `O(n lg n)`, da das Feld sortiert werden muss.
Dass die Sortierung eine Laufzeit `O(n lg n)` benötigt, kann man mit einem Merge-Sort-Algorithmus demonstrieren.

Der Merge-Sort-Algorithmus teilt das Feld auf, bis es nur noch zwei Elemente hat, und führt dann die sortierte Felder zusammen.

Die Laufzeit berechnet sich wie folgt:

Der schlimmste Fall besteht darin, das Feld von n Elementen x-mal aufzuteilen, bis das Ergebnis 1 ist.

n * ½ * ½ * ½ * ½ …. = 1  
n * ½ <sup>x</sup> = 1  
n = 2 <sup>x</sup>  
log<sub>2</sub> n = log<sub>2</sub> 2 <sup>x</sup>  
log<sub>2</sub>n = x

> Wie kann die Robustheit sichergestellt werden, vor allem auch mit Hinblick auf sehr große
> Eingaben ?

Wenn das Feld sortiert war, könnten wir die Laufzeit von O(n) erreichen, indem wir die erste Sortierung entfernen.

Die zweite For-Schleife wird nur maximal n-mal ausgeführt.

Ein Vergleich zwischen [`O(n)` und `O(n lg n)`](https://stackoverflow.com/a/43174391/7295772) Laufzeiten.

Wenn ich die aktuelle Programmlaufzeit verbessern müsste, würde ich versuchen, die anfängliche Sortierung zu vermeiden.

> Wie verhält sich der Speicherverbrauch ihres Programms ?

Das Programm verwendet `O(n)` Speicherplatz, indem es ein neues Feld erstellt, um das zusammengeführte Ergebnis zu speichern.

Die In-Place Änderung würde `O(1)` statt `O(n)` Speicherplatz kosten, kann aber die Laufzeit verlangsamen.

### IMPROVEMENTS

- add flow types
