import lunr from "lunr";
import lunarStemmer from "lunr-languages/lunr.stemmer.support";
import lunarFrench from "lunr-languages/lunr.fr";
import { removeDiacritics } from "../utils/remove_diacritics";

lunarStemmer(lunr);
lunarFrench(lunr);

class VideoIndex {
  constructor(docs) {
    this.idx = lunr(function () {
      const idx = this;
      idx.use(lunr.fr);
      idx.ref("id");
      idx.field("title");
      idx.field("creator");
      idx.field("body");
      docs.forEach((doc) =>
        idx.add({
          id: doc.id,
          title: removeDiacritics(doc.title),
          body: removeDiacritics(doc.body),
          creator: removeDiacritics(doc.creator),
        })
      );
    });
  }

  search(query) {
    return this.idx.search(removeDiacritics(query));
  }
}

export default VideoIndex;
