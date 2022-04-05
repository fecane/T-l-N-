export default class VideoFacade {
  constructor(data) {
    this.data = data;
    this.videos = new Map();
    this.categories = new Map();
    data["catégories"].forEach((c) => {
      if (this.categories.has(c.id)) {
        console.warn(`Attention: Le catégorie "${c.id}" est dupliquer.`);
      }
      this.categories.set(c.id, c);
    });
    data.videos.forEach((f) => {
      if (this.videos.has(f.id)) {
        console.warn(`Attention: Le video "${f.id}" est dupliquer.`);
      }
      this.videos.set(f.id, f);
    });
  }

  toCategory(category) {
    return {
      id: category.id,
      title: category.titre,
      backgroundImage: category.imageFond,
      backgroundColor: category.couleurFond ?? "#b30041",
    }
  }

  toVideo(video) {
    return {
      id: video.id,
      title: video.titre,
      creator: video["créateur"],
      summary: video.sommaire,
      description: video.description,
      date: video.date,
      image: video.image,
      playlist: video.liste,
      backgroundImage: video.imageFond,
      backgroundColor: video.couleurFond ?? "#b30041",
      categories: video["catégories"],
    };
  }

  getCategory(id) {
    const category = this.categories.get(id);
    if (!category) {
      return undefined;
    }
    return this.toCategory(category);
  }

  getCategories() {
    return this.data["catégories"].map((c) => this.toCategory(c));
  }

  getVideo(id) {
    const video = this.videos.get(id);
    if (!video) {
      return undefined;
    }
    return this.toVideo(video);
  }

  getVideosByCategory(id) {
    const result = this.data.videos
      .filter((f) => f["catégories"].indexOf(id) > -1)
      .map((f) => this.toVideo(f));
    result.sort((a, b) => (a.date < b.date ? 1 : -1));
    return result;
  }

  getSpotlight() {
    return this.data["grandTitres"]
      .map((d) => {
        const video = this.videos.get(d);
        if (!video) {
          console.warn(`Attention: Grand titre n'exist pas pour "${d}".`);
        }
        return this.toVideo(video);
      })
      .filter((f) => !!f);
  }
}
