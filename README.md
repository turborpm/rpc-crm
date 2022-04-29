## Description
Misión: encontrar al pokemón más redondo a través de la sabiduría de las masas.

    Stack:
    *   nextjs
    *   typescript
    *   tailwind
    *   trpc
    *   prisma
    *   planetscale (mysql)
    *   next-auth

    Por implementar o cranear:
    *   websockets
    *   turborepo
    *   react-aria
    *   react-stately
    *   pwa
    *   livepeer
    *   web3
    *   stacks
    *   lightning
    *   storybook
    *   algo para testing
    *   algo para AI


This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `pages/index.tsx`. The page auto-updates as you edit the file.

[API routes](https://nextjs.org/docs/api-routes/introduction) can be accessed on [http://localhost:3000/api/hello](http://localhost:3000/api/hello). API endpoints can be edited in `backend/routers`.

The `pages/api` directory is mapped to `/api/*`. Files in this directory are treated as [API routes](https://nextjs.org/docs/api-routes/introduction) instead of React pages.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Database

Levantar db:
```bash
 pscale connect roundest-v1 galo-dev --port 3309
 pscale connect roundest-v1 galo-shadow --port 3310
```

Open prisma studio:
```bash
 npx prisma studio
```

## Deploy  

```bash
npm run build
npm run start
```

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.


## To do
<!-- TODO
    // ÉPICA 0
    [x] implementar esto: https://www.youtube.com/watch?v=PKy2lYEnhgs&t=5025s 

    // ÉPICA I
    [x] implementar login con nextauth (google/facebook)
        [x] setear nextauth
        [x] botones de login en el home
        [x] página de inicio de sesión
        [x] iniciar sesión con google
        [x] deploy
            [x] resolver error (nextauth client fetch error) en preview y production
            [x] iniciar sesión con google en preview y desarrollo
        [x] iniciar sesión con fb, github, discord, telegram.
    [x] guardar el usuario que ha votado (https://github.com/hexrcs/prisma-next-auth)
        [x] crear modelos en el schema
        [x] guardar en db al hacer signin
        [x] unir al usuario en el modelo Vote
        [x] guardar voto en db
    [x] vista para revisar votaciones por usuario

    // ÉPICA II
    [x] optimizar uso de next-auth con trpc. https://kitchen-sink.trpc.io/next-auth
        [x]  implementar llamadas a next-auth por medio de trpc
        [x]  debuggear
        [x]  usar el context para llamadas al api
    []  mejoras visuales
        [x]  seleccionar colores para el tema claro
        [x]  mejorar presentación del home en pc
        []  mejorar presentación del home para móvil
        []  mejorar presentación de resultados para móvil y pc
        []  mejorar presentación de login para móvil y pc
        []  agregar switch de tema oscuro
    [] refactorizar todo el código
        [x] extraer PokemonListing
        []  usar hooks para todo lo que se pueda usar hooks
        []  crear layout reutilizable
        []  mejorar la estructura de archivos, buscar ejemplos para buenas prácticas
    []  mejorar el layout para pc
    []  mejorar el layout para móvil
    [] agregar un buscador por usuario, pokemon
        [] usar un hook
        [] implementar debounce para hacer la busqueda con cada debounce
        [] optimizar la búsqueda y usar suspense
    []  implementar paginación de resultados
        []  usar suspense para resultados
    []  implementar un formulario con hooks
        []  npm i react-hook-form
        []  implementar useForm propio
    []  proteger endpoints con autorzación
    []  implementar animaciones con tailwind y framer-motion
    []  aparecer easter egg al copiar texto en cualquier lugar de la app
    

    Futuras Épicas:
    []  Crear más secciones informativas
        []  Crear sistema por roles
        []  Crear secciones informativas
    []  Como usuario quiero batallar mis pokemon contra otro usuario
    []  Implementar chat app con websockets https://github.com/trpc/examples-next-prisma-starter-websockets
        []  encontrar más casos de uso (ej: tweets)
    []  Crear un monorepo con turborepo para hacer varias aplicaciones que se conecten a un mismo backend tRPC
    []  Aprovechar lo que más pueda a react18
    []  Crear pwa para pc y móvil. pwa https://blog.jarrodwatts.com/how-i-released-a-next-js-app-to-the-google-play-store-with-aws-amplify
    []  Implementar funcionalidad de videollamadas usando livepeer
    []  Como usuario quiero batallar mis pokemon contra la AI
    []  Implementar funcionalidades de web3
 -->


<!-- Siguiente: Implementar ecommerce con turborepo
    prisma, trpc, nextjs, tailwind, planetscale (mysql), typescript, turborepo
    4 aplicaciones web: 
        1. backend con prisma y trpc (compartido entre los otros dos proyectos)
        2. sitio de proveedor
        3. sitio de cliente (https://blog.jarrodwatts.com/how-i-released-a-next-js-app-to-the-google-play-store-with-aws-amplify)
        4. sitio de admin
-->
