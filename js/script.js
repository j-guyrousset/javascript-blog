{
  'use strict';
  const opts = {
    articleSelector : '.post',
    title: {
      selector : '.post-title',
      listSelector : '.titles',
    },
    tag: {
      listSelector : '.post-tags',
      sideListSelector : '.sidebar .tags',
    },
    author: {
      listSelector : '.post-authors',
      sideListSelector: '.sidebar .authors',
    },
    cloudClass: {
      count : 5,
      prefix : 'tag-size-',
    },
  };

  const titleClickHandler = function(event) {
    event.preventDefault(); //prevents from scrolling to the position reffered on the page
    const clickedElement = this,
      activeLinks = document.querySelectorAll(opts.title.listSelector + ' a.active');
    console.log('link was clicked!');

    for(let activeLink of activeLinks){
      activeLink.classList.remove('active');
    }

    console.log('clicked: ', clickedElement);
    clickedElement.classList.add('active');
    const activeArticles = document.querySelectorAll(opts.articleSelector + '.active');

    for(let activeArticle of activeArticles){
      activeArticle.classList.remove('active');
    }

    const selectedLink = clickedElement.getAttribute('href'),
      selectedArticle = document.getElementById(selectedLink.slice(1));
    console.log(selectedLink.slice(1));
    selectedArticle.classList.add('active');
    //one line code:
    //document.getElementById(clickedElement.getAttribute('href').slice(1)).classList.add('active');
    generateTitleLinks();
  };

  const generateTitleLinks = function(customSelector = '') {
    console.log('cleaning titles');
    const linkss = document.querySelectorAll(opts.title.listSelector),
      articles = document.querySelectorAll(opts.articleSelector + customSelector);

    for(let link of linkss){
      link.innerHTML = '';
    }

    for(let article of articles){
      const articleId = article.getAttribute('id'),
        articleTitle = article.querySelector(opts.title.selector).innerHTML, //article.children[0].innerHTML,
        textHTML = '<a ' + 'href="#' + articleId + '"><span>' + articleTitle + '</span></a>',
        li = document.createElement('li');

      li.innerHTML = textHTML;
      document.querySelector(opts.title.listSelector).appendChild(li);
    }

    const links = document.querySelectorAll(opts.title.listSelector + ' a');
    console.log(links);
    for(let link of links){
      link.addEventListener('click', titleClickHandler);
    }
  };

  const calculateTagsParams = function(tags) {
    const articles = document.querySelectorAll(opts.articleSelector);
    let min = articles.length,
      max = 0;
    for (const [, count] of Object.entries(tags)) {
      if (count > max) {
        max = count;
      }
      if (count < min) {
        min = count;
      }
    }
    return {'min': min, 'max': max};
  };

  const calculateTagClass = function(count, params) {
    const max = params.max,
      min = params.min,
      nbSteps = opts.cloudClass.count,
      step = (max - min)/nbSteps;
    let tagClass = opts.cloudClass.prefix + 1;
    for (let i = 1; i <=nbSteps; i++){
      let inf = min + (i-1)*step,
        sup = min + i*step;
      if (count > inf && count <= sup) {
        tagClass = opts.cloudClass.prefix + i;
      }
    }
    return tagClass;
  };

  const generateTags = function() {
    const articles = document.querySelectorAll(opts.articleSelector),
      sideTagList = document.querySelector(opts.tag.sideListSelector);

    let allTags = {},
      sideHtmlTag = '';

    for (let article of articles) {
      const tagWrapper = article.querySelector(opts.tag.listSelector + ' ul'),
        dataTags = article.getAttribute('data-tags'),
        tagArray = dataTags.split(' ');
      let htmlTag = '';
      for (let tag of tagArray) {
        const li =  document.createElement('li');
        htmlTag = '<span><a href="#tag-' + tag +'">' + tag + '</a>&nbsp</span>';
        li.innerHTML = htmlTag;
        tagWrapper.appendChild(li);

        if (allTags[tag]){
          allTags[tag] += 1;
        } else {
          allTags[tag] = 1;
        }

      }
    }
    const tagsParams = calculateTagsParams(allTags);
    for(const [tag, count] of Object.entries(allTags)) {
      const li =  document.createElement('li');
      sideHtmlTag = '<span><a class="' + calculateTagClass(count,tagsParams) + '" href="#tag-' + tag + '">' + tag + '(' + count + ')</a></span>';
      console.log('tag and counts: ', [tag, count] );
      console.log('tag class: ', calculateTagClass(count,tagsParams));
      li.innerHTML = sideHtmlTag;
      sideTagList.appendChild(li);
    }

  };

  const tagClickHandler = function(event){
    event.preventDefault();
    const clickedElement = this,
      href = clickedElement.getAttribute('href'),
      tag = href.replace('#tag-',''), //href.slice(5),
      activeTags = document.querySelectorAll(opts.tag.listSelector + ' a.active');
    console.log('active tags: ', activeTags);

    for(let activeTag of activeTags) {
      activeTag.classList.remove('active');
    }

    const allTagsWithHref = document.querySelectorAll('a'),
      linksToClickedTag = [];
    for (let tagWithHref of allTagsWithHref) {
      if (tagWithHref.getAttribute('href') == href) {
        tagWithHref.classList.add('active');
        linksToClickedTag.push(tagWithHref);
      }
    }
    generateTitleLinks('[data-tags~="' + tag + '"]'); //i.e. for tag wit attribute data-tags cotaining string pointed to by const 'tag'
  };

  const addClickListenerToTags = function() {
    const allLinksToTag = document.querySelectorAll('a[href^="#tag-"]');
    for (let linkToTag of allLinksToTag) {
      linkToTag.addEventListener('click', tagClickHandler);
    }
  };

  const generateAuthors = function() {
    const articles = document.querySelectorAll(opts.articleSelector),
      authorSideWrapper = document.querySelector(opts.author.sideListSelector);
    let allAuthors = {},
      sideHtmlAuthor='';

    for (let article of articles) {
      const authorWrapper = article.querySelector(opts.author.listSelector + ' ul'),
        dataAuthors = article.getAttribute('data-authors'),
        authorArray = dataAuthors.split(', ');
      authorArray.pop();
      console.log('array of authors: ', authorArray);

      let htmlAuthor = '';

      for (let author of authorArray) {
        const li =  document.createElement('li');
        console.log('author: ', author);
        htmlAuthor = '<span><a class="author-name" href="#author-' + author +'">' + author + '</a>&nbsp</span>';
        li.innerHTML = htmlAuthor;
        authorWrapper.appendChild(li);

        if (allAuthors[author]) {
          allAuthors[author] += 1;
        } else {
          allAuthors[author] = 1;
        }
      }
    }

    for (const [author, count] of Object.entries(allAuthors)){
      const li =  document.createElement('li');
      sideHtmlAuthor = '<span><a href="#author-' + author + '">' + author + '(' + count + ')</a></span>';
      console.log('tag and counts: ', [author, count] );
      li.innerHTML = sideHtmlAuthor;
      authorSideWrapper.appendChild(li);
    }


  };

  const authorClickHandler = function(event) {
    event.preventDefault();
    const clickedElement = this,
      href = clickedElement.getAttribute('href'),
      author = href.replace('#author-',''), //href.slice(7),
      activeAuthors = document.querySelectorAll(opts.author.listSelector + ' a.active');
    console.log('active authors: ', activeAuthors);
    for(let activeAuthor of activeAuthors) {
      activeAuthor.classList.remove('active');
    }
    const allTagsWithHref = document.querySelectorAll('a'),
      linksToClickedAuthor = [];
    for (let tagWithHref of allTagsWithHref) {
      if (tagWithHref.getAttribute('href') == href) {
        tagWithHref.classList.add('active');
        linksToClickedAuthor.push(tagWithHref);
      }
    }
    console.log('links to author: ', linksToClickedAuthor);
    console.log('[data-authors~="' + author.split(' ')[1] + '"]');
    generateTitleLinks('[data-authors~="' + author.split(' ')[1] + ',' + '"]'); //i.e. for tag wit attribute data-tags cotaining string pointed to by const 'tag'
  };

  const addClickListenerToAuthors = function () {
    const allLinksToAuthor = document.querySelectorAll('a[href^="#author-"]');
    for (let linkToAuthor of allLinksToAuthor) {
      linkToAuthor.addEventListener('click', authorClickHandler);
    }
  };

  generateTitleLinks();
  generateTags();
  generateAuthors();
  addClickListenerToTags();
  addClickListenerToAuthors();




}
