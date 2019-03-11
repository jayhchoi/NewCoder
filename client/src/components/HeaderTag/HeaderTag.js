import React from 'react';
import { Helmet } from 'react-helmet';
import logo from '../../img/newcoder_logo.png';

const title = 'NewCoder | 코딩 새내기들의 소셜네트워크';
const description =
  '코딩은 재밌습니다. 하지만 혼자 가면 멀리가기 어렵습니다. 함께 더 멀리 갈 수 있게 뉴코더 커뮤니티에 참여하세요';

const HeaderTag = () => {
  return (
    <Helmet>
      <link rel="canonical" href="https://www.newcoder.org" />
      <title>{title}</title>
      <meta name="title" content={title} />
      <meta name="description" content={description} />
      <meta
        name="keywords"
        content="뉴코더, NewCoder, 코딩, 개발자, 소셜네트워크"
      />
      <meta property="og:title" content={title} />
      <meta property="og:type" content="website" />
      <meta property="og:url" content="https://www.newcoder.org" />
      <meta property="og:image" content={logo} />
    </Helmet>
  );
};

export default HeaderTag;
