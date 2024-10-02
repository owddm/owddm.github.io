import clsx from "clsx";
import "./EventGroupHeader.css";
export type EventGroupHeaderProps = {
  type?: string | undefined;
};
export const EventGroupHeader = ({ type }: EventGroupHeaderProps) => {
  if (type === undefined) {
    return <></>;
  }
  if (type === "mixed") {
    return (
      <div className="group-banner-mixed">
        <div className="group-banner-part group-banner-owddm">
          <img className="group-banner-logo" src="/logo/owddm-outline@1x.png" alt="osaka logo" />
        </div>
        <div className="group-banner-part group-banner-kwddm">
          <img className="group-banner-logo" src="/logo/kwddm-outline@1x.png" alt="kwddm logo" />
        </div>
      </div>
    );
  }
  return (
    <div className={clsx({ "group-banner": true, [`group-banner-${type}`]: true })}>
      <img className="group-banner-logo" src={`/logo/${type}-outline@1x.png`} alt={`${type} logo`} />
    </div>
  );
};
