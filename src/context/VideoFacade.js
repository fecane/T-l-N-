import {
  validateDate,
  validateIdentifier,
  validateRequired,
} from "../utils/validation";
import VideoIndex from "./VideoIndex";

class VideoFacade {
  constructor(data) {
    this.data = data;
    this.videos = new Map();
    this.categories = new Map();

    // Validate and build out the lookups
    this.errors = [];
    data['catégories'].forEach((c) => {
      this._validateCategory(c);
      if (this.categories.has(c.id)) {
        this._addError(`La catégorie "${c.id}" ("id") est dupliquer.`);
        return;
      }
      this.categories.set(c.id, c);
    });
    data['vidéos'].forEach((v) => {
      this._validateVideo(v);
      if (this.videos.has(v.id)) {
        this._addError(`La video "${v.id}" ("id") est dupliquer.`);
        return;
      }
      this.videos.set(v.id, v);
    });
    data.grandesTitres.forEach(g => {
      if (!this.videos.has(g)) {
        this._addError(`La video "${g}" pour les grand titres n'exist pas.`);
      }
    })

    // Build the search index
    this.idx = new VideoIndex(
      this.data['vidéos'].map((v) => ({
        id: v.id,
        title: v.titre,
        creator: v["créateur"],
        body: v.description,
      }))
    );
  }

  _addError(error) {
    this.errors.push(error);
  }

  _validateCategory(category) {
    if (
      !validateRequired({
        target: category,
        prop: 'id',
        errors: this.errors,
        msg: 'La propriété "id" est requise pour tous les catégories.',
      })
    ) {
      return;
    }
    validateIdentifier({
      target: category,
      prop: 'id',
      errors: this.errors,
      msg: `La propriété "id" pour catégorie "${category.id}" est invalid (0-9, a-z, A-Z, "-", etc "_")`,
    });
    validateRequired({
      target: category,
      prop: 'titre',
      errors: this.errors,
      msg: `La propriété "titre" pour catégorie "${category.id}" est requise.`,
    });
  }

  _validateVideo(video) {
    if (
      !validateRequired({
        target: video,
        prop: 'id',
        errors: this.errors,
        msg: 'La propriété "id" est requise pour tous les vidéos.',
      })
    ) {
      return;
    }
    validateIdentifier({
      target: video,
      prop: 'id',
      errors: this.errors,
      msg: `La propriété "id" pour vidéo "${video.id}" est invalid (0-9, a-z, A-Z, "-", etc "_")`,
    });
    validateRequired({
      target: video,
      prop: 'titre',
      errors: this.errors,
      msg: `La propriété "titre" pour vidéo "${video.id}" est requise.`,
    });
    validateRequired({
      target: video,
      prop: 'créateur',
      errors: this.errors,
      msg: `La propriété "créateur" pour vidéo "${video.id}" est requise.`,
    });
    validateRequired({
      target: video,
      prop: 'description',
      errors: this.errors,
      msg: `La propriété "description" pour vidéo "${video.id}" est requise.`,
    });
    validateDate({
      target: video,
      prop: 'date',
      errors: this.errors,
      msg: `La propriété "date" pour vidéo "${video.id}" est invalid (YYYY-MM-DD).`,
    });
    validateRequired({
      target: video,
      prop: 'catégories',
      errors: this.errors,
      msg: `La propriété "catégories" pour vidéo "${video.id}" est requise.`,
    });
    video['catégories'].forEach(c => {
      if (!this.categories.has(c)) {
        this._addError(`La vidéo "${video.id}" a une catégorie qui n'exist pas ("${c}").`);
      }
    });
  }

  toCategory(category) {
    return {
      id: category.id,
      title: category.titre,
      backgroundImage: category.imageFond,
      backgroundColor: category.couleurFond ?? "#b30041",
    };
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

  search(query) {
    const result = this.idx.search(query).map((r) => ({
      id: r.ref,
      title: this.videos.get(r.ref).titre,
      date: r.date,
    }));
    result.sort((a, b) => (a.date < b.date ? 1 : -1));
    return result;
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
    const result = this.data['vidéos']
      .filter((f) => f["catégories"].indexOf(id) > -1)
      .map((f) => this.toVideo(f));
    result.sort((a, b) => (a.date < b.date ? 1 : -1));
    return result;
  }

  getSpotlight() {
    return this.data.grandesTitres
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

export default VideoFacade;
