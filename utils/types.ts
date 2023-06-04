declare module "photoswipe/lightbox" {
  /**
   * <T>
   */
  export { Type } from "photoswipe/dist/types/types";
  export * as PhotoSwipe from "photoswipe/dist/types/photoswipe";
  export * as Content from "photoswipe/dist/types/slide/content";
  export { PhotoSwipeEventsMap, PhotoSwipeFiltersMap, EventCallback } from "photoswipe/dist/types/core/eventable";
  import PhotoSwipe from "photoswipe/dist/types/core/base";
  import { PreparedPhotoSwipeOptions } from "photoswipe/dist/types/photoswipe";
  import { DataSource, Point } from "photoswipe/dist/types/photoswipe";
  /**
   * PhotoSwipe Lightbox
   *
   * - If user has unsupported browser it falls back to default browser action (just opens URL)
   * - Binds click event to links that should open PhotoSwipe
   * - parses DOM strcture for PhotoSwipe (retrieves large image URLs and sizes)
   * - Initializes PhotoSwipe
   *
   *
   * Loader options use the same object as PhotoSwipe, and supports such options:
   *
   * gallery - Element | Element[] | NodeList | string selector for the gallery element
   * children - Element | Element[] | NodeList | string selector for the gallery children
   *
   */
  export default class PhotoSwipeLightbox extends PhotoSwipe {
    /**
     * @param {PhotoSwipeOptions} [options]
     */
    constructor(options?: Partial<PreparedPhotoSwipeOptions> | undefined);
    /** @type {PhotoSwipeOptions} */
    options: Partial<PreparedPhotoSwipeOptions>;
    _uid: number;
    shouldOpen: boolean;
    /**
     * @private
     * @type {Content | undefined}
     */
    private _preloadedContent;
    /**
     * @param {MouseEvent} e
     */
    onThumbnailsClick(e: MouseEvent): void;
    /**
     * Initialize lightbox, should be called only once.
     * It's not included in the main constructor, so you may bind events before it.
     */
    init(): void;
    /**
     * Get index of gallery item that was clicked.
     *
     * @param {MouseEvent} e click event
     * @returns {number}
     */
    getClickedIndex(e: MouseEvent): number;
    /**
     * Load and open PhotoSwipe
     *
     * @param {number} index
     * @param {DataSource} dataSource
     * @param {Point | null} [initialPoint]
     * @returns {boolean}
     */
    loadAndOpen(index: number, dataSource?: DataSource, initialPoint?: Point | null | undefined): boolean;
    /**
     * Load the main module and the slide content by index
     *
     * @param {number} index
     * @param {DataSource} [dataSource]
     */
    preload(index: number, dataSource?: DataSource | undefined): void;
    /**
     * @private
     * @param {Type<PhotoSwipe> | { default: Type<PhotoSwipe> }} module
     * @param {number} uid
     */
    private _openPhotoswipe;
    /**
     * Unbinds all events, closes PhotoSwipe if it's open.
     */
    destroy(): void;
  }
}
