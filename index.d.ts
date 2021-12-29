export interface ThumbnailSelectorProps {
  thumbnails?: object[];
  renderThumbnail?(thumbnail: ThumbnailData): undefined;
  onThumbnailSelect?(thumbnail: Thumbnail): void;
  initialIndex?: number;
  horizontal?: boolean;
  active?: object;
  inactive?: object;
  thumbnailProps?: object;
  captionProps?: object;
  buttonProps?: object;
  animatedViewStyle?: object;
  animationConfig?: object;
}

export type ThumbnailData = {
  item: object;
  index: number;
  onThumbnailSelect(): void;
};

export type Thumbnail = {
  item: object;
  index: number;
};
