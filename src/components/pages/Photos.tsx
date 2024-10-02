import "./Photos.css";
import { ImageContainer } from "../ImageContainer.tsx";
import { transform } from "../../utils/photos";
import { AstroLinkURL } from "../AstroLink";

export type PhotosPageProps = {
  data: any;
  url: URL;
};
export const PhotosPage = ({ data, url }: PhotosPageProps) => {
  const groups = transform(data).reverse();
  return (
    <AstroLinkURL url={url}>
      <div className="photos-container">
        <details className="explainer">
          <summary>
            <abbr title="Information">ⓘ Information</abbr>
          </summary>
          <ul>
            <li>
              All photos here have been taken by community members and sent in either through our <a href="https://discord.com/channels/1034792577293094972/1077517983439654962">#event-photos</a> channel on discord or through the Meetup page.
            </li>
            <li>
              All photos are published under the <a href="https://creativecommons.org/licenses/by-nc-sa/4.0/">Creative Commons BY-NC-SA license</a>.
            </li>
            <li>
              If you want a photo of you removed from the page, or if you have any other issues with a photo on this page, please let us know through → <a href="https://github.com/owddm/public/issues/new">a new GitHub issue</a>.
            </li>
            <li>If you use any photo of this page, we request you to follow the github repository and also remove any photo if a member is uncomfortable with it.</li>
          </ul>
        </details>
        <ImageContainer galleryID="full-gallery" groups={groups} />
      </div>
    </AstroLinkURL>
  );
};
