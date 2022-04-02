export default class FilmFacade {
  constructor(data) {
    this.data = data;
    this.films = new Map();
    data.films.forEach(f => {
      this.films.set(f.id, f);
    })
  }

  getCategories() {
    return this.data["catégories"].map((d) => ({
      id: d.id,
      title: d.titre,
      backgroundImage: d.imageFond,
      backgroundColor: d.couleurFond,
    }));
  }

  getSpotlight() {
    return this.data["grandTitres"].map(d => {
      const film = this.films.get(d);
      if (!film) {
        console.warn(`Attention: Grand titre n'exist pas pour "${d}".`)
      }
      return film;
    }).filter(f => !!f);
  }
}
