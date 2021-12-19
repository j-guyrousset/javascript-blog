{
  'use strict';
  const optArticleSelector = '.post',
    //optTitleSelector = '.post-title',
    optTitleListSelector = '.titles',
    optTagListSelector = '.post-tags',
    optTagSideListSelector = '.sidebar .tags',
    optAuthorListSelector = '.post-authors';

  const titleClickHandler = function(event) {
    event.preventDefault(); //prevents from scrolling to the position reffered on the page
    const clickedElement = this,
      activeLinks = document.querySelectorAll(optTitleListSelector + ' a.active');
    console.log('link was clicked!');

    for(let activeLink of activeLinks){
      activeLink.classList.remove('active');
    }

    console.log('clicked: ', clickedElement);
    clickedElement.classList.add('active');
    const activeArticles = document.querySelectorAll(optArticleSelector + '.active');

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
    const linkss = document.querySelectorAll(optTitleListSelector),
      articles = document.querySelectorAll(optArticleSelector + customSelector);

    for(let link of linkss){
      link.innerHTML = '';
    }

    for(let article of articles){
      const articleId = article.getAttribute('id'),
        articleTitle = article.children[0].innerHTML,
        textHTML = '<a ' + 'href="#' + articleId + '"><span>' + articleTitle + '</span></a>',
        li = document.createElement('li');

      li.innerHTML = textHTML;
      document.querySelector(optTitleListSelector).appendChild(li);
    }

    const links = document.querySelectorAll(optTitleListSelector + ' a');
    console.log(links);
    for(let link of links){
      link.addEventListener('click', titleClickHandler);
    }
  };


  const generateTags = function() { //TODO add generate sidebar list of tags + count
    const articles = document.querySelectorAll(optArticleSelector),
      sideTagList = document.querySelector(optTagSideListSelector);
    let allTags = {},
      sideHtmlTag = '';
    for (let article of articles) {
      const tagWrapper = article.querySelector(optTagListSelector + ' ul'),
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
    console.log(allTags);
    for(const [tag, count] of Object.entries(allTags)) {
      const li =  document.createElement('li');
      sideHtmlTag = '<span><a href="#tag-' + tag + '">' + tag + '(' + count + ')</a></span>';
      li.innerHTML = sideHtmlTag;
      sideTagList.appendChild(li);
    }


  };


  const tagClickHandler = function(event){
    event.preventDefault();
    const clickedElement = this,
      href = clickedElement.getAttribute('href'),
      tag = href.replace('#tag-',''), //href.slice(5),
      activeTags = document.querySelectorAll(optTagListSelector + ' a.active');
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

  const generateAuthors = function() {  //TODO: add generate sidebar list (+count?)
    const articles = document.querySelectorAll(optArticleSelector);
    for (let article of articles) {
      const authorWrapper = article.querySelector(optAuthorListSelector + ' ul'),
        dataAuthors = article.getAttribute('data-authors'),
        authorArray = dataAuthors.split(', ');
      let htmlAuthor = '';
      for (let author of authorArray) {
        const li =  document.createElement('li');
        console.log('author: ', author);
        htmlAuthor = '<span><a href="#author-' + author +'">' + author + '</a>&nbsp</span>';
        li.innerHTML = htmlAuthor;
        authorWrapper.appendChild(li);
      }
    }
  };


  const authorClickHandler = function(event) {
    event.preventDefault();
    const clickedElement = this,
      href = clickedElement.getAttribute('href'),
      author = href.replace('#author-',''), //href.slice(7),
      activeAuthors = document.querySelectorAll(optAuthorListSelector + ' a.active');
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
