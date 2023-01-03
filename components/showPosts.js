import { useEffect, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { checkPresence, PostCard } from "./cards";
import callApi from "./callApi";
import { tagName, action } from "../components/parseTag";
import { useRouter } from "next/router";

export default function ShowPosts({ feedType, type }) {
  const router = useRouter();
  const [posts, setPosts] = useState([]);
  let [hasMore, setHasMore] = useState(true);
  let [pageNumber, setPageNumber] = useState(1);

  useEffect(() => {
    setPageNumber(1);
    fetchPosts();
    if (tagName === undefined) {
      if (feedType != "fresh") {
        router.push({
          query: { feed_type: feedType },
        });
      } else {
        router.push("/");
      }
    }
  }, [feedType, tagName, type, action]);

  const fetchPosts = async () => {
    if (action === "tagClick") {
      setPageNumber(1);
      pageNumber = 1;
      hasMore = true;
    }
    const { response, result } = await callApi(
      "GET",
      `public/read-post/${pageNumber}?feed_type=${feedType}${
        checkPresence(tagName) ? `&tag=${tagName}` : ""
      }${checkPresence(type) ? `&type=${type}` : ""} `
    );

    Array.isArray(result) && checkPresence(result)
      ? setPosts(result)
      : setHasMore(false);
  };

  const getMorePosts = async () => {
    ++pageNumber;

    const { response, result } = await callApi(
      "GET",
      `public/read-post/${pageNumber}?feed_type=${feedType}${
        checkPresence(tagName) ? `&tag=${tagName}` : ""
      }${checkPresence(type) ? `&type=${type}` : ""} `
    );

    checkPresence(result) && Array.isArray(result)
      ? setPosts((prevPosts) => [...new Set([...prevPosts, ...result])])
      : setHasMore(false);
    setPageNumber(pageNumber);
  };

  return (
    <div className="md:w-[50vw] sm:w-full mx-auto">
      <InfiniteScroll
        dataLength={posts?.length}
        next={() => {
          getMorePosts();
        }}
        hasMore={hasMore}
        loader={<p>loading ...</p>}
        endMessage={<p>end of posts</p>}
        className="h-screen"
      >
        {checkPresence(posts)
          ? Array.isArray(posts) &&
            posts?.map((post, index) => {
              return (
                <div key={index} className="flex p-4 pt-0 flex-1 text-center ">
                  <PostCard
                    postId={post?.["id"]}
                    createdById={post?.["created_by_id"]}
                    createdByUsername={post?.["created_by_username"]}
                    createdByProfilePicUrl={
                      post?.["created_by_profile_pic_url"]
                    }
                    createdByRating={post?.["created_by_rating"]}
                    postTitle={post?.["title"]}
                    postDescription={post?.["description"]}
                    postMediaUrl={post?.["media_url"]}
                    postLinkUrl={post?.["link_url"]}
                    postTags={post?.["tag"]}
                    postLikeCount={post?.["like_count"]}
                    postCommentCount={post?.["comment_count"]}
                    postCreatedAt={post?.["created_at"]}
                    createdByEmail={post?.["email"]}
                    createdByMobile={post?.["mobile"]}
                    createdByWhatsapp={post?.["whatsapp"]}
                    city={post?.["city"]}
                    state={post?.["state"]}
                    country={post?.["country"]}
                  />
                </div>
              );
            })
          : null}
      </InfiniteScroll>
    </div>
  );
}
