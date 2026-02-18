# 🧩 Sudoku Web App

Un juego de Sudoku clásico, totalmente responsivo y generado procedimentalmente, construido con **HTML, CSS y JavaScript puro (Vanilla JS)**.

Este proyecto implementa un algoritmo de **Backtracking** para generar tableros únicos con solución garantizada y cuenta con una interfaz optimizada tanto para escritorio como para dispositivos móviles.

## 🚀 Demo
Podés ver el proyecto funcionando aquí: https://fabricio00101.github.io/sudoku/


## ✨ Características Principales

* **Generación Procedimental:** Algoritmo de Backtracking que crea rompecabezas válidos y únicos cada vez que juegas.
* **Validación de Victoria:** El sistema detecta automáticamente cuando el tablero está completo y correcto.
* **Soporte Móvil:** Teclado numérico nativo en celulares gracias a una integración inteligente con inputs ocultos.
* **Modo Impresión (PDF):** Estilos CSS dedicados (`@media print`) para imprimir el tablero limpio o guardarlo como PDF para resolver a lápiz.
* **Herramientas:** Botones para resolver, reiniciar el tablero actual o generar un juego nuevo.
* **Diseño Responsivo:** Uso avanzado de CSS Grid y Variables CSS para una interfaz limpia y adaptable.

## 🛠️ Tecnologías Usadas

* **HTML5:** Estructura semántica.
* **CSS3:** Flexbox, Grid, Variables, Media Queries (Responsive & Print).
* **JavaScript (ES6+):** Lógica del juego, manipulación del DOM y algoritmos.

## 🧠 Cómo funciona el Algoritmo

El núcleo del generador utiliza recursividad (Backtracking):
1.  Llena la diagonal principal (independientes entre sí) para asegurar aleatoriedad.
2.  Intenta llenar el resto de celdas celda por celda.
3.  Si llega a un punto muerto donde ningún número es válido, "retrocede" (backtrack) a la celda anterior y prueba otro número.
4.  Finalmente, elimina números aleatorios asegurándose (mediante un contador de soluciones) de que el puzzle resultante tenga **una única solución posible**.

## 📸 Capturas de Pantalla

![Vista Escritorio]([Ruta a tu imagen, ej: ./img/screenshot-pc.png])
![Vista Móvil]([Ruta a tu imagen, ej: ./img/screenshot-mobile.png])

## 📦 Instalación / Uso Local

1.  Clona este repositorio:
    ```bash
    git clone [https://github.com/tu-usuario/sudoku-web.git](https://github.com/tu-usuario/sudoku-web.git)
    ```
2.  Abrí el archivo `index.html` en tu navegador.
3.  ¡A jugar!

---
