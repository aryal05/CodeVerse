import { revalidatePath, revalidateTag } from "next/cache";
import { PUBLIC_CACHE_TAGS } from "@/lib/cache-tags";

const PATHS_BY_TAG = {
  [PUBLIC_CACHE_TAGS.projects]: ["/", "/portfolio"],
  [PUBLIC_CACHE_TAGS.services]: ["/", "/services"],
  [PUBLIC_CACHE_TAGS.pricing]: ["/", "/pricing"],
  [PUBLIC_CACHE_TAGS.testimonials]: ["/"],
};

export function invalidatePublicContent(...tags) {
  const paths = new Set();
  for (const tag of tags) {
    revalidateTag(tag);
    for (const path of PATHS_BY_TAG[tag] || []) paths.add(path);
  }
  for (const path of paths) revalidatePath(path);
}

export { PUBLIC_CACHE_TAGS };
