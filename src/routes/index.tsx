import { createFileRoute } from "@tanstack/react-router";
import { Layout } from "../components/layout";
import { BookmarkList } from "../components/bookmark-list";

const RouteCmp: React.FC = () => {
  return (
    <Layout>
      <BookmarkList />
    </Layout>
  );
};

export const Route = createFileRoute("/")({
  component: RouteCmp,
});
