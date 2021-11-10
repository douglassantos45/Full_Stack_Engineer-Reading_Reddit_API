import React, { useEffect } from 'react';
import ReactMarkdown from 'react-markdown';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router';
import { loadArticle, selectArticle } from './articlesSlice';

export default function ArticleDetails() {
  const article = useSelector(selectArticle);
  const { score, title, selftext, author, url } = article.data;
  const dispatch = useDispatch();
  const { id: articleId } = useParams();
  // console.log(article);

  const getImg = () => {
    if (!url) return;
    if (url.includes('.jpg') || url.includes('.png')) {
      return <img className="full-article-img" src={url} alt="post" />;
    } else {
      return null;
    }
  };
  const getVideo = () => {
    if (!article.data.media) return;
    const video = article.data.media.reddit_video.fallback_url;
    const height = article.data.media.reddit_video.height;
    const width = article.data.media.reddit_video.width;
    return <video width={width} height={height} controls>
      <source src={video} type="video/mp4" />
    </video>
    };

  useEffect(() => {
    if (articleId && articleId !== '') {
      dispatch(loadArticle(articleId))
    } 
  }, [dispatch, articleId]);

  return (
    <article className="full-article">
      <div className="article-score">
        <img className="score-icon" src="/img/arrow-up.png" alt="vote-up" />
        <p className="score">{score}</p>
        <img className="score-icon" src="/img/arrow-down.png" alt="vote-down" />
      </div>
      <div className="article-container">
        <div className="full-article-info">
          <p className="posted-by">Posted by u/{author}</p>
          <h2 className="full-title">{title}</h2>
        </div>
        {getImg()}
        {getVideo()}
        <ReactMarkdown>{selftext}</ReactMarkdown>
        <div className="info-comments">
          <img className="comments-icon" src="/img/comment.png" alt="comments icon" />
          <p className="comments">For comments</p>
          <a className="open-reddit" rel="noreferrer" target="_blank" href="/">Open in Reddit</a>
        </div>
      </div>
    </article>
  );
};