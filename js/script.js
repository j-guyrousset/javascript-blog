{
  'use strict';

  const titleClickHandler = function(event) {
    event.preventDefault(); //prevents from scrolling to the position reffered on the page
    const clickedElement = this,
      activeLinks = document.querySelectorAll('.titles a.active');
    console.log('link was clicked!');

    for(let activeLink of activeLinks){
      activeLink.classList.remove('active');
    }

    console.log('clicked: ', clickedElement);
    clickedElement.classList.add('active');
    const activeArticles = document.querySelectorAll('article.active');

    for(let activeArticle of activeArticles){
      activeArticle.classList.remove('active');
    }

    const selectedLink = clickedElement.getAttribute('href'),
      selectedArticle = document.getElementById(selectedLink.slice(1));
    console.log(selectedLink.slice(1));
    selectedArticle.classList.add('active');
    //one line code:
    //document.getElementById(clickedElement.getAttribute('href').slice(1)).classList.add('active');
  };


  const generateTitleLinks = function() {
    console.log('cleaning titles');
    const linkss = document.querySelectorAll('.titles'),
      articles = document.querySelectorAll('article');

    for(let link of linkss){
      link.innerHTML = '';
    }

    for(let article of articles){
      const articleId = article.getAttribute('id'),
        articleTitle = article.children[0].innerHTML,
        textHTML = '<a ' + 'href="#' + articleId + '"><span>' + articleTitle + '</span></a>',
        li = document.createElement('li');

      li.innerHTML = textHTML;
      document.querySelector('.titles').appendChild(li);
    }

    const links = document.querySelectorAll('.titles a');
    console.log(links);
    for(let link of links){
      link.addEventListener('click', titleClickHandler);
    }

  };


  const generateTags = function() {
    const articles = document.querySelectorAll('article');
    for (let article of articles) {
      const tagWrapper = article.querySelector('.post-tags ul'),
        dataTags = article.getAttribute('data-tags'),
        tagArray = dataTags.split(' ');
      let html = '';
      for (let tag of tagArray) {
        const li =  document.createElement('li');
        html = '<span><a href="#tag-' + tag +'">' + tag + '</a>&nbsp</span>';
        li.innerHTML = html;
        tagWrapper.appendChild(li);
      }
    }
  };

  const tagClickHandler = function(event){
    event.preventDefault();
    const clickedElement = this,
      href = clickedElement.getAttribute('href'),
      tag = href.slice(5),
      activeTags = document.querySelectorAll('.post-tags a.active');
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
    //generateTitleLinks('article');
  };

  const addClickListenerToTags = function() {
    const allLinksToTag = document.querySelectorAll('a[href^="#tag-"]');
    for (let linkToTag of allLinksToTag) {
      linkToTag.addEventListener('click', tagClickHandler);
    }
  };


  generateTitleLinks();
  generateTags();
  addClickListenerToTags();








}
