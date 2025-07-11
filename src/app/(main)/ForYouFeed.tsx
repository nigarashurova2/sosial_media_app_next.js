"use client";

import InfiniteScrollContainer from "@/components/InfiniteScrollContainer";
import { DeletePostDialog } from "@/components/posts/DeletePostDialog";
import Post from "@/components/posts/Post";
import PostsLoadingSkeleton from "@/components/posts/PostsLoadingSkeleton";
import { Button } from "@/components/ui/button";
import kyInstance from "@/lib/ky";
import { PostData, PostsPage } from "@/lib/types";
import { useInfiniteQuery } from "@tanstack/react-query";
import { Loader2 } from "lucide-react";

export default function ForYouFeed() {
  
  const {
    status,
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage
  } = useInfiniteQuery({
    queryKey: ["post-feed", "for-you"],
    queryFn: ({ pageParam }) =>
      kyInstance
        .get(
          "/api/posts/for-you",
          pageParam ? { searchParams: { cursor: pageParam } } : {},
        )
        .json<PostsPage>(),
    initialPageParam: null as string | null,
    getNextPageParam: (lastPage) => lastPage.nextCursor,
  });

  const posts = data?.pages.flatMap(page=> page.posts) || []


  if (status === "pending") {
    return <PostsLoadingSkeleton/>
  }

  if(status === "success" && !posts.length && !hasNextPage){
    return <p className="text-center text-muted-foreground">
      No one has posted anything yet.
    </p>
  }

  if (status === "error") {
    return (
      <p className="text-center text-destructive">
        An error occured while loading posts.
      </p>
    );
  }

  return (
    <InfiniteScrollContainer 
    onBottomReached={()=> hasNextPage && !isFetchingNextPage && fetchNextPage()}
    className="space-y-5">
      {posts.map((post) => (
        <Post key={post.id} post={post} />
      ))}
      {isFetchingNextPage && <Loader2 className="my-3 mx-auto animate-spin" />}
    </InfiniteScrollContainer>
  );
}
