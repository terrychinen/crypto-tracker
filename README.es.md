[Read in english](README.md)

# CryptoTracker - Cryptocurrency Dashboard
Una aplicación web desarrollada con Angular para visualizar los datos del mercado de criptodivisas.

## Características principales
* Dashboard con una tabla de las 100 principales cryptocurrencies.
* Filtrado, paginación y ordenación de datos en tiempo real.
* Página detallada con gráfico de precios históricos para cada moneda.
* Diseño responsivo para móvil y escritorio.
* Moderna gestión de estado con señales.

## Aspectos arquitectónicos destacados ✨

**Generic & Decoupled Datatable Component:** Uno de los objetivos principales de este proyecto era construir un componente datatable verdaderamente reutilizable. El componente es totalmente genérico (`<T>`) y utiliza la proyección de contenido (`ng-template`) para representar el contenido de las celdas. Esto significa que el componente padre tiene el 100% del control sobre la plantilla de la celda, haciendo la tabla completamente agnóstica de los datos que muestra. La lógica central está desacoplada de la capa de presentación (Angular Material), lo que hace que las futuras migraciones a una biblioteca de componentes de interfaz de usuario diferente sean mucho más sencillas.

## Tecnología
* **Frontend:** Angular 20, TypeScript, SCSS
* Interfaz de usuario: Angular Material
* Gráficos:ng2-charts (Chart.js)
* Calidad de código:ESLint, Prettier

## Para ejecutar localmente
1. Clonar el repositorio: `git clone https://github.com/terrychinen/crypto-tracker`
2. Instalar dependencias: `npm install`
3. Ejecuta el servidor de desarrollo: `ng serve -o`
