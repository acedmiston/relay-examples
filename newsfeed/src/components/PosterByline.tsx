import * as React from "react";
import Image from "./Image";
import { useFragment, useQueryLoader } from "react-relay";
import { graphql } from "relay-runtime";
import type { PosterBylineFragment$key } from "./__generated__/PosterBylineFragment.graphql";
import Hovercard from "./Hovercard";
import PosterDetailsHovercardContents from "./PosterDetailsHovercardContents";
import type { PosterDetailsHovercardContentsQuery as HovercardQueryType } from "./__generated__/PosterDetailsHovercardContentsQuery.graphql";
import { PosterDetailsHovercardContentsQuery } from "./PosterDetailsHovercardContents";
const { useRef } = React;

export type Props = {
  poster: PosterBylineFragment$key;
};

const PosterBylineFragment = graphql`
  fragment PosterBylineFragment on Actor {
    id
    name
    profilePicture {
      ...ImageFragment @arguments(width: 60, height: 60)
    }
  }
`;

export default function PosterByline({ poster }: Props): React.ReactElement {
  const data = useFragment(PosterBylineFragment, poster);
  const hoverRef = useRef(null);
  const [hoverCardQueryRef, loadHovercardQuery] =
    useQueryLoader<HovercardQueryType>(PosterDetailsHovercardContentsQuery);
  const onBeginHover = () => {
    loadHovercardQuery({ posterID: data.id });
  };
  return (
    <div ref={hoverRef} className="byline">
      <Image
        image={data.profilePicture}
        width={60}
        height={60}
        className="byline__image"
      />
      <div className="byline__name">{data.name}</div>
      <Hovercard onBeginHover={onBeginHover} targetRef={hoverRef}>
        <PosterDetailsHovercardContents queryRef={hoverCardQueryRef} />
      </Hovercard>
    </div>
  );
}
