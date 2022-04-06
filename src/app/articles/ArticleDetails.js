import React, { useEffect, useReducer } from 'react';
import ReactMarkdown from 'react-markdown';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router';
import { clearArticle, loadArticle, loadComments, selectArticle, selectComments } from './articlesSlice';
import { displayDatePosted, displayScore } from './ArticleListItem';
import './ArticleDetails.css'

export default function ArticleDetails() {
  // const dispatch = useDispatch();
  const  article = useSelector(selectArticle);
  const { title, selftext, author, url, permalink } = article.data;
  const { id: articleId } = useParams();
  const current = Date.now();
  const comments = useSelector(selectComments);
  // console.log(article);
  const initialState = {
    id: '',
    data: {},
    comments: {},
  };
  const [dispatch] = useReducer(clearArticle, initialState);

  const countComments = () => {
    let count;
    if(!comments[0]) return;
    count = comments[0].data.children[0].data.num_comments;
    return count;
  };

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
    return <video className="article-video"  controls>
      <source src={video} type="video/mp4" />
    </video>
    };

  useEffect(() => {
    if (articleId && articleId !== '') {
      dispatch(loadArticle(articleId))
      dispatch(loadComments(articleId));
    }
  }, [dispatch, articleId]);

  return (
    <article className="full-article">
      <div className="article-score">
        <img className="score-icon" src="/img/arrow-up.png" alt="vote-up" />
        <p className="score">{displayScore(article.data)}</p>
        <img className="score-icon" src="/img/arrow-down.png" alt="vote-down" />
      </div>
      <div className="article-container">
        <div className="full-article-info">
        <p className="posted-by">Posted by u/{author} {displayDatePosted(current, article.data)}</p>
          <h2 className="full-title">{title}</h2>
        </div>
        {getImg()}
        {getVideo()}
        <ReactMarkdown>{selftext}</ReactMarkdown>
        <div className="info-comments">
          <img className="comments-icon" src="/img/comment.png" alt="comments icon" />
          <p className="comments">{countComments()} comments</p>
          <a className="open-reddit" rel="noreferrer" target="_blank" href={`http://www.reddit.com${permalink}`}>Open in Reddit</a>
        </div>
      </div>
    </article>
  );
};
