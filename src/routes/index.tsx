import { createFileRoute } from "@tanstack/react-router";
import { Layout } from "../components/layout";
import { BookmarkList } from "../components/bookmark-list";
import { BookmarkUploader } from "../components/bookmark-uploader";

const RouteCmp: React.FC = () => {
  return (
    <Layout>
      <BookmarkUploader />
      <BookmarkList />
    </Layout>
  );
};

export const Route = createFileRoute("/")({
  component: RouteCmp,
});
