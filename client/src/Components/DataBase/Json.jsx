/*================== Base de datos simulacion ================ */

const array_cursos = [{}, {}, {}];

export const courseSections = [
  {
    title: "Sección 1",
    classes: [
      {
        id: "1",
        title: "Primeros pasos",
        minutes: 30,
      },
      {
        id: "2",
        title: "Materiales",
        minutes: 20,
      },
      {
        id: "3",
        title: "Comencemos",
        minutes: 10,
      },
      {
        id: "4",
        title: "Que es ...?",
        minutes: 50,
      },
    ],
  },
  {
    title: "Sección 2",
    classes: [
      {
        id: "4",
        title: "Clase 1.2",
        minutes: 10,
      },
      {
        id: "5",
        title: "Clase 1.2",
        minutes: 20,
      },
      {
        id: "6",
        title: "Clase 1.2",
        minutes: 37,
      },
    ],
  },
  {
    title: "Sección 3",
    classes: [
      {
        title: "Clase 2.1",
        link: "/clase-2-1",
        minutes: 37,
      },
      {
        title: "Clase 2.2",
        link: "/clase-2-2",
        minutes: 37,
      },
    ],
  },
];
