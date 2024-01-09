# React Client

## Init
- --- Instalamos las deps necesarias
  - -- Deps iniciales pal project
    `pnpm add @headlessui/react @heroicons/react @tanstack/react-query axios jwt-decode react-hot-toast react-icons react-router-dom zustand`

      - jwt-decode: como el JWT viene con varias cosas debemos decodear esas cosas, en principal quiere extraer si es Admin





- --- Setup
  - -- Configuramos el    `.eslintrc.cjs`    q ya trae x default vite
    - Con mis propias rules


  - -- Configurar los path   `(@)`    en Vite  <--  TypeScript
    - deps
      ```sh
        pnpm add -D @types/node
      ```

		- Modificar archivos de config:
  		- vite.config.ts		<-  path
  		- tsconfig.json			<-  paths

				https://www.divotion.com/blog/how-to-configure-import-aliases-in-vite-typescript-and-jest





- --- Install TailwindCSS
	- -- Deps and Setup
		- Crea el Theme en el    `tailwind.config.cjs` 
			- Tambien establece los    mediaquery   para el responsive
      
  ```bash
      # deps
      pnpm add -D tailwindcss postcss autoprefixer

      # 
      pnpx tailwindcss init
  ```

  - -- Modificamos el     `tailwind.config.js`
    ```js
      /** @type {import('tailwindcss').Config} */
      export default {
        content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
        theme: {
          extend: {},
        },
        plugins: [],
      };
    ```


	- -- En el    `index.css`    agregamos los directivas de tailwind
  	- Si existen otros styles y fuentes tb
			```css
				@tailwind base;
				@tailwind components;
				@tailwind utilities;
			```

	- -- No se xq, pero tuve que crear el      `postcss.config.cjs`
    - Con lo q siempre viene x default
    - En la doc no menciona nada d esto, pero asi m funca :v


  - -- Si estaba corriendo el Server, lo paramos y levantamos d nuevo para q tome los cambios
















<!-- ================================================================ -->
<!-- //////////////////////////////////////////////////////////////// -->
# Initial Development

## TanStack Query
- --- Lo configuramos con su Provider envolviendo a toda App
  - -- En el     `main.tsx`    procedemos a configurarlos
    ```tsx
      import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
      const queryClient = new QueryClient();

      ReactDOM.createRoot(document.getElementById('root')!).render(
        <React.StrictMode>
          <QueryClientProvider client={queryClient}>
            <App />
          </QueryClientProvider>
        </React.StrictMode>
      );
    ```

    - -- URL:
      - Docs
            https://tanstack.com/query/latest/docs/react/quick-start
      



## Router
- --- Definimos el Router con sus Layouts y Pages




## Auth Store
- --- Creamos el      `useAuthStore`      con Zustand
  - -- Tb configuramos     axios     para poder w con HTTP Requests y Tipado de las Respnonses
    - Creamos el      `ecomApi`
    - Creamos el      `ecomApiAuth`
      - Con su    Interceptor   para enviar el    Bearer token    en c/req


- --- Creamos el     `auth.slice.ts`     q sera quien centralice la logica de las HTTP Reques
  - -- Ademas llamara a los methods del      `zustand store`     para W con el Global State
    - Como estamos usando el      `persist()`      d zustant, este se persiste en   `LocalStorage`
      - Zustand mantiene    SYNC   la data entre el State y LocalStorage gracias al    persist()





## Dark Mode
- --- Habilitamos el    Darkmode    x class en el      `tailwind.config.js` 
  - -- Simplemente 1:     darkMode: 'class',

  - -- Creamos el    `theme.store.ts`     para tener el registro del DarkMode selected
    - Y perisistimos en LocalStorage con      persist()      d     zustand

  - -- Creamos el     `ThemeProvider`      para tener 1 div q envuelve todo al cual colocar la class    dar    dependiendo del state
    - En el      main.ts     usamor el Provider para envolver la app






## Create New Product
- --- Como el back en Django espera el    image    como 1 Binario o archivo debemos enviarlo como tal
  - -- Creamos el    `NewProductPage`
    - -- En tal contexto, debemos usar 1 POST con el     `FORMDATA`     q no enviar 1 JSON como tal

    - -- El     darg & drop    esta hecho a mano, sin librerias
      - Usa el    `useRef`     para mantener la red al    Input File   
      - Tiene Previsualizacion de la image seleccionada, cool!!!
      - No se en q momento escucha el DROP pero funca :v
        - El     DropBox es 1 `LABEL`     y tiene dentro de este el   FileInput







## ProductSearcher
- --- Me gusta como quedo
  - -- Usa 2 stores diferentes para mejor control
    - `productStore`:
      - Quien tiene el resultado de la busqueda, los productos encontrados
    - `searchStore`:
      - Generico, q contiene el SearchTerm y el isSearching
        - searchTerm permite condicionar la renderizacion del Result o el infiniteQuery en el Home
        - isSearching global para el Loader

  - -- Creamos los sig files:
    - `ProductSearcher`
    - `useProductsStore`
    - `useSearchStore`







