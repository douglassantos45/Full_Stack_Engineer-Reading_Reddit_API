import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import ArticleListItem from "./ArticleListItem";
import { loadArticles, selectSubreddit } from "./articlesSlice";
import './ArticleListing.css';
import { loadAbout } from "../aside/asideSlice";

export default function Articles() {
  const dispatch = useDispatch();
  const title = useSelector(selectSubreddit);
  // console.log(title);
  
  useEffect(() => {
    dispatch(loadArticles(title));
    dispatch(loadAbout());
  }, [dispatch, title]);

  return (
    <main className="main-articles">
      <ArticleListItem />
    </main>
  );
};
