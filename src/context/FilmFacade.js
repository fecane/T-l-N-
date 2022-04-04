export default class FilmFacade {
  constructor(data) {
    this.data = data;
    this.films = new Map();
    data.films.forEach(f => {
      if (this.films.has(f.id)) {
        console.log(`Attention: Le film "${f.id}" est dupliquer.`)
      }
      this.films.set(f.id, f);
    })
  }

  toFilm(film) {
    return {
      id: film.id,
      title: film.titre,
      creator: film['créateur'],
      summary: film.sommaire,
      description: film.description,
      date: film.date,
      image: film.image,
      backgroundImage: film.imageFond,
      backgroundColor: film.couleurFond ?? '#b30041',
      categories: film['catégories'],
    }
  }

  getCategories() {
    return this.data["catégories"].map((f) => this.toFilm(f));
  }

  getFilm(id) {
    const film = this.films.get(id);
    if (!film) {
      return undefined;
    }
    return this.toFilm(film);
  }

  getFilmsByCategory(id) {
    return this.data.films.filter(f => f['catégories'].indexOf(id) > -1).map(f => this.toFilm(f));
  }

  getSpotlight() {
    return this.data["grandTitres"].map(d => {
      const film = this.films.get(d);
      if (!film) {
        console.warn(`Attention: Grand titre n'exist pas pour "${d}".`)
      }
      return this.toFilm(film);
    }).filter(f => !!f);
  }
}
