import {
  InfiniteData,
  QueryFilters,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import { deletePost } from "./actions";
import { toast } from "sonner";
import { usePathname, useRouter } from "next/navigation";
import { PostsPage } from "@/lib/types";

export function useDeletePostMutation() {
  const queryClient = useQueryClient();
  const router = useRouter();
  const pathname = usePathname();

  const mutation = useMutation({
    mutationFn: deletePost,
    onSuccess: async (deletePost) => {
      const queryFilter: QueryFilters = { queryKey: ["post-feed", "for-you"] };

      await queryClient.cancelQueries(queryFilter);

      queryClient.setQueriesData<InfiniteData<PostsPage, string | null>>(
        queryFilter,
        (oldData) => {
          if (!oldData) return;

          return {
            pageParams: oldData?.pageParams,
            pages: oldData?.pages.map((page) => ({
              nextCursor: page.nextCursor,
              posts: page.posts.filter((p) => p.id !== deletePost.id),
            })),
          };
        },
      );

      queryClient.invalidateQueries({
        queryKey: queryFilter.queryKey,
        predicate: (query) => !query.state.data,
      });

      toast.success("Post deleted", {
        style: {
          background: "green",
          color: "white",
        },
      });

      if (pathname === `posts/${deletePost.id}`) {
        router.push(`users/${deletePost.user.username}`);
      }
    },
    onError: (error) => {
      console.error(error);
      toast.error("Failed to post. Please try again.", {
        style: {
          background: "red",
          color: "white",
        },
      });
    },
  });

  return mutation;
}