## Get Products by category
- --- Tiene sus pages y cosas :v






















<!-- ================================================================ -->
<!-- //////////////////////////////////////////////////////////////// -->
# PayPal
- --- Vamos a hacerlo como FH en el curso de Next.js v12, todo manejado x el Front
  - -- Casicamente usa el      `PayPal JS SDK`     <--    @paypal/react-paypal-js
    - - Pero validamos en el Back


  - -- Instalamos el SDK para JS
    - run:    `pnpm add @paypal/react-paypal-js`


      - -- URL: 
        - PayPal React
            https://www.npmjs.com/package/@paypal/react-paypal-js
        - 

  - -- Usamos el Btn en donde se requiera



## PayPal Btn
- --- Creamos 1 App en    PayPal
  - -- Click en   Create App Btn    >>>   Damos nombre > Merchant > Account     >>>
    - Nos dara los datos de la App q creamos para la conexion
    ```bash
      # client id
      AZYXub6VMU3JbJkNbF1rMHiaZRoHBfDv7y0cwvuIdKZkudQvoSHVDCbduCBlOxQRR4-n2FelW8IAT3ip

      # secret key
      EM7lRVUw59MGhyUndyKGcBNJfoy4KpwT3wm7s67Jp714fMIJIoibN4DBRjlJcsF7rwrOWFNBs-HNrAlL
    ```

  - -- Para testear con Cuentas de Prueba con Plata/Dinero
    - Con estas podemos testear las compras xq son cuentas con plata fake
    ```bash
      # emial
      sb-h0dly29111721@personal.example.com

      # password
      4I_]9!*s

      # ### Main Account
      sarhaaluiza04@gmail.com
    ```


    - -- URL:
      - PayPal Apps
            https://developer.paypal.com/dashboard
      - Sandbox Accoutns
            https://developer.paypal.com/dashboard/accounts

























<!-- ================================================================ -->
<!-- //////////////////////////////////////////////////////////////// -->
# Review
- --- s

















































# Cosas Nuevas / Cool :
- --- `Infinite Scroll`
  - -- Lo hace con varias deps externas como:
    - useInView           <--   react-intersection-observer
    - useInfiniteQuery    <--   @tanstack/react-query

  - -- El   useInfiniteQuery    retorna Pages q deben ser recorridas
    - Esto duplica los elementos HTML x c/page
      - Pilas en las Tablas xq en este caso duplica el    <tbody>




- --- `Debouncer` - Searcher
  - -- Con el     `useRef`     d react limpiando el    setTimeout












# OJO:
- --- Dar como     `key`     a un component/element q se esta recorriendo 
  - -- 1 Math.random    hace q se vuelva loco y genere muchas peticiones, algo raro


- --- El   useInfiniteQuery    retorna Pages q deben ser recorridas
  - -- Esto duplica los elementos HTML x c/page
    - Pilas en las Tablas xq en este caso duplica el    <tbody>


- --- MediaQuery para la Tablas a pelo con TailwindCSS :v
  - -- Debemos usar los styles adecuados:
    - No jugar con el display block y demas xq no funca, usar el table-cell
      `hidden md:table-cell`







# TODO:
  - -- UPD InfiniteQuery    <--   deps: `TanStack Query`
  - -- UPD JWTDecode        <--   deps:
  - -- ReactForm para el Address - CreateOrder
  - -- Crear la Orden solo si funciono en PayPal
    - Como lo hace   FH   en el TesloShop V12

  - -- Hacer BIEN el    PayPal
    - Solo si confirma la orden y paga la cree en DB


  - -- Generalizar el     `Drag and Drop`    para REUTILIZARLO
    - Q acepte clases extra y ver como manejarlas para q sobrescriban las existentes
      - Si chocan, como lo hace en el   `QuillPDF`   ese man de Germany
        - `twMerge`:  Merge styles without conflicts
        - `clx`:      styles conditionally

    ```ts
      // utils
      export function cn(...inputs: ClassValue[]) {
        return twMerge(clsx(inputs));
      }

      // confirmation errors
      const confirmationAndErrorStyles = useMemo(
        () =>
          clsx('bg-primary', {
            // conditional styles
            'bg-red-500/10': codeExchangeError,
            'border-red-500/50': codeExchangeError,
            'text-red-700': codeExchangeError,
          }),
        [codeExchangeError]
      );

      // 'base-classes', {styles conditionally}
      <div
        key={plan}
        className={cn('relative rounded-2xl bg-white shadow-lg', {
          'border-2 border-blue-600 shadow-blue-200': plan === 'Pro',
          'border border-gray-200': plan !== 'Pro',
        })}
      >
    ```







