/// <reference path="../main.d.ts" />

import * as React from "react";
import { ToastClient } from "../ToastClient";

interface HashtagCarouselProps {
  toastClient: ToastClient;
  hashtags: string[];
}

interface HashtagCarouselState {
  imageMap: { [hashtag: string]: string };
  activeImage: number;
}

export class HashtagCarousel extends React.Component<HashtagCarouselProps, HashtagCarouselState> {
  constructor() {
    super();
    this.state = { imageMap: {}, activeImage: 0 };
    var foo = ""


  }

  private get images() {
    return this.props.hashtags
      .map(hashtag => {
        return { hashtag: hashtag, url: this.state.imageMap[hashtag] }
      })
      .filter(image => image.url !== undefined);
  }

  private fetchImages(hashtags: string[]) {
    hashtags.forEach(hashtag => {
      this.props.toastClient.getHashtagImageUrl(hashtag).then((url: string) => {
        this.setState(s => {
          s.imageMap[hashtag] = url;
          return s;
        });
      }).catch(() => { }); // Ignore missing hashtags.
    });
  }

  componentWillReceiveProps(props: HashtagCarouselProps) {
    this.fetchImages(props.hashtags);
  }

  componentDidMount() {
    this.fetchImages(this.props.hashtags);
    setInterval(() => {
      this.setState(s => {
        s.activeImage = (s.activeImage + 1) % this.images.length;
        return s;
      })
    }, 4000);
  }

  render() {
    var imgs = this.images.map((image, i) => {
      return <img key={ i } className={ this.state.activeImage === i ? "active" : "" } src={ image.url }
        alt={ image.hashtag } title={ image.hashtag } />;
    });
    return <div className="hashtag-carousel">
      { imgs.length > 0 ? imgs : <span className="icon-toast"></span> }
    </div>;
  }
}
